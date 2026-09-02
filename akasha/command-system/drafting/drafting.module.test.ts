import { afterAll, expect, test } from "bun:test"
import { patchIn } from "@akasha/agents/patch-keeping"
import { said as gitSaid } from "@akasha/git/git-running"
import { blobsIn, bodyOf } from "../patching/patching.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { writing } from "../scratching/scratching.module.test-fixtures.ts"
import { drafted } from "./drafting.module.code.ts"

const PAGE = "akasha/seat-system/seat/seats/tester.seat.ts"
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

function draftedBody(root: string, path: string): string | null {
  const patch = patchIn(root, PAGE)
  if (patch === null) return null
  const blobs = blobsIn(patch).get(path)
  return blobs === undefined ? null : bodyOf(root, blobs.result)
}

test("a change drafted is what the patch leaves at that path", () => {
  const root = repoAt()
  const body = swapped(TEN, "b", "B")
  const said = drafted(root, PAGE, [{ path: ONE, was: TEN, body }])
  expect("why" in said).toBe(false)
  expect(draftedBody(root, ONE)).toBe(body)
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
})

test("a patch is read against the commit at HEAD after a rebase", () => {
  const root = repoAt()
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "b", "B") }])
  landed(root, { [ONE]: swapped(TEN, "j", "J") })
  drafted(root, PAGE, [{ path: TWO, was: null, body: "fresh\n" }])
  const head = gitSaid(root, ["rev-parse", `HEAD:${ONE}`]).trim()
  expect(blobsIn(patchIn(root, PAGE) ?? "").get(ONE)?.base).toBe(head)
})

test("a conflict refuses the draft", () => {
  const root = repoAt()
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "b", "B") }])
  landed(root, { [ONE]: swapped(TEN, "b", "X") })
  const said = drafted(root, PAGE, [{ path: TWO, was: null, body: "fresh\n" }])
  expect("why" in said).toBe(true)
})

test("a draft refused leaves the patch as the patch was", () => {
  const root = repoAt()
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "b", "B") }])
  const was = patchIn(root, PAGE)
  landed(root, { [ONE]: swapped(TEN, "b", "X") })
  drafted(root, PAGE, [{ path: TWO, was: null, body: "fresh\n" }])
  expect(patchIn(root, PAGE)).toBe(was)
})

test("a change reaching HEAD by another route leaves the patch", () => {
  const root = repoAt()
  const body = swapped(TEN, "b", "B")
  drafted(root, PAGE, [{ path: ONE, was: TEN, body }])
  landed(root, { [ONE]: body })
  const said = drafted(root, PAGE, [])
  expect(said).toEqual({ patch: null })
  expect(patchIn(root, PAGE)).toBeNull()
})

test("a draft stating no body is drafted as a deletion", () => {
  const root = repoAt()
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: null }])
  expect(draftedBody(root, ONE)).toBeNull()
  expect(patchIn(root, PAGE) ?? "").toContain("deleted file mode")
})

test("a path that is no page keeps no patch", () => {
  const root = repoAt()
  const said = drafted(root, "akasha/not-a-page.txt", [{ path: ONE, was: TEN, body: "x\n" }])
  expect("why" in said).toBe(true)
})

test("drafting leaves the worktree alone", () => {
  const root = repoAt()
  drafted(root, PAGE, [{ path: ONE, was: TEN, body: swapped(TEN, "b", "B") }])
  expect(gitSaid(root, ["status", "--porcelain", "--", ONE])).toBe("")
})
