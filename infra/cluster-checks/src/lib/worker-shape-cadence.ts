import { z } from "zod"

const INTERVAL_GOVERNED_PHASES: ReadonlySet<string> = new Set(["heartbeat"])

const SEPARATOR_MATCH_SCHEMA = z.tuple([z.string()])

const STRING_LITERAL_MATCH_SCHEMA = z.tuple([
  z.string(),
  z.string().optional(),
  z.string().optional(),
  z.string().optional(),
])

export interface LoopIterationSite {
  readonly index: number
  readonly phase: string | null
  readonly declaresInterval: boolean
}

function balancedObjectAt(source: string, open: number): string | null {
  let depth = 0
  let quote: string | null = null
  for (let i = open; i < source.length; i += 1) {
    const ch = source[i]
    if (quote !== null) {
      if (ch === "\\") {
        i += 1
        continue
      }
      if (ch === quote) quote = null
      continue
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch
      continue
    }
    if (ch === "{") depth += 1
    else if (ch === "}") {
      depth -= 1
      if (depth === 0) return source.slice(open, i + 1)
    }
  }
  return null
}

function topLevelProperty(objectBody: string, key: string): string | null {
  let depth = 0
  let quote: string | null = null
  for (let i = 0; i < objectBody.length; i += 1) {
    const ch = objectBody[i]
    if (quote !== null) {
      if (ch === "\\") {
        i += 1
        continue
      }
      if (ch === quote) quote = null
      continue
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch
      continue
    }
    if (ch === "{" || ch === "[" || ch === "(") depth += 1
    else if (ch === "}" || ch === "]" || ch === ")") depth -= 1
    else if (depth === 1 && objectBody.startsWith(key, i)) {
      const before = i === 0 ? "" : (objectBody[i - 1] ?? "")
      if (/[\w$]/.test(before)) continue
      const after = objectBody.slice(i + key.length)
      const separator = SEPARATOR_MATCH_SCHEMA.safeParse(/^\s*:/.exec(after))
      if (!separator.success) {
        if (/^\s*[,}]/.test(after)) return key
        continue
      }
      return after.slice(separator.data[0].length).trimStart()
    }
  }
  return null
}

const CALL_RE = /\bmeasureLoopIteration\s*\(/g
const STRING_LITERAL_RE = /^(?:"([^"\n]*)"|'([^'\n]*)'|`([^`$\n]*)`)/

export function findLoopIterationSites(stripped: string): readonly LoopIterationSite[] {
  const sites: LoopIterationSite[] = []
  for (const match of stripped.matchAll(CALL_RE)) {
    const index = match.index
    const afterParen = index + match[0].length
    const open = stripped.indexOf("{", afterParen)
    if (open === -1 || stripped.slice(afterParen, open).trim() !== "") {
      sites.push({ index, phase: null, declaresInterval: false })
      continue
    }
    const body = balancedObjectAt(stripped, open)
    if (body === null) {
      sites.push({ index, phase: null, declaresInterval: false })
      continue
    }
    const phaseText = topLevelProperty(body, "phase")
    const phaseMatch =
      phaseText === null
        ? null
        : STRING_LITERAL_MATCH_SCHEMA.safeParse(STRING_LITERAL_RE.exec(phaseText))
    const phase =
      phaseMatch === null || !phaseMatch.success
        ? null
        : (phaseMatch.data[1] ?? phaseMatch.data[2] ?? phaseMatch.data[3] ?? null)
    sites.push({
      index,
      phase,
      declaresInterval: topLevelProperty(body, "intervalMs") !== null,
    })
  }
  return sites
}

export function siteOwesCadenceLabel(site: LoopIterationSite): boolean {
  if (site.phase === null) return false
  if (!INTERVAL_GOVERNED_PHASES.has(site.phase)) return false
  return !site.declaresInterval
}
