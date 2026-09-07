import { afterAll, expect, test } from "bun:test"
import { dropPatch, patchAt, patchIn } from "@akasha/agents/patch-keeping"
import { said as gitSaid } from "@akasha/git/git-running"
import {
  taking,
  writing,
} from "../../../changes/modules/change-answer/change-answer.module.code.ts"
import {
  appendEdits,
  editsIn,
} from "../../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { drafted } from "../../../command-system/drafting/drafting.module.code.ts"
import { baseOf } from "../../../command-system/landing/landing.module.code.ts"
import { blobsIn, refFor } from "../../../command-system/patching/patching.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { writing as putting } from "../../../command-system/scratching/scratching.module.test-fixtures.ts"
import { draftsOf, folding, rebasedRows, undone, unwarranted } from "./apply.command.code.ts"

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

test("a row worked out from the body at HEAD is judged as that row states", async () => {
  const root = await repo()
  await committing(root, NOTES, FOUR)
  const rows = [{ path: NOTES, was: FOUR, body: MINE }]
  const said = rebasedRows(root, baseOf(root), rows)
  if ("why" in said) throw new Error(said.why)
  expect(TEXT.decode(said.held.get(NOTES)?.body ?? new Uint8Array())).toBe(MINE)
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

function carried(root: string): readonly string[] {
  return [...blobsIn(patchIn(root, PAGE) ?? "")].map(([path]) => path).sort()
}

function kept(root: string): string {
  return gitSaid(root, ["rev-parse", refFor(patchAt(PAGE) ?? "")]).trim()
}

test("an edit is drafted into the patch and the rows it came from go", async () => {
  const root = await repo()
  const row = taking(ONE, WAS)
  appendEdits(root, PAGE, [row])

  expect(folding(root, PAGE)).toEqual({
    folded: [ONE],
    dropped: [],
    unfold: { patch: null, rows: [row] },
  })

  expect(editsIn(root, PAGE)).toEqual({ rows: [] })
  expect(carried(root)).toEqual([ONE])
})

test("a patch the agent already holds takes the folded edits in", async () => {
  const root = await repo()
  drafted(root, PAGE, [{ path: TWO, was: null, body: BYTES.encode(NOW) }])
  const was = patchIn(root, PAGE)
  const row = writing(ONE, WAS, NOW)
  appendEdits(root, PAGE, [row])

  expect(folding(root, PAGE)).toEqual({
    folded: [ONE],
    dropped: [],
    unfold: { patch: was, rows: [row] },
  })

  expect(carried(root)).toEqual([ONE, TWO])
})

test("a fold over no row leaves the patch as that patch is", async () => {
  const root = await repo()
  drafted(root, PAGE, [{ path: TWO, was: null, body: BYTES.encode(NOW) }])

  expect(folding(root, PAGE)).toEqual({ folded: [], dropped: [], unfold: null })

  expect(carried(root)).toEqual([TWO])
})

test("a row for a body written again on every apply is dropped and named", async () => {
  const root = await repo()
  appendEdits(root, PAGE, [writing(MAPPED, WAS, NOW)])

  expect(folding(root, PAGE)).toEqual({ folded: [], dropped: [MAPPED], unfold: null })

  expect(editsIn(root, PAGE)).toEqual({ rows: [] })
  expect(patchIn(root, PAGE)).toBe(null)
})

test("a row written again on every apply is dropped where another row folds", async () => {
  const root = await repo()
  appendEdits(root, PAGE, [writing(ONE, WAS, NOW), writing(MAPPED, WAS, NOW)])

  const said = folding(root, PAGE)

  expect("folded" in said ? said.dropped : []).toEqual([MAPPED])
  expect("folded" in said ? said.folded : []).toEqual([ONE])
  expect(carried(root)).toEqual([ONE])
})

test("a fold the apply refuses is undone, and the patch and the rows come back", async () => {
  const root = await repo()
  drafted(root, PAGE, [{ path: TWO, was: null, body: BYTES.encode(NOW) }])
  const was = patchIn(root, PAGE)
  const row = writing(ONE, WAS, NOW)
  appendEdits(root, PAGE, [row])
  const wasKept = kept(root)
  const said = folding(root, PAGE)
  if (!("unfold" in said) || said.unfold === null) throw new Error("the fold answered no unfold")
  const folded = kept(root)

  expect(undone(root, PAGE, said.unfold)).not.toBe(null)

  expect(patchIn(root, PAGE)).toEqual(was)
  expect(editsIn(root, PAGE)).toEqual({ rows: [row] })
  expect(carried(root)).toEqual([TWO])
  expect(folded).not.toBe(wasKept)
  expect(kept(root)).toBe(wasKept)
})

test("a fold that made the patch is undone by taking the patch away", async () => {
  const root = await repo()
  const row = taking(ONE, WAS)
  appendEdits(root, PAGE, [row])
  const said = folding(root, PAGE)
  if (!("unfold" in said) || said.unfold === null) throw new Error("the fold answered no unfold")

  undone(root, PAGE, said.unfold)

  expect(patchIn(root, PAGE)).toBe(null)
  expect(editsIn(root, PAGE)).toEqual({ rows: [row] })
})

test("a fold the apply landed is left where the apply left it", async () => {
  const root = await repo()
  const row = taking(ONE, WAS)
  appendEdits(root, PAGE, [row])
  const said = folding(root, PAGE)
  if (!("unfold" in said) || said.unfold === null) throw new Error("the fold answered no unfold")
  dropPatch(root, PAGE)

  expect(undone(root, PAGE, said.unfold)).toBe(null)

  expect(editsIn(root, PAGE)).toEqual({ rows: [] })
})

test("two rows for one path the later did not follow refuse the fold and leave the rows", async () => {
  const root = await repo()
  appendEdits(root, PAGE, [writing(ONE, WAS, NOW), writing(ONE, "z\n", NOW)])

  const said = folding(root, PAGE)

  expect("refusals" in said).toBe(true)
  expect(patchIn(root, PAGE)).toBe(null)
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
