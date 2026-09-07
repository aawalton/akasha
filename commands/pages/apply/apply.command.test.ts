import { afterAll, expect, test } from "bun:test"
import { dropPatch, patchIn } from "@akasha/agents/patch-keeping"
import { said as gitSaid } from "@akasha/git/git-running"
import {
  taking,
  writing,
} from "../../../changes/modules/change-answer/change-answer.module.code.ts"
import {
  appendEdits,
  editsIn,
  foldedIn,
} from "../../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { headOf, rebasedHeld } from "../../../command-system/drafting/drafting.module.code.ts"
import { baseOf } from "../../../command-system/landing/landing.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { writing as putting } from "../../../command-system/scratching/scratching.module.test-fixtures.ts"
import {
  draftsOf,
  type Folded,
  folding,
  rebasedRows,
  undone,
  unwarranted,
} from "./apply.command.code.ts"

const PAGE = "akasha/seat-system/seats/pages/tester.seat.ts"

const ONE = "akasha/one.page.ts"

const TWO = "akasha/two.page.ts"

const MAPPED = "akasha/mapped.change-runner.addressed.ts"

const WAS = "a\nb\nc\n"

const NOW = "a\nB\nc\n"

const NOTES = "akasha/notes.txt"

const THREE = "a\nb\nc\n"

const MINE = "a\nB\nc\n"

const FOUR = "a\nb\nc\nd\n"

const BOTH = "a\nB\nc\nd\n"

const WHO = ["-c", "user.email=t@t", "-c", "user.name=t", "-c", "commit.gpgsign=false"]

const BYTES = new TextEncoder()

const TEXT = new TextDecoder()

const scratch = scratchWorld()

afterAll(() => {
  scratch.sweep()
})

test("a row whose writer owes no reading is held to no warrant", async () => {
  const root = await repo()
  const rows = [{ path: ONE, was: null, body: WAS, writerOwesReading: false }]
  expect(unwarranted(root, "tester", rows)).toEqual([])
})

test("a row saying nothing of its writer is carried to the warrant", async () => {
  const root = await repo()
  const rows = [{ path: ONE, was: null, body: WAS }]
  expect(() => unwarranted(root, "tester", rows)).toThrow("is not there")
})

test("a row worked out from an older body is judged as merged onto the commit at HEAD", async () => {
  const root = await repo()
  await committing(root, NOTES, THREE)
  const rows = [{ path: NOTES, was: THREE, body: MINE }]
  await committing(root, NOTES, FOUR)
  const said = rebasedRows(root, baseOf(root), rows)
  if ("why" in said) throw new Error(said.why)
  expect(TEXT.decode(said.held.get(NOTES)?.body ?? new Uint8Array())).toBe(BOTH)
})

test("two rows for one path are judged as the fold lands them", async () => {
  const root = await repo()
  await committing(root, NOTES, THREE)
  const rows = [
    { path: NOTES, was: THREE, body: MINE },
    { path: NOTES, was: MINE, body: BOTH },
  ]
  const said = rebasedRows(root, baseOf(root), rows)
  if ("why" in said) throw new Error(said.why)
  expect(TEXT.decode(said.held.get(NOTES)?.body ?? new Uint8Array())).toBe(BOTH)
})

test("a row worked out from the body at HEAD is judged as that row states", async () => {
  const root = await repo()
  await committing(root, NOTES, FOUR)
  const rows = [{ path: NOTES, was: FOUR, body: MINE }]
  const said = rebasedRows(root, baseOf(root), rows)
  if ("why" in said) throw new Error(said.why)
  expect(TEXT.decode(said.held.get(NOTES)?.body ?? new Uint8Array())).toBe(MINE)
})

test("two rows for one path the later did not follow refuse the checks as they refuse the fold", async () => {
  const root = await repo()
  await committing(root, NOTES, THREE)
  const rows = [
    { path: NOTES, was: THREE, body: MINE },
    { path: NOTES, was: "z\n", body: BOTH },
  ]
  const said = rebasedRows(root, baseOf(root), rows)

  expect(foldedIn(rows).refused).not.toBe(null)
  expect("why" in said ? said.why : null).toBe(foldedIn(rows).refused)
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
  const row = taking(ONE, WAS)
  appendEdits(root, PAGE, [row])

  folding(root, PAGE)

  expect(editsIn(root, PAGE)).toEqual({ rows: [row] })
})

