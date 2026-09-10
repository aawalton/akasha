import { afterAll, expect, test } from "bun:test"
import { nothingFiled, valueAlsoFiled } from "@akasha/indexes/testing"
import {
  appendEdits,
  editsIn,
} from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import type { FileChange } from "../../../changes/modules/answer/change-answer.module.types.ts"
import { said as gitSaid } from "../../../git/running/git-running.module.code.ts"
import { headOf, rebasedHeld } from "../drafting/drafting.module.code.ts"
import { baseOf } from "../landing/landing.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { writing as putting } from "../scratching/scratching.module.test-fixtures.ts"
import {
  type Folded,
  folding,
  rebasedRows,
  runningOver,
  undone,
} from "./apply-running.module.code.ts"

const PAGE = "akasha/seat-system/seats/pages/tester.seat.ts"

const ONE = "akasha/one.page.ts"

const TWO = "akasha/two.page.ts"

const RUNNER = "change-runner"

const MAPPED_PAGE = `akasha/mapped.${RUNNER}.ts`

const MAPPED_ID = "01a081cd-0cb7-7579-9073-ed4e5aa98bf0"

const MAPPED = `akasha/mapped.${RUNNER}.addressed.ts`

const WAS = "a\nb\nc\n"

const NOW = "a\nB\nc\n"

const NOTES = "akasha/notes.txt"

const THREE = "a\nb\nc\n"

const MINE = "a\nB\nc\n"

const FOUR = "a\nb\nc\nd\n"

const BOTH = "a\nB\nc\nd\n"

const WHO = ["-c", "user.email=t@t", "-c", "user.name=t", "-c", "commit.gpgsign=false"]

const TEXT = new TextDecoder()

const scratch = scratchWorld()

afterAll(() => {
  scratch.sweep()
})

function replacing(path: string, contentFrom: string, contentTo: string): FileChange {
  return { kind: "replace", path, contentFrom, contentTo }
}

function removing(path: string): FileChange {
  return { kind: "remove", path }
}

test("a row worked out from an older body is judged as merged onto the commit at HEAD", async () => {
  const root = await repo()
  await committing(root, NOTES, THREE)
  const rows = [replacing(NOTES, THREE, MINE)]
  await committing(root, NOTES, FOUR)
  const said = rebasedRows(root, baseOf(root), rows)
  if ("why" in said) throw new Error(said.why)
  expect(TEXT.decode(said.held.get(NOTES)?.body ?? new Uint8Array())).toBe(BOTH)
})

test("two rows for one path are judged as the fold lands them", async () => {
  const root = await repo()
  await committing(root, NOTES, THREE)
  const rows = [replacing(NOTES, THREE, MINE), replacing(NOTES, MINE, BOTH)]
  const said = rebasedRows(root, baseOf(root), rows)
  if ("why" in said) throw new Error(said.why)
  expect(TEXT.decode(said.held.get(NOTES)?.body ?? new Uint8Array())).toBe(BOTH)
})

test("a row worked out from the body at HEAD is judged as that row states", async () => {
  const root = await repo()
  await committing(root, NOTES, FOUR)
  const rows = [replacing(NOTES, FOUR, MINE)]
  const said = rebasedRows(root, baseOf(root), rows)
  if ("why" in said) throw new Error(said.why)
  expect(TEXT.decode(said.held.get(NOTES)?.body ?? new Uint8Array())).toBe(MINE)
})

test("two rows for one path the later did not follow refuse the checks as the replay refuses them", async () => {
  const root = await repo()
  await committing(root, NOTES, THREE)
  const rows = [replacing(NOTES, THREE, MINE), replacing(NOTES, "z\n", BOTH)]

  const said = rebasedRows(root, baseOf(root), rows)

  expect("why" in said).toBe(true)
})

async function committing(root: string, path: string, body: string): Promise<undefined> {
  await putting(root, path, body)
  gitSaid(root, ["add", "--", path])
  gitSaid(root, [...WHO, "commit", "-q", "-m", path, "--", path])
}

async function repo(): Promise<string> {
  const root = scratch.rootFor("akasha-apply-")
  gitSaid(root, ["init", "-q", "-b", "main", "."])
  await putting(root, ONE, WAS)
  gitSaid(root, ["add", "--", ONE])
  gitSaid(root, [...WHO, "commit", "-q", "-m", "base", "--", ONE])
  nothingFiled(root)
  valueAlsoFiled(root, RUNNER, [
    { path: MAPPED_PAGE, value: { id: MAPPED_ID, pageTypeSlug: RUNNER, slug: "mapped" } },
  ])
  return root
}

function foldOf(said: Folded): unknown {
  if ("refusals" in said) return said
  return { folded: said.folded, dropped: said.dropped, unfold: said.unfold }
}

function landing(root: string, said: Folded): string {
  if (!("carried" in said) || said.carried === null) throw new Error("the fold carried nothing")
  const lands = rebasedHeld(root, headOf(root), said.carried.held)
  if ("why" in lands) throw new Error(lands.why)
  return TEXT.decode(lands.held.get(NOTES)?.body ?? new Uint8Array())
}

