import { existsSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
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
import { bodyAt } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { said as gitSaid } from "akasha/git/modules/running/git-running.module.code.ts"
import {
  everyOfType,
  listedById,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { pageOf, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
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
  const froms = new Set(moves.map((one) => one.from))
  return rows.some(
    (one) =>
      (one.kind === "move" && froms.has(one.pathFrom)) ||
      (one.kind === "remove" && froms.has(one.path))
  )
}

const TYPED = ".ts"

const ID = "id"

const TEXT = new TextDecoder()

export function stemOf(page: string): string | null {
  const said = partedIn(page)
  if (said === null || said.sections.length > 0 || !page.endsWith(TYPED)) return null
  return join(dirname(page), pageOf(said))
}

function idOf(body: string | null): string | null {
  if (body === null) return null
  try {
    const value = valueIn(body)
    return value === null ? null : textAt(value, ID)
  } catch {
    return null
  }
}

type Bodies = ReadonlyMap<string, string | null>

export function movesById(gone: Bodies, put: Bodies): readonly FileMove[] {
  const went = new Map<string, string>()
  for (const [path, body] of gone) {
    const id = stemOf(path) === null ? null : idOf(body)
    if (id !== null) went.set(id, path)
  }
  if (went.size === 0) return []
  const moves: FileMove[] = []
  for (const [path, body] of put) {
    const id = stemOf(path) === null ? null : idOf(body)
    const from = id === null ? undefined : went.get(id)
    if (from === undefined || from === path || gone.has(path)) continue
    moves.push({ from, to: path })
    const was = `${stemOf(from) ?? from}.`
    const now = `${stemOf(path) ?? path}.`
    for (const one of gone.keys()) {
      if (one !== from && one.startsWith(was)) {
        moves.push({ from: one, to: `${now}${one.slice(was.length)}` })
      }
    }
  }
  return moves
}

export function wentById(root: string, head: string, path: string): string | null {
  const said = partedIn(path)
  if (said === null) return null
  const page = join(dirname(path), `${pageOf(said)}${TYPED}`)
  const stem = stemOf(page)
  if (stem === null) return null
  const log = ["log", "--format=%H", "--diff-filter=D", "-1", head, "--", page]
  const at = gitSaid(root, log).trim()
  if (at === "") return null
  const bytes = bodyAt(root, `${at}^`, page)
  const id = idOf(bytes === null ? null : TEXT.decode(bytes))
  const listed = id === null ? null : listedById(root, id)
  const now = listed === null ? null : stemOf(listed.path)
  if (listed === null || now === null || listed.path === page) return null
  return path === page ? listed.path : `${now}${path.slice(stem.length)}`
}

export type Landed = {
  readonly base: string
  readonly wrote: readonly string[]
  readonly took: readonly string[]
}

function movesLanded(root: string, landed: Landed): readonly FileMove[] {
  const put = new Map<string, string | null>()
  for (const one of landed.wrote) if (stemOf(one) !== null) put.set(one, null)
  if (put.size === 0 || landed.took.length === 0) return []
  const gone = new Map<string, string | null>()
  for (const one of landed.took) {
    const bytes = stemOf(one) === null ? null : bodyAt(root, landed.base, one)
    gone.set(one, bytes === null ? null : TEXT.decode(bytes))
  }
  for (const one of put.keys()) put.set(one, textThere(join(root, one)))
  return movesById(gone, put)
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

function safelyLanded(root: string, landed: Landed): readonly FileMove[] {
  try {
    return movesLanded(root, landed)
  } catch (thrown) {
    process.stderr.write(`no page moved by id was worked out: ${whyOf(thrown)}\n`)
    return []
  }
}

function pagesOf(root: string, types: readonly string[]): readonly string[] {
  return types.flatMap((type) => everyOfType(root, type).map((one) => one.path))
}

export function editsRepointed(
  root: string,
  landedMoves: readonly FileMove[],
  landed: Landed | null = null
): readonly string[] {
  const moves = [...landedMoves, ...(landed === null ? [] : safelyLanded(root, landed))]
  if (moves.length === 0) return []
  return [
    ...followedIn(root, moves),
    ...repointedIn(root, pagesOf(root, KEEPERS), moves),
    ...keptRepointedIn(root, pagesOf(root, [seat.slug]), moves),
  ]
}
