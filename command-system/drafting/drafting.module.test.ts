import { afterAll, expect, test } from "bun:test"
import { patchIn } from "@akasha/agents/patch-keeping"
import { said as gitSaid } from "@akasha/git/git-running"
import { bytesOf as bytes } from "@akasha/testing-system/bodying"
import { blobsIn } from "../../commands/modules/patching/patching.module.code.ts"
import { CLASH_MARK } from "../body-merging/body-merging.module.code.ts"
import {
  drafted,
  resolved,
  runningIn,
  runningOf,
  tookIn,
  wouldHold,
} from "./drafting.module.code.ts"
import {
  ALSO_NOT_TEXT,
  BIN,
  BOTH_RUN,
  CHECKS_RUN,
  clashing,
  draft,
  draftedBody,
  draftedBytes,
  FAR,
  folding,
  kindOf,
  landed,
  landedBytes,
  MOVED,
  NOT_TEXT,
  NOTHING_RUNS,
  ONE,
  PAGE,
  RESTATED,
  refs,
  renamed,
  repoAt,
  scratch,
  swapped,
  TEN,
  THEIRS,
  THEN_NOT_TEXT,
  TWO,
  textOr,
} from "./drafting.module.test-fixtures.ts"

afterAll(() => {
  scratch.sweep()
})

test("a patch taken in is folded into the patch taking it, and the one it came from goes", () => {
  const root = repoAt()
  drafted(root, THEIRS, [draft(TWO, null, "fresh\n")])
  const said = tookIn(root, PAGE, THEIRS)
  expect("why" in said).toBe(false)
  expect(draftedBody(root, TWO)).toBe("fresh\n")
  expect(patchIn(root, THEIRS)).toBeNull()
  expect(refs(root)).not.toContain("tester-a1")
})

test("a path both patches hold is merged rather than written over", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))])
  drafted(root, THEIRS, [draft(ONE, TEN, swapped(TEN, "i", "I"))])
  const said = tookIn(root, PAGE, THEIRS)
  expect("why" in said ? ["clashed"] : said.clashed).toEqual([])
  expect(draftedBody(root, ONE)).toBe(swapped(swapped(TEN, "b", "B"), "i", "I"))
})

test("a take-in from an agent keeping no patch leaves the patch as it was", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))])
  const said = tookIn(root, PAGE, THEIRS)
  expect("why" in said).toBe(false)
  expect(draftedBody(root, ONE)).toBe(swapped(TEN, "b", "B"))
})

test("a change drafted is what the patch leaves at that path", () => {
  const root = repoAt()
  const body = swapped(TEN, "b", "B")
  const said = drafted(root, PAGE, [draft(ONE, TEN, body)])
  expect("why" in said).toBe(false)
  expect(draftedBody(root, ONE)).toBe(body)
  expect(gitSaid(root, ["status", "--porcelain", "--", ONE])).toBe("")
})

test("a body that is not text is drafted as the bytes it is", () => {
  const root = repoAt()
  const said = drafted(root, PAGE, [{ path: BIN, was: null, body: NOT_TEXT }])
  expect("why" in said).toBe(false)
  expect([...(draftedBytes(root, BIN) ?? [])]).toEqual([...NOT_TEXT])
})

test("bytes that are not text moved on both sides refuse the draft rather than marking them", () => {
  const root = repoAt()
  landedBytes(root, BIN, NOT_TEXT)
  drafted(root, PAGE, [{ path: BIN, was: NOT_TEXT, body: ALSO_NOT_TEXT }])
  landedBytes(root, BIN, THEN_NOT_TEXT)
  const said = drafted(root, PAGE, [])
  expect("why" in said ? said.why : "").toContain("it is not text")
  expect([...(draftedBytes(root, BIN) ?? [])]).toEqual([...ALSO_NOT_TEXT])
})

test("a second path is drafted into the same patch", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))])
  drafted(root, PAGE, [draft(TWO, null, "fresh\n")])
  expect(draftedBody(root, ONE)).toBe(swapped(TEN, "b", "B"))
  expect(draftedBody(root, TWO)).toBe("fresh\n")
})