test("a run that stops between the fold and the landing keeps the edits", async () => {
  const root = await repo()
  const row = removing(ONE)
  appendEdits(root, PAGE, [row])

  folding(root, PAGE)

  expect(editsIn(root, PAGE)).toEqual({ rows: [row] })
})

test("the fold hands the landing the merge the checks judged", async () => {
  const root = await repo()
  await committing(root, NOTES, THREE)
  const row = replacing(NOTES, THREE, MINE)
  appendEdits(root, PAGE, [row])
  await committing(root, NOTES, FOUR)
  const judged = rebasedRows(root, baseOf(root), [row])
  if ("why" in judged) throw new Error(judged.why)

  const said = landing(root, folding(root, PAGE))

  expect(said).toBe(BOTH)
  expect(said).toBe(TEXT.decode(judged.held.get(NOTES)?.body ?? new Uint8Array()))
})

test("a fold over a row nothing moved under hands the body that row states", async () => {
  const root = await repo()
  await committing(root, NOTES, THREE)
  const row = replacing(NOTES, THREE, MINE)
  appendEdits(root, PAGE, [row])

  expect(landing(root, folding(root, PAGE))).toBe(MINE)
})

test("a row appended while the apply ran is left where the folded rows go", async () => {
  const root = await repo()
  const row = removing(ONE)
  appendEdits(root, PAGE, [row])
  const said = folding(root, PAGE)
  if (!("unfold" in said) || said.unfold === null) throw new Error("the fold answered no unfold")
  const later: FileChange = { kind: "add", path: TWO, content: NOW }
  appendEdits(root, PAGE, [later])

  expect(undone(root, PAGE, said.unfold, true)).toBe(null)

  expect(editsIn(root, PAGE)).toEqual({ rows: [later] })
})

test("a row for a body written again on every apply is dropped and named", async () => {
  const root = await repo()
  appendEdits(root, PAGE, [replacing(MAPPED, WAS, NOW)])

  expect(foldOf(folding(root, PAGE))).toEqual({ folded: [], dropped: [MAPPED], unfold: null })

  expect(editsIn(root, PAGE)).toEqual({ rows: [] })
})

test("a row written again on every apply is dropped where another row folds", async () => {
  const root = await repo()
  appendEdits(root, PAGE, [replacing(ONE, WAS, NOW), replacing(MAPPED, WAS, NOW)])

  const said = folding(root, PAGE)

  expect("folded" in said ? said.dropped : []).toEqual([MAPPED])
  expect("folded" in said ? said.folded : []).toEqual([ONE])
})

test("a fold the apply landed is left where the apply left it", async () => {
  const root = await repo()
  const row = removing(ONE)
  appendEdits(root, PAGE, [row])
  const said = folding(root, PAGE)
  if (!("unfold" in said) || said.unfold === null) throw new Error("the fold answered no unfold")

  expect(undone(root, PAGE, said.unfold, true)).toBe(null)

  expect(editsIn(root, PAGE)).toEqual({ rows: [] })
})

test("a fold the apply did not land leaves the rows", async () => {
  const root = await repo()
  const row = replacing(ONE, WAS, NOW)
  appendEdits(root, PAGE, [row])
  const said = folding(root, PAGE)
  if (!("unfold" in said) || said.unfold === null) throw new Error("the fold answered no unfold")

  expect(undone(root, PAGE, said.unfold, false)).not.toBe(null)

  expect(editsIn(root, PAGE)).toEqual({ rows: [row] })
})

test("two rows for one path the later did not follow refuse the apply and leave the rows", async () => {
  const root = await repo()
  appendEdits(root, PAGE, [replacing(ONE, WAS, NOW), replacing(ONE, "z\n", NOW)])

  const said = folding(root, PAGE)

  expect("refusals" in said).toBe(true)
  expect("why" in editsIn(root, PAGE) ? [] : editsIn(root, PAGE)).not.toEqual({ rows: [] })
})

test("a fold whose every row says the writer owes no reading owes none", () => {
  const rows: readonly FileChange[] = [{ kind: "remove", path: ONE, writerOwesReading: false }]

  expect(runningOver(rows).writerOwesReading).toBe(false)
})

test("the writer owes a reading where any row a fold holds says the writer owes one", () => {
  const rows: readonly FileChange[] = [
    { kind: "remove", path: ONE, writerOwesReading: false },
    { kind: "remove", path: TWO },
  ]

  expect(runningOver(rows).writerOwesReading).toBe(true)
})

test("the fold hands the landing the running its rows state", async () => {
  const root = await repo()
  const row: FileChange = {
    kind: "replace",
    path: ONE,
    contentFrom: WAS,
    contentTo: NOW,
    writerOwesReading: false,
  }
  appendEdits(root, PAGE, [row])

  const said = folding(root, PAGE)

  expect("carried" in said ? said.carried?.running : null).toEqual({
    checks: true,
    writerOwesReading: false,
    readersOweReading: true,
  })
})

test("a path that is no page keeps no edits", async () => {
  const root = await repo()

  expect(folding(root, "akasha/notes.md")).toEqual({
    refusals: ["a path that is no page keeps no edits"],
  })
})