test("the fold hands the landing the merge the checks judged", async () => {
  const root = await repo()
  await committing(root, NOTES, THREE)
  const row = writing(NOTES, THREE, MINE)
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
  const row = writing(NOTES, THREE, MINE)
  appendEdits(root, PAGE, [row])

  expect(landing(root, folding(root, PAGE))).toBe(MINE)
})

test("a row appended while the apply ran is left where the folded rows go", async () => {
  const root = await repo()
  const row = taking(ONE, WAS)
  appendEdits(root, PAGE, [row])
  const said = folding(root, PAGE)
  if (!("unfold" in said) || said.unfold === null) throw new Error("the fold answered no unfold")
  const later = writing(TWO, WAS, NOW)
  appendEdits(root, PAGE, [later])
  dropPatch(root, PAGE)

  expect(undone(root, PAGE, said.unfold, true)).toBe(null)

  expect(editsIn(root, PAGE)).toEqual({ rows: [later] })
})

test("a row for a body written again on every apply is dropped and named", async () => {
  const root = await repo()
  appendEdits(root, PAGE, [writing(MAPPED, WAS, NOW)])

  expect(foldOf(folding(root, PAGE))).toEqual({ folded: [], dropped: [MAPPED], unfold: null })

  expect(editsIn(root, PAGE)).toEqual({ rows: [] })
})

test("a row written again on every apply is dropped where another row folds", async () => {
  const root = await repo()
  appendEdits(root, PAGE, [writing(ONE, WAS, NOW), writing(MAPPED, WAS, NOW)])

  const said = folding(root, PAGE)

  expect("folded" in said ? said.dropped : []).toEqual([MAPPED])
  expect("folded" in said ? said.folded : []).toEqual([ONE])
})

test("a fold the apply landed is left where the apply left it", async () => {
  const root = await repo()
  const row = taking(ONE, WAS)
  appendEdits(root, PAGE, [row])
  const said = folding(root, PAGE)
  if (!("unfold" in said) || said.unfold === null) throw new Error("the fold answered no unfold")
  dropPatch(root, PAGE)

  expect(undone(root, PAGE, said.unfold, true)).toBe(null)

  expect(editsIn(root, PAGE)).toEqual({ rows: [] })
})

test("a fold the apply did not land leaves the rows though no patch is on disk", async () => {
  const root = await repo()
  const row = writing(ONE, WAS, WAS)
  appendEdits(root, PAGE, [row])
  const said = folding(root, PAGE)
  if (!("unfold" in said) || said.unfold === null) throw new Error("the fold answered no unfold")
  expect(patchIn(root, PAGE)).toBe(null)

  expect(undone(root, PAGE, said.unfold, false)).not.toBe(null)

  expect(editsIn(root, PAGE)).toEqual({ rows: [row] })
})

test("two rows for one path the later did not follow refuse the fold and leave the rows", async () => {
  const root = await repo()
  appendEdits(root, PAGE, [writing(ONE, WAS, NOW), writing(ONE, "z\n", NOW)])

  const said = folding(root, PAGE)

  expect("refusals" in said).toBe(true)
  expect("why" in editsIn(root, PAGE) ? [] : editsIn(root, PAGE)).not.toEqual({ rows: [] })
})

test("a path that is no page keeps no edits", async () => {
  const root = await repo()

  expect(folding(root, "akasha/notes.md")).toEqual({
    refusals: ["a path that is no page keeps no edits"],
  })
})

test("an edit stating no body drafts as a path holding no body", () => {
  expect(draftsOf([taking(ONE, WAS)])).toEqual([{ path: ONE, was: BYTES.encode(WAS), body: null }])
})

test("an edit naming the path that edit came from drafts as two paths", () => {
  const said = draftsOf([{ path: TWO, was: WAS, body: NOW, from: ONE }])

  expect(said).toEqual([
    { path: ONE, was: BYTES.encode(WAS), body: null },
    { path: TWO, was: null, body: BYTES.encode(NOW) },
  ])
})

test("an edit naming the path it lands at as the path it came from drafts as one path", () => {
  expect(draftsOf([{ path: ONE, was: WAS, body: NOW, from: ONE }])).toEqual([
    { path: ONE, was: BYTES.encode(WAS), body: BYTES.encode(NOW) },
  ])
})