test("a second change to one path is merged onto what was drafted there", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))])
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "i", "I"))])
  expect(draftedBody(root, ONE)).toBe(swapped(swapped(TEN, "b", "B"), "i", "I"))
})

test("a patch is rebased onto a commit that moved under the draft", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))])
  landed(root, { [ONE]: swapped(TEN, "j", "J") })
  drafted(root, PAGE, [draft(TWO, null, "fresh\n")])
  expect(draftedBody(root, ONE)).toBe(swapped(swapped(TEN, "b", "B"), "j", "J"))
  const head = gitSaid(root, ["rev-parse", `HEAD:${ONE}`]).trim()
  expect(blobsIn(patchIn(root, PAGE) ?? "").get(ONE)?.base).toBe(head)
})

test("what the patch would hold carries a path this draft does not name", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))])
  const said = wouldHold(root, PAGE, [draft(TWO, null, "fresh\n")])
  if ("why" in said) throw new Error(said.why)
  expect([...said.held.keys()].sort()).toEqual([ONE, TWO])
  expect(textOr(said.held.get(ONE)?.body)).toBe(swapped(TEN, "b", "B"))
  expect(textOr(said.held.get(TWO)?.body)).toBe("fresh\n")
})

test("what the patch would hold is rebased onto the commit at HEAD", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))])
  landed(root, { [ONE]: swapped(TEN, "j", "J") })
  const said = wouldHold(root, PAGE, [])
  if ("why" in said) throw new Error(said.why)
  expect(textOr(said.held.get(ONE)?.body)).toBe(swapped(swapped(TEN, "b", "B"), "j", "J"))
})

test("what the patch would hold writes no patch", () => {
  const root = repoAt()
  const said = wouldHold(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))])
  expect("why" in said).toBe(false)
  expect(patchIn(root, PAGE)).toBeNull()
  expect(refs(root)).toBe("")
})

test("a line conflict is drafted into the patch as the body git marked", () => {
  const root = repoAt()
  clashing(root)
  expect(draftedBody(root, ONE)).toContain(CLASH_MARK)
  expect(draftedBody(root, ONE)).toContain("B\n")
  expect(draftedBody(root, ONE)).toContain("X\n")
  expect(draftedBody(root, TWO)).toBe("fresh\n")
})

test("a conflict carried into the patch is named by every later draft", () => {
  const root = repoAt()
  clashing(root)
  const said = drafted(root, PAGE, [draft(TWO, "fresh\n", "fresher\n")])
  if ("why" in said) throw new Error(said.why)
  expect(said.clashed).toEqual([ONE])
})

test("a conflict that is no line conflict refuses the draft", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(TWO, null, "mine\n")])
  const was = patchIn(root, PAGE)
  landed(root, { [TWO]: "theirs\n" })
  const said = drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))])
  expect("why" in said).toBe(true)
  expect(patchIn(root, PAGE)).toBe(was)
})

test("a body resolved replaces the body the patch drafted at that path", () => {
  const root = repoAt()
  clashing(root)
  const said = resolved(root, PAGE, ONE, bytes(swapped(TEN, "b", "R")))
  if ("why" in said) throw new Error(said.why)
  expect(said.clashed).toEqual([])
  expect(draftedBody(root, ONE)).toBe(swapped(TEN, "b", "R"))
  expect(draftedBody(root, TWO)).toBe("fresh\n")
})

test("a path the patch carries no body at is not resolved", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))])
  const said = resolved(root, PAGE, TWO, bytes("fresh\n"))
  expect("why" in said).toBe(true)
  expect(draftedBody(root, ONE)).toBe(swapped(TEN, "b", "B"))
})

test("a body resolved to what HEAD holds leaves the patch", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))])
  resolved(root, PAGE, ONE, bytes(TEN))
  expect(patchIn(root, PAGE)).toBeNull()
  expect(refs(root)).toBe("")
})

