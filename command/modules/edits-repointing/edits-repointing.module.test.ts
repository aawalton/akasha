import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { seatEditsAt } from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  appendEdits,
  editsAt,
  editsIn,
} from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  followedIn,
  keptRepointedIn,
  movedPath,
  movesById,
  repointed,
  repointedIn,
  stemOf,
} from "akasha/command/modules/edits-repointing/edits-repointing.module.code.ts"
import { scratch } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const SEAT = "agent/seat/pages/one/one.seat.ts"

const SUBAGENT = "agent/subagent/pages/one-a1/one-a1.subagent.ts"

const OLD = "story/tales/chapters/one.story-chapter-written.ts"

const NEW = "story/tales/chapters/opening.story-chapter-written.ts"

const OLD_PROSE = "story/tales/chapters/one.story-chapter-written.prose.txt"

const NEW_PROSE = "story/tales/chapters/opening.story-chapter-written.prose.txt"

const ELSE = "story/tales/tales.story-written.ts"

const MOVES = [
  { from: OLD, to: NEW },
  { from: OLD_PROSE, to: NEW_PROSE },
]

function rootFor(): string {
  return scratch.rootFor("akasha-repointing-")
}

test("a path moved goes where it went, and any other path stays", () => {
  expect(movedPath(OLD, MOVES)).toBe(NEW)
  expect(movedPath(ELSE, MOVES)).toBe(ELSE)
})

test("a path under a folder moved goes where that folder went", () => {
  const folder = [{ from: "story/tales", to: "story/told" }]

  expect(movedPath(OLD, folder)).toBe("story/told/chapters/one.story-chapter-written.ts")
  expect(movedPath("story/talesque/one.ts", folder)).toBe("story/talesque/one.ts")
})

test("every path a row names is pointed again", () => {
  const replace = { kind: "replace", path: OLD, contentFrom: "a", contentTo: "b" } as const

  expect(repointed(replace, MOVES)).toEqual({ ...replace, path: NEW })
  expect(repointed({ kind: "move", pathFrom: OLD_PROSE, pathTo: ELSE }, MOVES)).toEqual({
    kind: "move",
    pathFrom: NEW_PROSE,
    pathTo: ELSE,
  })
  expect(repointed({ kind: "bring", path: ELSE, pathFrom: OLD }, MOVES)).toEqual({
    kind: "bring",
    path: ELSE,
    pathFrom: NEW,
  })
})

test("a seat's and a subagent's drafted edits follow a page and its prose moved", () => {
  const root = rootFor()
  appendEdits(root, SEAT, [
    { kind: "replace", path: OLD, contentFrom: "a", contentTo: "b" },
    { kind: "append", path: OLD_PROSE, content: "more\n" },
  ])
  appendEdits(root, SUBAGENT, [{ kind: "append", path: OLD_PROSE, content: "b\n" }])

  expect(repointedIn(root, [SEAT, SUBAGENT], MOVES)).toEqual([])

  expect(editsIn(root, SEAT)).toEqual({
    rows: [
      { kind: "replace", path: NEW, contentFrom: "a", contentTo: "b" },
      { kind: "append", path: NEW_PROSE, content: "more\n" },
    ],
  })
  expect(editsIn(root, SUBAGENT)).toEqual({
    rows: [{ kind: "append", path: NEW_PROSE, content: "b\n" }],
  })
})

test("drafted edits naming no path moved are left as they are", () => {
  const root = rootFor()
  const row = { kind: "add", path: ELSE, content: "a\n" } as const
  appendEdits(root, SEAT, [row])

  repointedIn(root, [SEAT], MOVES)

  expect(editsIn(root, SEAT)).toEqual({ rows: [row] })
})

test("the landing's own edits, holding the move it made, are left as they are", () => {
  const root = rootFor()
  const rows: readonly FileChange[] = [
    { kind: "replace", path: OLD, contentFrom: "a", contentTo: "b" },
    { kind: "move", pathFrom: OLD, pathTo: NEW },
  ]
  appendEdits(root, SEAT, rows)

  repointedIn(root, [SEAT], MOVES)

  expect(editsIn(root, SEAT)).toEqual({ rows })
})

test("edits a line refuses are left as they are", () => {
  const root = rootFor()
  const at = join(root, editsAt(SEAT) ?? "")
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `${JSON.stringify({ kind: "remove", path: OLD })}\nnot an edit\n`)

  expect(repointedIn(root, [SEAT], MOVES)).toEqual([])
  expect(editsIn(root, SEAT)).toEqual({ why: "line 2 reads as no edit" })
})

test("a landing moving nothing reads no edits", () => {
  const root = rootFor()
  appendEdits(root, SEAT, [{ kind: "remove", path: OLD }])

  expect(repointedIn(root, [SEAT], [])).toEqual([])
  expect(editsIn(root, SEAT)).toEqual({ rows: [{ kind: "remove", path: OLD }] })
})

