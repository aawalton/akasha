const HEADER = "// AUTO-GENERATED — do not edit by hand."

const TYPE_IMPORT = 'import type { Deriver } from "../../../../../tools/lib/graph/types.ts"'

const TUPLE_TYPE = "as const satisfies readonly Deriver[]"

const TUPLE_PRAGMA =
  "// ast-unused: keep — consumed when a consumer wires the engine through this barrel. Remove this pragma when the first caller wires in."

function pathToAlias(path: string): string {
  const stem = path.replace(/\.deriver\.ts$/u, "")
  const tokens = stem.split(/[/.\-_]/u).filter((t) => t.length > 0)
  if (tokens.length === 0) return "deriver"
  const head = tokens[0] ?? "e"
  const tail = tokens.slice(1)
  const headLower = head.charAt(0).toLowerCase() + head.slice(1)
  const tailCamel = tail.map((tok) => tok.charAt(0).toUpperCase() + tok.slice(1)).join("")
  const raw = `${headLower}${tailCamel}`
  const sanitized = raw.replace(/[^A-Za-z0-9_$]/gu, "")
  if (sanitized.length === 0) return "deriver"
  if (/^[0-9]/u.test(sanitized)) return `e${sanitized}`
  return sanitized
}

export function generateBarrel(deriverPaths: readonly string[]): string {
  const sorted = [...deriverPaths].sort()

  const aliasByPath = new Map<string, string>()
  const usedAliases = new Set<string>()
  for (const p of sorted) {
    const base = pathToAlias(p)
    let alias = base
    if (usedAliases.has(alias)) {
      alias = `${base}_${fnv1aHex(p)}`
      let bump = 1
      while (usedAliases.has(alias)) {
        alias = `${base}_${fnv1aHex(p)}_${bump}`
        bump += 1
      }
    }
    aliasByPath.set(p, alias)
    usedAliases.add(alias)
  }

  const lines: string[] = [HEADER, "", TYPE_IMPORT]

  if (sorted.length === 0) {
    lines.push("")
    lines.push(TUPLE_PRAGMA)
    lines.push(`export const derivers = [] ${TUPLE_TYPE}`)
    lines.push("")
    return lines.join("\n")
  }

  lines.push("")
  for (const p of sorted) {
    const alias = aliasByPath.get(p) ?? "deriver"
    const stem = p.replace(/\.ts$/u, "")
    lines.push(`import ${alias} from "../../../../${stem}"`)
  }
  lines.push("")
  lines.push(TUPLE_PRAGMA)
  lines.push("export const derivers = [")
  for (const p of sorted) {
    const alias = aliasByPath.get(p) ?? "deriver"
    lines.push(`  ${alias},`)
  }
  lines.push(`] ${TUPLE_TYPE}`)
  lines.push("")
  return lines.join("\n")
}

function fnv1aHex(input: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(16).padStart(8, "0")
}
