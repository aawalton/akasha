import { z } from "zod"
import { type ProcessStart, processStartsIn } from "../process-start/process-start.module.code.ts"

const TYPE_SUFFIX_MATCH_SCHEMA = z.tuple([z.string(), z.string()])

export type TestType =
  | "unit"
  | "property"
  | "component"
  | "database"
  | "smoke"
  | "integration"
  | "browser"
  | "cli"
  | "data"
  | "model"

export const TEST_TYPES: readonly TestType[] = [
  "unit",
  "property",
  "component",
  "database",
  "smoke",
  "integration",
  "browser",
  "cli",
  "data",
  "model",
] as const

export type RequiredTypeBasis = "rule" | "process-start" | "fallthrough"

export interface ClassificationResult {
  declaredType: TestType | null
  requiredType: TestType
  basis: RequiredTypeBasis
  evidence: readonly string[]
  conflict: readonly string[]
}

interface TokenRule {
  readonly type: TestType
  readonly kind: "declaration" | "capability"
  readonly tokens: readonly string[]
}

interface ProcessStartRule {
  readonly type: TestType
  readonly kind: "process-start"
}

type DetectionRule = TokenRule | ProcessStartRule

function isTokenRule(rule: DetectionRule): rule is TokenRule {
  return rule.kind !== "process-start"
}

export const UNIT_MARKER = "// test-classification: unit"

export const HERMETIC_START_MARKER = "// process-start: hermetic"

const RULES: readonly DetectionRule[] = [
  {
    type: "integration",
    kind: "declaration",
    tokens: ["// test-classification: integration"],
  },
  {
    type: "data",
    kind: "declaration",
    tokens: ["// test-classification: data"],
  },
  {
    type: "model",
    kind: "declaration",
    tokens: ["// test-classification: model"],
  },
  {
    type: "cli",
    kind: "declaration",
    tokens: ["// test-classification: cli"],
  },
  {
    type: "browser",
    kind: "capability",
    tokens: [
      'from "playwright-core"',
      "chromium.launch",
      "BROWSER_TEST_URL",
      "@akasha/browser-test-harness",
    ],
  },
  {
    type: "database",
    kind: "capability",
    tokens: ["@electric-sql/pglite"],
  },
  {
    type: "smoke",
    kind: "capability",
    tokens: [
      'from "@supabase/supabase-js"',
      'from "@supabase/ssr"',
      "process.env.SUPABASE_",
      "process.env.NEXT_PUBLIC_SUPABASE_",
      "[smoke skip]",
    ],
  },
  {
    type: "cli",
    kind: "process-start",
  },
  {
    type: "component",
    kind: "capability",
    tokens: ["@testing-library/react", "happy-dom", "renderHook(", "@akasha/testing-system"],
  },
  {
    type: "property",
    kind: "capability",
    tokens: ['from "fast-check"'],
  },
]

const TYPE_SUFFIX_RE = /\.([a-z]+)\.test\.tsx?$/

const TEST_TYPE_SET: ReadonlySet<string> = new Set<string>(TEST_TYPES)

function isTestType(s: string): s is TestType {
  return TEST_TYPE_SET.has(s)
}

export function declaredTypeFromPath(path: string): TestType | null {
  const matchResult = TYPE_SUFFIX_MATCH_SCHEMA.safeParse(TYPE_SUFFIX_RE.exec(path))
  if (!matchResult.success) return null
  return isTestType(matchResult.data[1]) ? matchResult.data[1] : null
}

export interface RequiredTypeDetection {
  readonly type: TestType
  readonly basis: RequiredTypeBasis
  readonly evidence: readonly string[]
  readonly conflict: readonly string[]
}

export function describeStart(start: ProcessStart): string {
  return `${start.callee}(${start.program === null ? "computed" : `"${start.program}"`}) at line ${start.line}`
}

export function detectRequiredType(content: string, path: string): RequiredTypeDetection {
  const unitDeclared = content.includes(UNIT_MARKER)

  for (const rule of RULES) {
    if (rule.kind !== "declaration") continue
    const hits = rule.tokens.filter((token) => content.includes(token))
    if (hits.length === 0) continue
    return {
      type: rule.type,
      basis: "rule",
      evidence: hits,
      conflict: unitDeclared ? [UNIT_MARKER, ...hits] : [],
    }
  }

  if (unitDeclared) return { type: "unit", basis: "rule", evidence: [UNIT_MARKER], conflict: [] }

  for (const rule of RULES) {
    if (rule.kind === "process-start") {
      if (content.includes(HERMETIC_START_MARKER)) continue
      const starts = processStartsIn(path, content)
      if (starts.length === 0) continue
      return {
        type: rule.type,
        basis: "process-start",
        evidence: starts.map(describeStart),
        conflict: [],
      }
    }
    const hits = rule.tokens.filter((token) => content.includes(token))
    if (hits.length > 0) return { type: rule.type, basis: "rule", evidence: hits, conflict: [] }
  }
  return { type: "unit", basis: "fallthrough", evidence: [], conflict: [] }
}

function evidenceForType(type: TestType): readonly string[] {
  if (type === "unit") return [UNIT_MARKER]
  const forType = RULES.filter(isTokenRule).filter((rule) => rule.type === type)
  const declarations = forType.filter((rule) => rule.kind === "declaration")
  const chosen = declarations.length > 0 ? declarations : forType
  return chosen.flatMap((rule) => [...rule.tokens])
}

export type RepairKind = "contradiction" | "unestablished" | "undeclared-start" | "mismatch"

export function repairKind(result: ClassificationResult): RepairKind {
  if (result.conflict.length > 0) return "contradiction"
  if (result.declaredType !== null && result.basis === "fallthrough") return "unestablished"
  if (result.basis === "process-start") return "undeclared-start"
  return "mismatch"
}

export function describeViolation(file: string, result: ClassificationResult): string {
  const declared = result.declaredType
  switch (repairKind(result)) {
    case "contradiction":
      return `${file} → declares two types at once: ${result.conflict.join(" beside ")} — delete whichever marker is not what this file is`
    case "unestablished": {
      const wanted = declared === null ? "" : evidenceForType(declared).join(" or ")
      return `${file} → declared: ${declared}, and no rule matched its content — the ${declared} marker is missing: add ${wanted} if the file needs the ${declared} lane, or rename it into the lane its content supports`
    }
    case "undeclared-start":
      return `${file} → declared: ${declared ?? "MISSING"}, and its own code starts a process: ${result.evidence.join(", ")} — add \`${HERMETIC_START_MARKER} — <why>\` where every start meets the merge-lane rule on that constant, or rename the file into the cli lane`
    default: {
      const evidence =
        result.evidence.length > 0 ? ` [evidence: ${result.evidence.join(", ")}]` : ""
      return `${file} → declared: ${declared ?? "MISSING"}, required: ${result.requiredType}${evidence}`
    }
  }
}

export function classify(path: string, content: string): ClassificationResult {
  const declaredType = declaredTypeFromPath(path)
  const { type: requiredType, basis, evidence, conflict } = detectRequiredType(content, path)
  return { declaredType, requiredType, basis, evidence, conflict }
}

export function isViolation(result: ClassificationResult): boolean {
  if (result.conflict.length > 0) return true
  return result.declaredType === null || result.declaredType !== result.requiredType
}
