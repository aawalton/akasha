import { parseInlineHandlers } from "../addon-orphan-xml-handler/addon-orphan-xml-handler.module.code.ts"

export interface DispatchFinding {
  readonly xmlPath: string
  readonly line: number
  readonly handler: string
  readonly namespace: string
  readonly snippet: string
  readonly message: string
}

const MAX_SNIPPET = 160

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function referencesNamespace(body: string, namespace: string): boolean {
  return new RegExp(`\\b${escapeRe(namespace)}\\s*[.:]`).test(body)
}

function namespaceRefCount(body: string, namespace: string): number {
  return [...body.matchAll(new RegExp(`\\b${escapeRe(namespace)}\\s*[.:]`, "g"))].length
}

function snippetOf(body: string): string {
  const flat = body.trim().replace(/\s+/g, " ")
  return flat.length > MAX_SNIPPET ? `${flat.slice(0, MAX_SNIPPET)}…` : flat
}

export function isSingleDispatch(body: string, namespace: string): boolean {
  const trimmed = body.trim()
  if (trimmed.length === 0) return false

  const head = new RegExp(`^${escapeRe(namespace)}\\s*[.:]\\s*[A-Za-z_][A-Za-z0-9_]*\\s*\\(`)
  if (!head.test(trimmed)) return false

  const openIdx = trimmed.indexOf("(")
  if (openIdx === -1) return false
  let depth = 0
  let closeIdx = -1
  for (let i = openIdx; i < trimmed.length; i++) {
    const ch = trimmed[i]
    if (ch === "(") depth++
    else if (ch === ")") {
      depth--
      if (depth === 0) {
        closeIdx = i
        break
      }
    }
  }
  if (closeIdx === -1) return false
  if (trimmed.slice(closeIdx + 1).trim().length > 0) return false
  return namespaceRefCount(trimmed, namespace) === 1
}

export interface DispatchDetectInput {
  readonly xmlPath: string
  readonly xml: string
  readonly governed: ReadonlySet<string>
}

export function detectNonDispatchHandlers(input: DispatchDetectInput): readonly DispatchFinding[] {
  const { xmlPath, xml, governed } = input
  const findings: DispatchFinding[] = []
  if (governed.size === 0) return findings

  for (const handler of parseInlineHandlers(xml)) {
    const body = handler.body
    if (body.trim().length === 0) continue

    for (const ns of governed) {
      if (!referencesNamespace(body, ns)) continue
      if (isSingleDispatch(body, ns)) continue
      findings.push({
        xmlPath,
        line: handler.line,
        handler: handler.name,
        namespace: ns,
        snippet: snippetOf(body),
        message: `<${handler.name}> references \`${ns}\` but its body is not a single named-global dispatch — inline-chunk faults report \`callstack=None\`/\`build=None\` and cannot be attributed; move the logic into a named \`${ns}.Member(self)\` wrapper so the body is exactly \`${ns}.Member(…)\``,
      })
    }
  }
  return findings
}
