import { afterAll, expect, test } from "bun:test"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { patchIn } from "@akasha/agents/patch-keeping"
import { textIn } from "@akasha/code-system/body-text"
import { said as gitSaid } from "@akasha/git/git-running"
import { bytesOf as bytes } from "@akasha/testing-system/bodying"
import { CLASH_MARK } from "../body-merging/body-merging.module.code.ts"
import { blobsIn, bodyOf } from "../patching/patching.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { writing } from "../scratching/scratching.module.test-fixtures.ts"
import { type Draft, drafted, resolved, tookIn, wouldHold } from "./drafting.module.code.ts"

const PAGE = "akasha/seat-system/seat/seats/tester.seat.ts"
const THEIRS = "akasha/seat-system/subagents/pages/tester-a1.subagent.ts"
const ONE = "akasha/one.page.ts"
const TWO = "akasha/two.page.ts"
const BIN = "akasha/three.page.bin"
const TEN = "a\nb\nc\nd\ne\nf\ng\nh\ni\nj\n"
const MOVED = "akasha/moved/one.page.ts"
const FAR = "akasha/far/one.page.ts"
const NOT_TEXT = new Uint8Array([0xff, 0xfe, 0x01, 0x02])
const ALSO_NOT_TEXT = new Uint8Array([0x80, 0x81, 0x03])
const THEN_NOT_TEXT = new Uint8Array([0xc0, 0xaf, 0x07])
const WHO = ["-c", "user.email=t@t", "-c", "user.name=t", "-c", "commit.gpgsign=false"]

const scratch = scratchWorld()

afterAll(() => {
  scratch.sweep()
})

function bytesOr(held: string | null): Uint8Array | null {
  return held === null ? null : bytes(held)
}

function textOr(held: Uint8Array | null | undefined): string | null {
  return held === null || held === undefined ? null : textIn(held)
}

function draft(path: string, was: string | null, body: string | null): Draft {
  return { path, was: bytesOr(was), body: bytesOr(body) }
}

function landed(root: string, bodies: Readonly<Record<string, string>>): undefined {
  const paths = Object.keys(bodies)
  for (const path of paths) writing(root, path, bodies[path] ?? "")
  gitSaid(root, ["add", "--", ...paths])
  gitSaid(root, [...WHO, "commit", "-q", "-m", "landed", "--", ...paths])
}

function landedBytes(root: string, path: string, body: Uint8Array): undefined {
  const at = join(root, path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
  gitSaid(root, ["add", "--", path])
  gitSaid(root, [...WHO, "commit", "-q", "-m", "landed", "--", path])
}

function renamed(root: string, from: string, to: string, body: string): undefined {
  rmSync(join(root, from))
  writing(root, to, body)
  gitSaid(root, ["add", "-A", "--", from, to])
  gitSaid(root, [...WHO, "commit", "-q", "-m", "moved", "--", from, to])
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

function draftedBytes(root: string, path: string): Uint8Array | null {
  const patch = patchIn(root, PAGE)
  if (patch === null) return null
  const blobs = blobsIn(patch).get(path)
  return blobs === undefined ? null : bodyOf(root, blobs.result)
}

function draftedBody(root: string, path: string): string | null {
  return textOr(draftedBytes(root, path))
}

function clashing(root: string): undefined {
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))])
  landed(root, { [ONE]: swapped(TEN, "b", "X") })
  const said = drafted(root, PAGE, [draft(TWO, null, "fresh\n")])
  if ("why" in said) throw new Error(said.why)
  expect(said.clashed).toEqual([ONE])
}

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
  const said = resolved(root, PAGE, ONE, bytes(TEN))
  expect(said).toEqual({ patch: null, clashed: [] })
  expect(patchIn(root, PAGE)).toBeNull()
  expect(refs(root)).toBe("")
})

test("a change reaching HEAD by another route leaves the patch", () => {
  const root = repoAt()
  const body = swapped(TEN, "b", "B")
  drafted(root, PAGE, [draft(ONE, TEN, body)])
  landed(root, { [ONE]: body })
  const said = drafted(root, PAGE, [])
  expect(said).toEqual({ patch: null, clashed: [] })
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
