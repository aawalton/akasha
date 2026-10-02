import {
  type BodyOf,
  type FileChange,
  pathsOf,
  replayed,
} from "akasha/change/modules/answer/change-answer.module.code.ts"

const TURN_TAIL = ".story-turn-played.ts"

const COVER = /^\s*cover:\s*"([^"]*)"/m

const COVER_AFTER = /^\s*coverAfter:\s*["'`]/m

function coverIn(body: string | null): string | null {
  if (body === null) return null
  return COVER.exec(body)?.[1] ?? null
}

export function unanchored(before: string | null, after: string): boolean {
  const cover = coverIn(after)
  if (cover === null || cover === coverIn(before)) return false
  return !COVER_AFTER.test(after)
}

export function unanchoredAfter(
  bodyOf: BodyOf,
  rows: readonly FileChange[],
  asked: readonly FileChange[]
): readonly string[] {
  const named = new Set(asked.flatMap(pathsOf).filter((path) => path.endsWith(TURN_TAIL)))
  if (named.size === 0) return []
  const after = replayed({ edits: rows, refused: null }, bodyOf)
  if ("refused" in after) return []
  const found: string[] = []
  for (const path of named) {
    const body = after.get(path)
    const before = bodyOf(path)
    if (typeof body !== "string") continue
    if (!unanchored(typeof before === "string" ? before : null, body)) continue
    found.push(
      `\`${path}\` would state a new cover and no \`coverAfter\`, so draft \`coverAfter\` too: the first twelve or so words of the paragraph the picture is drawn after, quoted exactly`
    )
  }
  return found
}
