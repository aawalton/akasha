import { afterAll, expect, test } from "bun:test"
import { patchIn } from "@akasha/agents/patch-keeping"
import { said as gitSaid } from "@akasha/git/git-running"
import { CLASH_MARK } from "../body-merging/body-merging.module.code.ts"
import { blobsIn, bodyOf } from "../patching/patching.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { writing } from "../scratching/scratching.module.test-fixtures.ts"
import { drafted, resolved, tookIn, wouldHold } from "./drafting.module.code.ts"

const PAGE = "akasha/seat-system/seat/seats/tester.seat.ts"
const THEIRS = "akasha/seat-system/subagents/pages/tester-a1.subagent.ts"
const ONE = "akasha/one.page.ts"
const TWO = "akasha/two.page.ts"
const TEN = "a\nb\nc\nd\ne\nf\ng\nh\ni\nj\n"
const WHO = ["-c", "user.email=t@t", "-c", "user.name=t", "-c", "commit.gpgsign=false"]

const scratch = scratchWorld()

afterAll(() => {
  scratch.sweep()
})

function landed(root: string, bodies: Readonly<Record<string, string>>): undefined {
  const paths = Object.keys(bodies)
  for (const path of paths) writing(root, path, bodies[path] ?? "")
  gitSaid(root, ["add", "--", ...paths])
  gitSaid(root, [...WHO, "commit", "-q", "-m", "landed", "--", ...paths])
}

function repoAt(): string {
  const root = scratch.rootFor("drafting-")
  gitSaid(root, ["init", "-q", "-b", "main", "."])
  landed(root, { [ONE]: TEN })
  return root
}

function swapped(was: string, from: string, to: string): string {
  return was.replace(`${from}\n`, `${to}\n`)
}

function refs(root: string): string {
  return gitSaid(root, ["for-each-ref", "--format=%(refname)", "refs/akasha/patch"])
}

function draftedBody(root: string, path: string): string | null {
  const patch = patchIn(root, PAGE)
  if (patch === null) return null
  const blobs = blobsIn(patch).get(path)
  return blobs === undefined ? null : bodyOf(root, blobs.result)
}

function clashing(root: string): undefined {
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "b", "B") }])
  landed(root, { [ONE]: swapped(TEN, "b", "X") })
  const said = drafted(root, PAGE, [{ path: TWO, was: null, body: "fresh\n" }])
  if ("why" in said) throw new Error(said.why)
  expect(said.clashed).toEqual([ONE])
}

test("a patch taken in is folded into the patch taking it, and the one it came from goes", () => {
  const root = repoAt()
  drafted(root, THEIRS, [{ path: TWO, was: null, body: "fresh\n" }])
  const said = tookIn(root, PAGE, THEIRS)
  expect("why" in said).toBe(false)
  expect(draftedBody(root, TWO)).toBe("fresh\n")
  expect(patchIn(root, THEIRS)).toBeNull()
  expect(refs(root)).not.toContain("tester-a1")
})

test("a path both patches hold is merged rather than written over", () => {
  const root = repoAt()
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "b", "B") }])
  drafted(root, THEIRS, [{ path: ONE, was: TEN, body: swapped(TEN, "i", "I") }])
  const said = tookIn(root, PAGE, THEIRS)
  expect("why" in said ? ["clashed"] : said.clashed).toEqual([])
  expect(draftedBody(root, ONE)).toBe(swapped(swapped(TEN, "b", "B"), "i", "I"))
})

test("a take-in from an agent keeping no patch leaves the patch as it was", () => {
  const root = repoAt()
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "b", "B") }])
  const said = tookIn(root, PAGE, THEIRS)
  expect("why" in said).toBe(false)
  expect(draftedBody(root, ONE)).toBe(swapped(TEN, "b", "B"))
})

test("a change drafted is what the patch leaves at that path", () => {
  const root = repoAt()
  const body = swapped(TEN, "b", "B")
  const said = drafted(root, PAGE, [{ path: ONE, was: TEN, body }])
  expect("why" in said).toBe(false)
  expect(draftedBody(root, ONE)).toBe(body)
  expect(gitSaid(root, ["status", "--porcelain", "--", ONE])).toBe("")
})

test("a second path is drafted into the same patch", () => {
  const root = repoAt()
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "b", "B") }])
  drafted(root, PAGE, [{ path: TWO, was: null, body: "fresh\n" }])
  expect(draftedBody(root, ONE)).toBe(swapped(TEN, "b", "B"))
  expect(draftedBody(root, TWO)).toBe("fresh\n")
})

test("a second change to one path is merged onto what was drafted there", () => {
  const root = repoAt()
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "b", "B") }])
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "i", "I") }])
  expect(draftedBody(root, ONE)).toBe(swapped(swapped(TEN, "b", "B"), "i", "I"))
})

