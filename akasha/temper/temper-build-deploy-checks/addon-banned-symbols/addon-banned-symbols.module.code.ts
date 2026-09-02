import { readFileSync } from "node:fs"
import { z } from "zod"
import {
  ESO_AVAILABLE_COROUTINE,
  ESO_AVAILABLE_DEBUG,
  ESO_AVAILABLE_MATH,
  ESO_AVAILABLE_OS,
  ESO_AVAILABLE_STRING,
  ESO_AVAILABLE_TABLE,
  ESO_AVAILABLE_UTF8,
  ESO_STRIPPED_GLOBALS,
  ESO_WHOLLY_STRIPPED_NAMESPACES,
} from "../eso-sandbox-manifest/eso-sandbox-manifest.module.code.ts"

const MATCH_GROUPS_SCHEMA = z
  .object({
    ns: z.string().optional(),
    member: z.string().optional(),
    stripped: z.string().optional(),
  })
  .optional()

const REGEX_EXEC_SCHEMA = z
  .unknown()
  .nullable()
  .transform((raw): ParsedExec | null => {
    if (raw === null) return null
    if (!Array.isArray(raw)) throw new Error("expected array from RegExp.exec")
    const symbol = z.string().parse(raw[0])
    const indexUnknown: unknown = Reflect.get(raw, "index")
    const index = z.number().parse(indexUnknown)
    const groupsUnknown: unknown = Reflect.get(raw, "groups")
    const groups = MATCH_GROUPS_SCHEMA.parse(groupsUnknown) ?? {}
    return { symbol, index, groups }
  })

interface MatchGroups {
  readonly ns?: string | undefined
  readonly member?: string | undefined
  readonly stripped?: string | undefined
}

interface ParsedExec {
  readonly symbol: string
  readonly index: number
  readonly groups: MatchGroups
}

function parseNextExec(re: RegExp, input: string): ParsedExec | null {
  return REGEX_EXEC_SCHEMA.parse(re.exec(input))
}

export type BannedFamily = "namespace-member-stripped" | "namespace-stripped" | "global-stripped"

export interface Issue {
  file: string
  line: number
  col: number
  symbol: string
  family: BannedFamily
  hint: string
}

const HINT_NAMESPACE_MEMBER_STRIPPED =
  "ESO sandbox does not expose this member — see the manifest's ESO_AVAILABLE_<NS> list"
const HINT_NAMESPACE_STRIPPED =
  "ESO sandbox strips this entire namespace (table is nil) — see the manifest's ESO_WHOLLY_STRIPPED_NAMESPACES"
const HINT_GLOBAL_STRIPPED =
  "ESO sandbox does not expose this global — see the manifest's ESO_STRIPPED_GLOBALS"

interface PartialNamespace {
  readonly name: string
  readonly available: ReadonlySet<string>
}

const PARTIAL_NAMESPACES: readonly PartialNamespace[] = [
  { name: "debug", available: new Set(ESO_AVAILABLE_DEBUG) },
  { name: "os", available: new Set(ESO_AVAILABLE_OS) },
  { name: "coroutine", available: new Set(ESO_AVAILABLE_COROUTINE) },
  { name: "string", available: new Set(ESO_AVAILABLE_STRING) },
  { name: "table", available: new Set(ESO_AVAILABLE_TABLE) },
  { name: "math", available: new Set(ESO_AVAILABLE_MATH) },
  { name: "utf8", available: new Set(ESO_AVAILABLE_UTF8) },
]

const WHOLLY_STRIPPED_NAMESPACES: readonly string[] = [...ESO_WHOLLY_STRIPPED_NAMESPACES]

const BARE_GLOBAL_EXCLUSIONS = new Set<string>(["module", "load", "require"])
export const BARE_GLOBAL_NAMES: readonly string[] = ESO_STRIPPED_GLOBALS.filter(
  (name) => !BARE_GLOBAL_EXCLUSIONS.has(name)
)

export const SHIM_ALLOWLIST: ReadonlySet<string> = new Set<string>([])