test("a written chapter's kept edits left beside its old name follow it, pointed again", () => {
  const root = rootFor()
  appendEdits(root, OLD, [
    { kind: "append", path: OLD_PROSE, content: "more\n" },
    { kind: "add", path: ELSE, content: "a\n" },
  ])

  expect(followedIn(root, MOVES)).toEqual([])

  expect(editsIn(root, OLD)).toEqual({ rows: [] })
  expect(editsIn(root, NEW)).toEqual({
    rows: [
      { kind: "append", path: NEW_PROSE, content: "more\n" },
      { kind: "add", path: ELSE, content: "a\n" },
    ],
  })
})

test("kept edits beside a page still there stay beside it", () => {
  const root = rootFor()
  const full = join(root, OLD)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, "")
  appendEdits(root, OLD, [{ kind: "remove", path: ELSE }])

  followedIn(root, MOVES)

  expect(editsIn(root, OLD)).toEqual({ rows: [{ kind: "remove", path: ELSE }] })
})

function keptAt(root: string): string {
  const at = join(root, seatEditsAt(SEAT) ?? "")
  mkdirSync(dirname(at), { recursive: true })
  return at
}

test("a seat's records kept for its subagents are pointed again and keep who left them", () => {
  const root = rootFor()
  const at = keptAt(root)
  const record = {
    kind: "append",
    path: OLD,
    content: "a\n",
    leftBy: "one-a1",
    carriedAt: "2026-09-28",
  }
  writeFileSync(at, `${JSON.stringify(record)}\nnot an edit\n`)

  expect(keptRepointedIn(root, [SEAT], MOVES)).toEqual([])

  expect(readFileSync(at, "utf8")).toBe(
    `${JSON.stringify({ ...record, path: NEW })}\nnot an edit\n`
  )
})

test("a seat's records naming no path moved are not written again", () => {
  const root = rootFor()
  const at = keptAt(root)
  const text = `${JSON.stringify({ kind: "remove", path: ELSE, leftBy: "one-a1" })}\n`
  writeFileSync(at, text)

  keptRepointedIn(root, [SEAT], MOVES)

  expect(readFileSync(at, "utf8")).toBe(text)
})

const METRICS = "story/overwhere-i/mechanics/metrics"

const MANA_WAS = `${METRICS}/resources/mana/pages/overwhere-i-nala.overwhere-i-mana.ts`

const MANA_IS = `${METRICS}/manas/overwhere-i-nala.metric-character-mana.ts`

const HISTORY_WAS = `${METRICS}/resources/mana/pages/overwhere-i-nala.overwhere-i-mana.history.jsonl`

const HISTORY_IS = `${METRICS}/manas/overwhere-i-nala.metric-character-mana.history.jsonl`

const NALA_ID = "01a0f000-0000-7000-8000-00000000000a"

function pageBody(type: string): string {
  return (
    `export const overwhereINala = {\n  id: "${NALA_ID}",\n  type: "page-type/${type}",\n` +
    `  slug: "overwhere-i-nala",\n} as const\n`
  )
}

test("a page taken away and written again under its id elsewhere is moved, with its history", () => {
  const gone = new Map([
    [MANA_WAS, pageBody("overwhere-i-mana")],
    [HISTORY_WAS, null],
  ])
  const put = new Map([[MANA_IS, pageBody("metric-character-mana")]])

  expect(movesById(gone, put)).toEqual([
    { from: MANA_WAS, to: MANA_IS },
    { from: HISTORY_WAS, to: HISTORY_IS },
  ])
})

test("a page written again under another id is no move", () => {
  const gone = new Map([[MANA_WAS, pageBody("overwhere-i-mana")]])
  const other = pageBody("metric-character-mana").replace(
    NALA_ID,
    "01a0f000-0000-7000-8000-0000000000bb"
  )

  expect(movesById(gone, new Map([[MANA_IS, other]]))).toEqual([])
})

test("a game master's kept append on the old history follows a page moved by its id", () => {
  const root = rootFor()
  appendEdits(root, SEAT, [{ kind: "append", path: HISTORY_WAS, content: "{}\n" }])
  const moves = movesById(
    new Map([
      [MANA_WAS, pageBody("overwhere-i-mana")],
      [HISTORY_WAS, null],
    ]),
    new Map([[MANA_IS, pageBody("metric-character-mana")]])
  )

  repointedIn(root, [SEAT], moves)

  expect(editsIn(root, SEAT)).toEqual({
    rows: [{ kind: "append", path: HISTORY_IS, content: "{}\n" }],
  })
})

test("the landing's own edits taking the old page away are left as they are", () => {
  const root = rootFor()
  const rows: readonly FileChange[] = [
    { kind: "remove", path: MANA_WAS },
    { kind: "add", path: MANA_IS, content: pageBody("metric-character-mana") },
  ]
  appendEdits(root, SEAT, rows)

  repointedIn(root, [SEAT], [{ from: MANA_WAS, to: MANA_IS }])

  expect(editsIn(root, SEAT)).toEqual({ rows })
})

test("the stem of a page is its path without the ending, and a file beside it has none", () => {
  expect(stemOf(MANA_IS)).toBe(`${METRICS}/manas/overwhere-i-nala.metric-character-mana`)
  expect(stemOf(HISTORY_IS)).toBe(null)
})
