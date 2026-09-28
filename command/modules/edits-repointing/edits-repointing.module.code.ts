import { existsSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { seat } from "akasha/agent/seat/seat.page-type.ts"
import { seatEditsAt } from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import { subagent } from "akasha/agent/subagent/subagent.page-type.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  appendEdits,
  editIn,
  editsAt,
  editsIn,
  editsWaiting,
  keptEdits,
} from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import type { FileMove } from "akasha/command/modules/path-moving/path-moving.module.code.ts"
import { exclusively } from "akasha/file/modules/exclusive/exclusive.module.code.ts"
import { textThere } from "akasha/file/system/modules/text-there/text-there.module.code.ts"
import { everyOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"
import { storyChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.ts"

const KEEPERS: readonly string[] = [
  seat.slug,
  subagent.slug,
  storyTurnPlayed.slug,
  storyChapterWritten.slug,
]

const PARTED = "/"

export function movedPath(path: string, moves: readonly FileMove[]): string {
  for (const one of moves) {
    if (path === one.from) return one.to
    if (path.startsWith(`${one.from}${PARTED}`)) return `${one.to}${path.slice(one.from.length)}`
  }
  return path
}

export function repointed(row: FileChange, moves: readonly FileMove[]): FileChange {
  if (row.kind === "move") {
    return {
      ...row,
      pathFrom: movedPath(row.pathFrom, moves),
      pathTo: movedPath(row.pathTo, moves),
    }
  }
  if (row.kind === "bring" && row.pathFrom !== undefined) {
    return { ...row, path: movedPath(row.path, moves), pathFrom: movedPath(row.pathFrom, moves) }
  }
  return { ...row, path: movedPath(row.path, moves) }
}

function carriesLanded(rows: readonly FileChange[], moves: readonly FileMove[]): boolean {
  return rows.some(
    (one) =>
      one.kind === "move" &&
      moves.some((move) => move.from === one.pathFrom && move.to === one.pathTo)
  )
}

function rowsAfter(
  rows: readonly FileChange[],
  moves: readonly FileMove[]
): readonly FileChange[] | null {
  if (carriesLanded(rows, moves)) return null
  const next = rows.map((one) => repointed(one, moves))
  const same = next.every((one, at) => JSON.stringify(one) === JSON.stringify(rows[at]))
  return same ? null : next
}

function carried(root: string, from: string, to: string, moves: readonly FileMove[]): undefined {
  keptEdits(root, from, (had) => {
    const into = appendEdits(
      root,
      to,
      had.map((one) => repointed(one, moves))
    )
    if ("why" in into) throw new Error(into.why)
    return null
  })
}

export function followedIn(root: string, moves: readonly FileMove[]): readonly string[] {
  const wrong: string[] = []
  for (const one of moves) {
    if (editsAt(one.to) === null || !editsWaiting(root, one.from)) continue
    if (existsSync(join(root, one.from))) continue
    try {
      carried(root, one.from, one.to, moves)
    } catch (thrown) {
      wrong.push(`the drafted edits beside \`${one.from}\` did not follow it: ${whyOf(thrown)}`)
    }
  }
  return wrong
}

function lineAfter(line: string, moves: readonly FileMove[]): string {
  const edit = editIn(line)
  if (edit === null) return line
  const held = JSON.parse(line) as Record<string, unknown>
  return JSON.stringify({ ...held, ...repointed(edit, moves) })
}

function linesAfter(text: string, moves: readonly FileMove[]): string | null {
  const lines = text.split("\n").filter((one) => one !== "")
  const rows = lines.flatMap((one) => {
    const edit = editIn(one)
    return edit === null ? [] : [edit]
  })
  if (carriesLanded(rows, moves)) return null
  const next = lines.map((one) => lineAfter(one, moves))
  const same = next.every((one, at) => one === lines[at])
  return same ? null : next.map((one) => `${one}\n`).join("")
}

export function keptRepointedIn(
  root: string,
  seats: readonly string[],
  moves: readonly FileMove[]
): readonly string[] {
  const wrong: string[] = []
  for (const page of seats) {
    const at = seatEditsAt(page)
    const text = at === null ? null : textThere(join(root, at))
    if (at === null || text === null || linesAfter(text, moves) === null) continue
    try {
      exclusively(join(root, at), (): undefined => {
        const now = textThere(join(root, at))
        const next = now === null ? null : linesAfter(now, moves)
        if (next !== null) writeFileSync(join(root, at), next)
      })
    } catch (thrown) {
      wrong.push(`the records kept beside \`${page}\` still name the paths moved: ${whyOf(thrown)}`)
    }
  }
  return wrong
}

function pending(root: string, page: string, moves: readonly FileMove[]): boolean {
  if (!editsWaiting(root, page)) return false
  const held = editsIn(root, page)
  return !("why" in held) && rowsAfter(held.rows, moves) !== null
}

export function repointedIn(
  root: string,
  pages: readonly string[],
  moves: readonly FileMove[]
): readonly string[] {
  const wrong: string[] = []
  if (moves.length === 0) return wrong
  for (const page of pages) {
    try {
      if (!pending(root, page, moves)) continue
      keptEdits(root, page, (had) => rowsAfter(had, moves) ?? had)
    } catch (thrown) {
      wrong.push(
        `the drafted edits beside \`${page}\` still name the paths moved: ${whyOf(thrown)}`
      )
    }
  }
  return wrong
}

function pagesOf(root: string, types: readonly string[]): readonly string[] {
  return types.flatMap((type) => everyOfType(root, type).map((one) => one.path))
}

export function editsRepointed(root: string, moves: readonly FileMove[]): readonly string[] {
  if (moves.length === 0) return []
  return [
    ...followedIn(root, moves),
    ...repointedIn(root, pagesOf(root, KEEPERS), moves),
    ...keptRepointedIn(root, pagesOf(root, [seat.slug]), moves),
  ]
}