test("a change reaching HEAD by another route leaves the patch", () => {
  const root = repoAt()
  const body = swapped(TEN, "b", "B")
  drafted(root, PAGE, [draft(ONE, TEN, body)])
  landed(root, { [ONE]: body })
  drafted(root, PAGE, [])
  expect(patchIn(root, PAGE)).toBeNull()
  expect(refs(root)).toBe("")
})

test("a draft stating no body is drafted as a deletion", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, null)])
  expect(draftedBody(root, ONE)).toBeNull()
  expect(patchIn(root, PAGE) ?? "").toContain("deleted file mode")
})

test("a blob the patch names outlives a pruning of unreachable objects", () => {
  const root = repoAt()
  const body = swapped(TEN, "b", "B")
  drafted(root, PAGE, [draft(ONE, TEN, body)])
  expect(refs(root)).not.toBe("")
  gitSaid(root, ["gc", "--prune=now", "-q"])
  expect(draftedBody(root, ONE)).toBe(body)
})

test("a path renamed under the patch is drafted at the path the rename left it at", () => {
  const root = repoAt()
  const body = swapped(TEN, "b", "B")
  drafted(root, PAGE, [draft(ONE, TEN, body)])
  renamed(root, ONE, MOVED, TEN)
  const said = drafted(root, PAGE, [])
  if ("why" in said) throw new Error(said.why)
  expect(draftedBody(root, MOVED)).toBe(body)
  expect(draftedBody(root, ONE)).toBeNull()
})

test("a rename that also moved the body is merged onto what the patch drafted", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))])
  renamed(root, ONE, MOVED, swapped(TEN, "j", "J"))
  const said = drafted(root, PAGE, [])
  if ("why" in said) throw new Error(said.why)
  expect(draftedBody(root, MOVED)).toBe(swapped(swapped(TEN, "b", "B"), "j", "J"))
})

test("a rename of a path already renamed is followed to the last path", () => {
  const root = repoAt()
  const body = swapped(TEN, "b", "B")
  drafted(root, PAGE, [draft(ONE, TEN, body)])
  renamed(root, ONE, MOVED, TEN)
  renamed(root, MOVED, FAR, TEN)
  const said = wouldHold(root, PAGE, [])
  if ("why" in said) throw new Error(said.why)
  expect([...said.held.keys()]).toEqual([FAR])
  expect(textOr(said.held.get(FAR)?.body)).toBe(body)
})

test("a body at a path the rename left is resolved there", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))])
  renamed(root, ONE, MOVED, TEN)
  const said = resolved(root, PAGE, MOVED, bytes(swapped(TEN, "b", "R")))
  if ("why" in said) throw new Error(said.why)
  expect(draftedBody(root, MOVED)).toBe(swapped(TEN, "b", "R"))
})

test("a rename onto a path the patch already carries refuses the rebase", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))])
  drafted(root, PAGE, [draft(TWO, null, "fresh\n")])
  renamed(root, ONE, TWO, TEN)
  const said = drafted(root, PAGE, [])
  expect("why" in said ? said.why : "").toContain(TWO)
})

test("a path that is no page keeps no patch", () => {
  const root = scratch.rootFor("drafting-")
  const said = drafted(root, "akasha/not-a-page.txt", [draft(ONE, TEN, "x\n")])
  expect(said).toEqual({ why: "a path that is no page keeps no patch" })
})

test("a patch a change running nothing opened runs nothing", () => {
  expect(folding(repoAt(), NOTHING_RUNS, null)).toEqual(NOTHING_RUNS)
})

test("a change running the checks leaves the whole patch running them", () => {
  expect(folding(repoAt(), NOTHING_RUNS, BOTH_RUN)).toEqual(BOTH_RUN)
})

test("a patch running the checks is left running them by a change running none", () => {
  expect(folding(repoAt(), BOTH_RUN, NOTHING_RUNS)).toEqual(BOTH_RUN)
})

