export interface Pair {
  readonly old: string
  readonly next: string
  readonly all: boolean
}

function record(one: unknown, at: string): Record<string, unknown> {
  if (typeof one !== "object" || one === null || Array.isArray(one)) {
    throw new Error(`${at} is not an object`)
  }
  return one as Record<string, unknown>
}

function requiredString(entry: Record<string, unknown>, key: string, at: string): string {
  const held = entry[key]
  if (typeof held !== "string") throw new Error(`${at} has no \`${key}\` string`)
  return held
}

export function parsePairs(source: Record<string, unknown>, where: string): readonly Pair[] {
  const declared = source.edits
  const list = Array.isArray(declared) ? declared : [source]
  if (list.length === 0) throw new Error(`${where} declares no edit at all`)
  return list.map((one, i) => {
    const at = `${where} edit ${i + 1}`
    const entry = record(one, at)
    const old = requiredString(entry, "old_string", at)
    if (old === "") throw new Error(`${at} has an empty \`old_string\`, which matches everywhere and nowhere`)
    const all = entry.replace_all ?? false
    if (typeof all !== "boolean") throw new Error(`${at} has a \`replace_all\` that is not a boolean`)
    const next = requiredString(entry, "new_string", at)
    if (old === next) {
      throw new Error(`${at} declares an identical old_string and new_string, so it asks for no change`)
    }
    return { old, next, all }
  })
}

export function excerpt(text: string): string {
  const lines = text.split("\n")
  const first = lines[0] ?? ""
  const clipped = first.length > 60 ? `${first.slice(0, 60)}…` : first
  return lines.length > 1 ? `${clipped}… (${lines.length} lines)` : clipped
}

export function applyPairs(body: string, pairs: readonly Pair[]): { body: string } | { refusal: string } {
  let current = body
  for (const [index, pair] of pairs.entries()) {
    const occurrences = current.split(pair.old).length - 1
    if (occurrences === 0) {
      return {
        refusal: `edit ${index + 1} has no match — the body is not what you thought it was\n    old_string: ${excerpt(pair.old)}`,
      }
    }
    if (occurrences > 1 && !pair.all) {
      return {
        refusal: `edit ${index + 1} matches ${occurrences} times — name more surrounding text, or set replace_all\n    old_string: ${excerpt(pair.old)}`,
      }
    }
    current = current.split(pair.old).join(pair.next)
  }
  return { body: current }
}
