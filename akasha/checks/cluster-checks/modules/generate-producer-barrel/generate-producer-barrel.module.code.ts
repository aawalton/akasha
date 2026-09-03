const HEADER = "// AUTO-GENERATED — do not edit by hand."

const TYPE_IMPORT = 'import type { Producer } from "../../../../../tools/lib/graph/types.ts"'

const TUPLE_TYPE = "as const satisfies readonly Producer[]"

const TUPLE_PRAGMA =
  "// ast-unused: keep — consumed in Round 4 of #9661. Remove this pragma when the first caller wires in."

function pathToAlias(path: string): string {
  const stem = path.replace(/\.producer\.ts$/u, "")
  const tokens = stem.split(/[/.\-_]/u).filter((t) => t.length > 0)
  if (tokens.length === 0) return "producer"
  const head = tokens[0] ?? "p"
  const tail = tokens.slice(1)
  const headLower = head.charAt(0).toLowerCase() + head.slice(1)
  const tailCamel = tail.map((tok) => tok.charAt(0).toUpperCase() + tok.slice(1)).join("")
  const raw = `${headLower}${tailCamel}`
  const sanitized = raw.replace(/[^A-Za-z0-9_$]/gu, "")
  if (sanitized.length === 0) return "producer"
  if (/^[0-9]/u.test(sanitized)) return `p${sanitized}`
  return sanitized
}

export function generateBarrel(producerPaths: readonly string[]): string {
  const sorted = [...producerPaths].sort()

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
    lines.push(`export const producers = [] ${TUPLE_TYPE}`)
    lines.push("")
    return lines.join("\n")
  }

  lines.push("")
  for (const p of sorted) {
    const alias = aliasByPath.get(p) ?? "producer"
    const stem = p.replace(/\.ts$/u, "")
    lines.push(`import ${alias} from "../../../../${stem}"`)
  }
  lines.push("")
  lines.push(TUPLE_PRAGMA)
  lines.push("export const producers = [")
  for (const p of sorted) {
    const alias = aliasByPath.get(p) ?? "producer"
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