test("what a patch runs is folded one field at a time", () => {
  expect(folding(repoAt(), CHECKS_RUN, NOTHING_RUNS)).toEqual(CHECKS_RUN)
})

test("a patch carrying no line before the first diff header runs both", () => {
  expect(runningIn(`diff --git a/${ONE} b/${ONE}\n`)).toEqual(BOTH_RUN)
})

test("a change kind says what a patch runs, its checks apart from each reading owed", () => {
  expect(runningOf(kindOf(true, true, true))).toEqual(BOTH_RUN)
  expect(runningOf(kindOf(true, true, false))).toEqual(RESTATED)
  expect(runningOf(kindOf(true, false, false))).toEqual(CHECKS_RUN)
  expect(runningOf(kindOf(false, false, false))).toEqual(NOTHING_RUNS)
})

test("a call carrying no change kind runs every check and owes every reading", () => {
  expect(runningOf(undefined)).toEqual(BOTH_RUN)
})

test("a patch a change staling no reader opened stales none", () => {
  expect(folding(repoAt(), RESTATED, null)).toEqual(RESTATED)
})

test("a change staling its readers leaves the whole patch staling them", () => {
  expect(folding(repoAt(), RESTATED, BOTH_RUN)).toEqual(BOTH_RUN)
})

test("a patch names the one path whose readers owe no reading", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))], RESTATED)
  drafted(root, PAGE, [draft(TWO, null, "fresh\n")], BOTH_RUN)
  const patch = patchIn(root, PAGE) ?? ""
  expect(patch).toContain(`readersOweReading: false ${ONE}\n`)
  expect(patch.split("\n")).not.toContain("readersOweReading: false")
})

test("what the patch would hold says path by path whether the readers owe the reading", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))], RESTATED)
  drafted(root, PAGE, [draft(TWO, null, "fresh\n")], BOTH_RUN)
  const said = wouldHold(root, PAGE, [])
  if ("why" in said) throw new Error(said.why)
  expect(said.held.get(ONE)?.readersOweReading).toBe(false)
  expect(said.held.get(TWO)?.readersOweReading).toBe(true)
})

test("a patch naming no such line leaves every path it holds owing the reading", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))], BOTH_RUN)
  const patch = patchIn(root, PAGE) ?? ""
  expect(patch).not.toContain("readersOweReading")
  const said = wouldHold(root, PAGE, [])
  if ("why" in said) throw new Error(said.why)
  expect(said.held.get(ONE)?.readersOweReading).toBe(true)
})

test("a draft says on its own whether the readers of its path owe the reading", () => {
  const root = repoAt()
  drafted(
    root,
    PAGE,
    [
      { ...draft(ONE, TEN, swapped(TEN, "b", "B")), readersOweReading: false },
      draft(TWO, null, "fresh\n"),
    ],
    BOTH_RUN
  )
  const said = wouldHold(root, PAGE, [])
  if ("why" in said) throw new Error(said.why)
  expect(said.held.get(ONE)?.readersOweReading).toBe(false)
  expect(said.held.get(TWO)?.readersOweReading).toBe(true)
})

test("a path drafted into twice owes the reading where one draft of the two owed it", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))], RESTATED)
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "i", "I"))], BOTH_RUN)
  const said = wouldHold(root, PAGE, [])
  if ("why" in said) throw new Error(said.why)
  expect(said.held.get(ONE)?.readersOweReading).toBe(true)
})

test("a body resolved leaves the readers of that path owing the reading", () => {
  const root = repoAt()
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))], RESTATED)
  drafted(root, PAGE, [draft(TWO, null, "fresh\n")], RESTATED)
  const took = resolved(root, PAGE, ONE, bytes(swapped(TEN, "b", "R")))
  if ("why" in took) throw new Error(took.why)
  const said = wouldHold(root, PAGE, [])
  if ("why" in said) throw new Error(said.why)
  expect(said.held.get(ONE)?.readersOweReading).toBe(true)
  expect(said.held.get(TWO)?.readersOweReading).toBe(false)
})
