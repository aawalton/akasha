import type { Violation } from "../../../../tools/lib/check-workflow/violation-reporter"

export type FieldDisposition = "consumed" | "inert"

export interface FieldClassification {
  readonly field: string
  readonly disposition: FieldDisposition
  readonly reason?: string
}

export interface SourceFile {
  readonly path: string
  readonly content: string
}

export interface StepConfigFieldViolation extends Violation {
  readonly kind: "step-config-field-consumption"
  readonly field: string
  readonly message: string
}

export function stripComments(source: string): string {
  let out = ""
  let i = 0
  let quote: string | null = null
  while (i < source.length) {
    const ch = source[i] ?? ""
    const next = source[i + 1] ?? ""
    if (quote !== null) {
      out += ch
      if (ch === "\\") {
        out += next
        i += 2
        continue
      }
      if (ch === quote) quote = null
      i += 1
      continue
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch
      out += ch
      i += 1
      continue
    }
    if (ch === "/" && next === "/") {
      while (i < source.length && source[i] !== "\n") i += 1
      continue
    }
    if (ch === "/" && next === "*") {
      i += 2
      while (i < source.length && !(source[i] === "*" && source[i + 1] === "/")) i += 1
      i += 2
      continue
    }
    out += ch
    i += 1
  }
  return out
}

const IDENTIFIER = /^[A-Za-z_$][\w$]*$/
const IDENTIFIER_CHAR = /[\w$]/

function interfaceBodyStart(clean: string, interfaceName: string): number {
  const marker = `interface ${interfaceName}`
  let from = 0
  for (;;) {
    const at = clean.indexOf(marker, from)
    if (at === -1) return -1
    const after = clean[at + marker.length] ?? ""
    if (!IDENTIFIER_CHAR.test(after)) {
      const braceAt = clean.indexOf("{", at + marker.length)
      return braceAt === -1 ? -1 : braceAt + 1
    }
    from = at + marker.length
  }
}

function fieldNameFromHead(head: string): string | null {
  const segments = head.split(/[;\n]/)
  let token = (segments[segments.length - 1] ?? "").trim()
  if (token.startsWith("readonly ")) token = token.slice("readonly ".length).trim()
  if (token.endsWith("?")) token = token.slice(0, -1).trim()
  return IDENTIFIER.test(token) ? token : null
}

export function parseInterfaceFields(source: string, interfaceName: string): readonly string[] {
  const clean = stripComments(source)
  const bodyStart = interfaceBodyStart(clean, interfaceName)
  if (bodyStart === -1) return []
  let depth = 1
  let end = bodyStart
  while (end < clean.length && depth > 0) {
    const ch = clean[end]
    if (ch === "{") depth += 1
    else if (ch === "}") depth -= 1
    if (depth > 0) end += 1
  }
  const body = clean.slice(bodyStart, end)
  const fields: string[] = []
  let cursor = 0
  let nest = 0
  let fieldStart = 0
  while (cursor < body.length) {
    const ch = body[cursor]
    if (ch === "{" || ch === "(" || ch === "[") nest += 1
    else if (ch === "}" || ch === ")" || ch === "]") nest -= 1
    else if (nest === 0 && ch === ":") {
      const named = fieldNameFromHead(body.slice(fieldStart, cursor))
      if (named !== null) fields.push(named)
      while (cursor < body.length && body[cursor] !== ";" && body[cursor] !== "\n") {
        const inner = body[cursor]
        if (inner === "{" || inner === "(" || inner === "[") nest += 1
        else if (inner === "}" || inner === ")" || inner === "]") nest -= 1
        cursor += 1
      }
      fieldStart = cursor + 1
      cursor += 1
      continue
    } else if (nest === 0 && (ch === ";" || ch === "\n")) {
      fieldStart = cursor + 1
    }
    cursor += 1
  }
  return [...new Set(fields)]
}

export function statementsOf(content: string): readonly string[] {
  return stripComments(content).split(/[\n;]/)
}

function accessPattern(field: string, tail: string): RegExp {
  return new RegExp(`(?<!\\.)\\.\\s*${field}\\b${tail}`)
}

export function isPopulatingStatement(field: string, statement: string): boolean {
  return accessPattern(field, "\\s*=(?!=)").test(statement)
}

export function consumerPaths(args: {
  field: string
  sources: readonly SourceFile[]
  declarationPath: string
}): readonly string[] {
  const { field, sources, declarationPath } = args
  const read = accessPattern(field, "")
  return sources
    .filter((s) => s.path !== declarationPath)
    .filter((s) =>
      statementsOf(s.content).some((st) => !isPopulatingStatement(field, st) && read.test(st))
    )
    .map((s) => s.path)
}

export function findStepConfigFieldViolations(args: {
  fields: readonly string[]
  sources: readonly SourceFile[]
  declarationPath: string
  classifications: readonly FieldClassification[]
}): readonly StepConfigFieldViolation[] {
  const { fields, sources, declarationPath, classifications } = args
  const violations: StepConfigFieldViolation[] = []
  const declared = new Map(classifications.map((c) => [c.field, c]))
  const known = new Set(fields)

  for (const c of classifications) {
    if (!known.has(c.field)) {
      violations.push({
        kind: "step-config-field-consumption",
        field: c.field,
        file: declarationPath,
        message: `classified as "${c.disposition}" but no longer declared on the interface — drop the stale classification`,
      })
    }
  }

  for (const field of fields) {
    const classification = declared.get(field)
    if (classification === undefined) {
      violations.push({
        kind: "step-config-field-consumption",
        field,
        file: declarationPath,
        message:
          'unclassified — add it to STEP_CONFIG_FIELD_CLASSIFICATIONS as "consumed", or as "inert" with a reason',
      })
      continue
    }
    const consumers = consumerPaths({ field, sources, declarationPath })
    if (classification.disposition === "consumed" && consumers.length === 0) {
      violations.push({
        kind: "step-config-field-consumption",
        field,
        file: declarationPath,
        message:
          "classified as consumed, but no orchestrator source reads it — it is populated and then ignored, so it cannot affect the pod spec. Either wire it up or reclassify it as inert with a reason.",
      })
    }
    if (classification.disposition === "inert" && consumers.length > 0) {
      violations.push({
        kind: "step-config-field-consumption",
        field,
        file: declarationPath,
        message: `classified as inert, but now read by ${consumers.join(", ")} — reclassify it as consumed`,
      })
    }
    if (
      classification.disposition === "inert" &&
      (classification.reason === undefined || classification.reason.trim() === "")
    ) {
      violations.push({
        kind: "step-config-field-consumption",
        field,
        file: declarationPath,
        message:
          "classified as inert without a reason — say why it is dead and what tracks the decision",
      })
    }
  }
  return violations
}
