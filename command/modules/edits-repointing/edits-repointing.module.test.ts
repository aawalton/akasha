import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  appendEdits,
  editsAt,
  editsIn,
} from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  movedPath,
  repointed,
  repointedIn,
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
  appendEdits(root, SUBAGENT, [{ kind: "remove", path: OLD_PROSE }])

  expect(repointedIn(root, [SEAT, SUBAGENT], MOVES)).toEqual([])

  expect(editsIn(root, SEAT)).toEqual({
    rows: [
      { kind: "replace", path: NEW, contentFrom: "a", contentTo: "b" },
      { kind: "append", path: NEW_PROSE, content: "more\n" },
    ],
  })
  expect(editsIn(root, SUBAGENT)).toEqual({ rows: [{ kind: "remove", path: NEW_PROSE }] })
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