test("a patch is rebased onto a commit that moved under the draft", () => {
  const root = repoAt()
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "b", "B") }])
  landed(root, { [ONE]: swapped(TEN, "j", "J") })
  drafted(root, PAGE, [{ path: TWO, was: null, body: "fresh\n" }])
  expect(draftedBody(root, ONE)).toBe(swapped(swapped(TEN, "b", "B"), "j", "J"))
  const head = gitSaid(root, ["rev-parse", `HEAD:${ONE}`]).trim()
  expect(blobsIn(patchIn(root, PAGE) ?? "").get(ONE)?.base).toBe(head)
})

test("what the patch would hold carries a path this draft does not name", () => {
  const root = repoAt()
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "b", "B") }])
  const said = wouldHold(root, PAGE, [{ path: TWO, was: null, body: "fresh\n" }])
  if ("why" in said) throw new Error(said.why)
  expect([...said.held.keys()].sort()).toEqual([ONE, TWO])
  expect(said.held.get(ONE)?.body).toBe(swapped(TEN, "b", "B"))
  expect(said.held.get(TWO)?.body).toBe("fresh\n")
})

test("what the patch would hold is rebased onto the commit at HEAD", () => {
  const root = repoAt()
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "b", "B") }])
  landed(root, { [ONE]: swapped(TEN, "j", "J") })
  const said = wouldHold(root, PAGE, [])
  if ("why" in said) throw new Error(said.why)
  expect(said.held.get(ONE)?.body).toBe(swapped(swapped(TEN, "b", "B"), "j", "J"))
})

test("what the patch would hold writes no patch", () => {
  const root = repoAt()
  const said = wouldHold(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "b", "B") }])
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
  const said = drafted(root, PAGE, [{ path: TWO, was: "fresh\n", body: "fresher\n" }])
  if ("why" in said) throw new Error(said.why)
  expect(said.clashed).toEqual([ONE])
})

test("a conflict that is no line conflict refuses the draft", () => {
  const root = repoAt()
  drafted(root, PAGE, [{ path: TWO, was: null, body: "mine\n" }])
  const was = patchIn(root, PAGE)
  landed(root, { [TWO]: "theirs\n" })
  const said = drafted(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "b", "B") }])
  expect("why" in said).toBe(true)
  expect(patchIn(root, PAGE)).toBe(was)
})

test("a body resolved replaces the body the patch drafted at that path", () => {
  const root = repoAt()
  clashing(root)
  const said = resolved(root, PAGE, ONE, swapped(TEN, "b", "R"))
  if ("why" in said) throw new Error(said.why)
  expect(said.clashed).toEqual([])
  expect(draftedBody(root, ONE)).toBe(swapped(TEN, "b", "R"))
  expect(draftedBody(root, TWO)).toBe("fresh\n")
})

test("a path the patch carries no body at is not resolved", () => {
  const root = repoAt()
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "b", "B") }])
  const said = resolved(root, PAGE, TWO, "fresh\n")
  expect("why" in said).toBe(true)
  expect(draftedBody(root, ONE)).toBe(swapped(TEN, "b", "B"))
})

test("a body resolved to what HEAD holds leaves the patch", () => {
  const root = repoAt()
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "b", "B") }])
  const said = resolved(root, PAGE, ONE, TEN)
  expect(said).toEqual({ patch: null, clashed: [] })
  expect(patchIn(root, PAGE)).toBeNull()
  expect(refs(root)).toBe("")
})

test("a change reaching HEAD by another route leaves the patch", () => {
  const root = repoAt()
  const body = swapped(TEN, "b", "B")
  drafted(root, PAGE, [{ path: ONE, was: TEN, body }])
  landed(root, { [ONE]: body })
  const said = drafted(root, PAGE, [])
  expect(said).toEqual({ patch: null, clashed: [] })
  expect(patchIn(root, PAGE)).toBeNull()
  expect(refs(root)).toBe("")
})

test("a draft stating no body is drafted as a deletion", () => {
  const root = repoAt()
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: null }])
  expect(draftedBody(root, ONE)).toBeNull()
  expect(patchIn(root, PAGE) ?? "").toContain("deleted file mode")
})

test("a blob the patch names outlives a pruning of unreachable objects", () => {
  const root = repoAt()
  const body = swapped(TEN, "b", "B")
  drafted(root, PAGE, [{ path: ONE, was: TEN, body }])
  expect(refs(root)).not.toBe("")
  gitSaid(root, ["gc", "--prune=now", "-q"])
  expect(draftedBody(root, ONE)).toBe(body)
})

test("a path that is no page keeps no patch", () => {
  const root = scratch.rootFor("drafting-")
  const said = drafted(root, "akasha/not-a-page.txt", [{ path: ONE, was: TEN, body: "x\n" }])
  expect(said).toEqual({ why: "a path that is no page keeps no patch" })
})