export function maskStringLiterals(line: string): string {
  const chars = line.split("")
  let inString: '"' | "'" | null = null
  let escaped = false
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i]
    if (inString != null) {
      if (escaped) {
        chars[i] = " "
        escaped = false
        continue
      }
      if (ch === "\\") {
        escaped = true
        chars[i] = " "
        continue
      }
      if (ch === inString) {
        inString = null
        continue
      }
      chars[i] = " "
    } else {
      if (ch === '"' || ch === "'") {
        inString = ch
      }
    }
  }
  return chars.join("")
}

function escapeRegex(name: string): string {
  return name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

const PARTIAL_AVAILABLE: ReadonlyMap<string, ReadonlySet<string>> = new Map(
  PARTIAL_NAMESPACES.map((ns) => [ns.name, ns.available])
)

function alternation(names: readonly string[]): string {
  return [...names]
    .sort((a, b) => b.length - a.length || (a < b ? -1 : 1))
    .map(escapeRegex)
    .join("|")
}

function buildBannedPattern(): string {
  const arms: string[] = []
  const partialNames = PARTIAL_NAMESPACES.map((ns) => ns.name)
  if (partialNames.length > 0) {
    arms.push(`(?<ns>${alternation(partialNames)})\\.(?<member>[A-Za-z_][A-Za-z0-9_]*)`)
  }
  if (WHOLLY_STRIPPED_NAMESPACES.length > 0) {
    arms.push(`(?<stripped>${alternation(WHOLLY_STRIPPED_NAMESPACES)})\\.[A-Za-z_][A-Za-z0-9_]*`)
  }
  if (BARE_GLOBAL_NAMES.length > 0) {
    arms.push(`(?:${alternation(BARE_GLOBAL_NAMES)})\\b`)
  }
  if (arms.length === 0) {
    throw new Error(
      "addon-banned-symbols: the manifest yielded no banned construct, so this scanner would certify every bundle clean — refusing to load"
    )
  }
  return `\\b(?:${arms.join("|")})`
}

const BANNED_PATTERN: string = buildBannedPattern()

function classifyMatch(match: ParsedExec, file: string, lineNumber: number): Issue | null {
  const { ns, member, stripped } = match.groups
  const at = { file, line: lineNumber, col: match.index + 1, symbol: match.symbol }
  if (ns !== undefined && member !== undefined) {
    const available = PARTIAL_AVAILABLE.get(ns)
    if (available === undefined) {
      throw new Error(`addon-banned-symbols: matched namespace \`${ns}\` has no manifest allow-set`)
    }
    if (available.has(member)) return null
    return { ...at, family: "namespace-member-stripped", hint: HINT_NAMESPACE_MEMBER_STRIPPED }
  }
  if (stripped !== undefined) {
    return { ...at, family: "namespace-stripped", hint: HINT_NAMESPACE_STRIPPED }
  }
  return { ...at, family: "global-stripped", hint: HINT_GLOBAL_STRIPPED }
}

export function scanBundle(
  source: string,
  file: string,
  allowlist: ReadonlySet<string> = SHIM_ALLOWLIST
): readonly Issue[] {
  const issues: Issue[] = []
  const lines = source.split("\n")
  const re = new RegExp(BANNED_PATTERN, "g")
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    if (line === undefined) continue
    if (line.endsWith("\r")) line = line.slice(0, -1)
    const trimmed = line.trim()
    if (trimmed === "") continue
    if (allowlist.has(trimmed)) continue
    const masked = maskStringLiterals(line)
    const lineNumber = i + 1
    re.lastIndex = 0
    let match = parseNextExec(re, masked)
    while (match !== null) {
      const issue = classifyMatch(match, file, lineNumber)
      if (issue !== null) issues.push(issue)
      match = parseNextExec(re, masked)
    }
  }
  return issues
}

export function scanBundleFile(path: string): readonly Issue[] {
  const source = readFileSync(path, "utf8")
  return scanBundle(source, path)
}

export function formatIssue(issue: Issue): string {
  return `${issue.file}:${issue.line}:${issue.col}  [${issue.family}] ${issue.symbol} — ${issue.hint}`
}
