import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { rebuiltFrom } from "@akasha/indexes/indexing"
import { butTheStamp } from "@akasha/indexes/indexing/testing"
import {
  everythingFiled,
  fileWhereTheIndexIs,
  identitiesListedIn,
  idFiledIn,
  listedFiledIn,
} from "@akasha/indexes/testing"
import { everyFileUnder } from "@akasha/testing-system/walking"
import { readingEnded } from "../../commands/modules/commit-reading/commit-reading.module.code.ts"
import { NO_GATE } from "../gate-building/gate-building.module.code.ts"
import { baseOf, changeOf, landing } from "./landing.module.code.ts"
import {
  A,
  ADMITS,
  BROKEN,
  besides,
  bytes,
  CARRIED,
  committedAgain,
  drafting,
  edged,
  filedFor,
  filesIn,
  git,
  gitOver,
  gitWatching,
  ID,
  IGNORED_OUT,
  identityAmong,
  keptText,
  LINE,
  landedAtHead,
  landedMoving,
  NUL,
  pageLanded,
  pageRepo,
  pagesRepo,
  pathsSeen,
  putBackThrows,
  REFUSES,
  repoWith,
  scratch,
  splitKept,
  splitLanded,
  splitThrew,
  THROWN,
} from "./landing.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a body the change does not touch is read from the base commit, not the working tree", () => {
  const root = repoWith({ "one.txt": "committed", "two.txt": "committed" })
  writeFileSync(join(root, "two.txt"), "dirty in the worktree")
  const change = changeOf(root, {
    base: baseOf(root),
    edits: [{ path: "one.txt", body: bytes("proposed") }],
  })
  const said = change.after("two.txt")
  expect(said === null ? "" : new TextDecoder().decode(said)).toBe("committed")
  readingEnded()
})

test("a body the change touches is read as the change would leave it", () => {
  const root = repoWith({ "one.txt": "committed" })
  const change = changeOf(root, {
    base: baseOf(root),
    edits: [{ path: "one.txt", body: bytes("proposed") }],
  })
  const said = change.after("one.txt")
  expect(said === null ? "" : new TextDecoder().decode(said)).toBe("proposed")
  readingEnded()
})

test("a body the change takes away reads as gone rather than as what was there", () => {
  const root = repoWith({ "one.txt": "committed" })
  const change = changeOf(root, {
    base: baseOf(root),
    edits: [{ path: "one.txt", body: null }],
  })
  expect(change.after("one.txt")).toBeNull()
  readingEnded()
})

test("a body carrying a raw NUL and a body that is not UTF-8 come back byte for byte", () => {
  const root = repoWith({ "nul.bin": NUL, "broken.bin": BROKEN })
  const change = changeOf(root, {
    base: baseOf(root),
    edits: [{ path: "one.txt", body: bytes("proposed") }],
  })
  expect(change.after("nul.bin")).toEqual(NUL)
  expect(change.after("broken.bin")).toEqual(BROKEN)
  readingEnded()
})

test("no git outlives a landing, nor one a check throws through", async () => {
  const root = repoWith({ "one.txt": "committed", "two.txt": "committed" })
  const { reading, throwing } = gitWatching(root)
  await landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", reading)
  expect(gitOver(root)).toEqual([])
  await expect(landing(root, [{ path: "two.txt", body: null }], "held", throwing)).rejects.toThrow(
    THROWN
  )
  expect(gitOver(root)).toEqual([])
  expect(existsSync(join(root, "two.txt"))).toBe(true)
})

test("a landing files the index entries its page implies, with no rebuild run by hand", async () => {
  const root = repoWith({ "seed.txt": "held" })
  await landing(root, CARRIED, "held", ADMITS)
  const said = await landing(root, [{ path: "akasha/a.domain.ts", body: bytes(A) }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  const filed = everythingFiled(root)
  for (const at of filedFor(ID)) expect(filed).toContain(`/${at} ${LINE}\n`)
})

test("a landing that takes a page away takes its index entries with it", async () => {
  const root = await pageLanded(await edged({ "seed.txt": "held" }))
  expect(idFiledIn(root, ID)).toBe(true)
  await landing(root, [{ path: "akasha/a.domain.ts", body: null }], "held", ADMITS)
  expect(idFiledIn(root, ID)).toBe(false)
  expect(listedFiledIn(root, "domain", "a")).toBe(false)
  expect(identitiesListedIn(root, "domain")).toBe(false)
})

test("a landing no check judged keeps the index all the same", async () => {
  const root = repoWith({ "seed.txt": "held" })
  await landing(root, CARRIED, "held", ADMITS)
  await landing(root, [{ path: "akasha/a.domain.ts", body: bytes(A) }], "held", NO_GATE)
  expect(idFiledIn(root, ID)).toBe(true)
})

test("a refused change leaves the index as it found it, as it leaves the worktree", async () => {
  const root = await pageLanded(repoWith({ "seed.txt": "held" }))
  const was = everythingFiled(root)
  const said = await landing(
    root,
    [{ path: "akasha/b.domain.ts", body: bytes(A) }],
    "held",
    REFUSES
  )
  expect("refusals" in said).toBe(true)
  expect(everythingFiled(root)).toEqual(was)
})

test("the index two landings leave is the index a rebuild from those pages builds, but for the stamp only a rebuild writes", async () => {
  const root = await pageLanded(repoWith({ "seed.txt": "held" }))
  const rebuilt = scratch.rootFor("akasha-rebuilt-")
  rebuiltFrom(join(root, "akasha"), rebuilt, root)
  expect(identityAmong(everythingFiled(root)).length).toBeGreaterThan(0)
  expect(identityAmong(everyFileUnder(rebuilt)).length).toBeGreaterThan(0)
  expect(butTheStamp(everyFileUnder(rebuilt))).toEqual(butTheStamp(everythingFiled(root)))
})

test("a refused change leaves nothing behind", async () => {
  const root = repoWith({ "one.txt": "committed" })
  const was = baseOf(root)
  const said = await landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", REFUSES)
  expect("refusals" in said).toBe(true)
  expect(existsSync(join(root, "new.txt"))).toBe(false)
  expect(baseOf(root)).toBe(was)
})

test("a refusal says nothing was written and how many changes were asked for", async () => {
  const root = repoWith({ "one.txt": "committed" })
  const said = await landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", REFUSES)
  const refusals = "refusals" in said ? said.refusals : []
  expect(refusals[refusals.length - 1]).toContain("nothing was written")
  expect(refusals[refusals.length - 1]).toContain("land together or not at all")
})

test("a change that passes is written and committed onto the base it was judged against", async () => {
  const root = repoWith({ "one.txt": "committed" })
  const said = await landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  if ("refusals" in said) return
  expect(readFileSync(join(root, "new.txt"), "utf8")).toBe("proposed")
  expect(said.wrote).toEqual(["new.txt"])
  expect(said.commit).not.toBeNull()
  expect(git(root, ["rev-parse", "HEAD^"]).trim()).toBe(said.base)
})

test("a change that takes a file away removes it and commits the removal", async () => {
  const root = await edged({ "one.txt": "committed", "two.txt": "committed" })
  const said = await landing(root, [{ path: "two.txt", body: null }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  if ("refusals" in said) return
  expect(existsSync(join(root, "two.txt"))).toBe(false)
  expect(said.took).toEqual(["two.txt"])
  expect(filesIn(root)).toEqual(besides("one.txt"))
})

test("asking for nothing is refused rather than committed empty", async () => {
  const root = repoWith({ "one.txt": "committed" })
  const was = baseOf(root)
  const said = await landing(root, [], "held", ADMITS)
  expect("refusals" in said).toBe(true)
  expect(baseOf(root)).toBe(was)
})

test("a change asking for what is already there commits nothing", async () => {
  const root = repoWith({ "one.txt": "committed" })
  const was = baseOf(root)
  const said = await landing(root, [{ path: "one.txt", body: bytes("committed") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  if ("refusals" in said) return
  expect(said.commit).toBeNull()
  expect(baseOf(root)).toBe(was)
})

test("the checks are shown every path the change touches", async () => {
  expect(await pathsSeen(repoWith({ "one.txt": "committed" }))).toEqual(["a.txt", "b.txt"])
})

test("a change read against a commit that moved a path it carries is refused unwritten", async () => {
  const root = pagesRepo()
  const read = baseOf(root)
  committedAgain(root, "akasha/a.domain.ts", `${A}\n`)
  const said = await landedMoving(root, read)
  expect("refusals" in said).toBe(true)
  expect("refusals" in said ? said.refusals.join("\n") : "").toContain("moved in between")
  expect(readFileSync(join(root, "akasha/a.domain.ts"), "utf8")).toBe(`${A}\n`)
})

test("a change read against a commit that moved nothing it carries is landed", async () => {
  const root = pagesRepo()
  const read = baseOf(root)
  committedAgain(root, "later.txt", "later")
  const said = await landedMoving(root, read)
  expect("refusals" in said).toBe(false)
  expect(readFileSync(join(root, "akasha/a.domain.ts"), "utf8")).toBe("moved")
})

test("a change read against the commit at HEAD is landed", async () => {
  const root = pagesRepo()
  await landing(root, CARRIED, "held", ADMITS)
  const said = await landedAtHead(root)
  expect("refusals" in said).toBe(false)
  expect(readFileSync(join(root, "akasha/b.txt"), "utf8")).toBe("new")
})

test("a change read against an abbreviated commit is read against the commit it names", async () => {
  const root = pagesRepo()
  const read = git(root, ["rev-parse", "--short=10", "HEAD"]).trim()
  committedAgain(root, "later.txt", "later")
  const change = [{ path: "akasha/a.domain.ts", body: bytes("moved") }]
  const said = await landing(root, change, "m", ADMITS, null, read)
  expect("refusals" in said).toBe(false)
  expect(readFileSync(join(root, "akasha/a.domain.ts"), "utf8")).toBe("moved")
})

test("a change read against a name that names no commit is refused unwritten", async () => {
  const root = repoWith({ "one.txt": "committed" })
  const was = baseOf(root)
  const change = [{ path: "new.txt", body: bytes("proposed") }]
  const said = await landing(root, change, "m", ADMITS, null, "yesterday")
  expect("refusals" in said ? said.refusals.join("\n") : "").toContain("names no commit")
  expect(existsSync(join(root, "new.txt"))).toBe(false)
  expect(baseOf(root)).toBe(was)
})

test("what was written is put back when the landing throws after writing", async () => {
  const root = pagesRepo()
  fileWhereTheIndexIs(root, "no directory stands here")
  await expect(putBackThrows(root)).rejects.toThrow()
  expect(readFileSync(join(root, "akasha/a.domain.ts"), "utf8")).toBe(A)
  expect(existsSync(join(root, "akasha/b.domain.ts"))).toBe(false)
})

test("a path landing outside the repository is refused by name and written nowhere", async () => {
  const root = repoWith({ "one.txt": "committed" })
  const was = baseOf(root)
  const change = [{ path: "../escaped.txt", body: bytes("proposed") }]
  const said = await landing(root, change, "held", ADMITS)
  const why = "refusals" in said ? said.refusals.join("\n") : ""
  expect(why).toContain("../escaped.txt")
  expect(why).toContain("outside the repository")
  expect(existsSync(join(root, "..", "escaped.txt"))).toBe(false)
  expect(baseOf(root)).toBe(was)
})

test("a move landing outside the repository is refused and the path it came from remains", async () => {
  const root = repoWith({ "one.txt": "committed" })
  const moves = [{ from: "one.txt", to: "../escaped.txt" }]
  const said = await landing(root, [], "held", ADMITS, null, null, [], moves)
  expect("refusals" in said ? said.refusals.join("\n") : "").toContain("outside the repository")
  expect(existsSync(join(root, "..", "escaped.txt"))).toBe(false)
  expect(readFileSync(join(root, "one.txt"), "utf8")).toBe("committed")
})

test("a name beginning with two dots and a move inside the repository both land", async () => {
  const root = await edged({ "deep/two.txt": "committed" })
  const change = [{ path: "..hidden.txt", body: bytes("kept") }]
  const moves = [{ from: "deep/two.txt", to: "deep/moved.txt" }]
  const said = await landing(root, change, "held", ADMITS, null, null, [], moves)
  expect("refusals" in said ? said.refusals.join("\n") : "").toBe("")
  expect(readFileSync(join(root, "..hidden.txt"), "utf8")).toBe("kept")
  expect(readFileSync(join(root, "deep/moved.txt"), "utf8")).toBe("committed")
})

test("a path the repository ignores is written onto the tree and left out of the commit", async () => {
  const said = await splitLanded()
  expect(said.held).toBe("unsaid")
  expect(said.wrote).toEqual(["new.txt"])
  expect(said.files).toEqual(IGNORED_OUT)
})

test("a commit that throws leaves the body an ignored path already held", async () => {
  expect(await splitKept()).toBe("was")
})

test("a commit that throws leaves no trace of the path the repository ignores", async () => {
  const said = await splitThrew()
  expect(said.why).toContain("Unable to add")
  expect(said.left).toEqual([])
})

test("a change drafted is kept as an edit and reaches no file and no commit of its own", async () => {
  const root = pageRepo()
  const said = await drafting(root, [{ path: "new.txt", body: bytes("proposed") }])
  expect("refusals" in said ? [] : said.drafted).toEqual(["new.txt"])
  expect(keptText(root)).toContain("proposed")
  expect(existsSync(join(root, "new.txt"))).toBe(false)
  expect(git(root, ["log", "--name-only", "--format="])).not.toContain("new.txt")
})

test("a draft runs no check, so a gate that would refuse drafts all the same", async () => {
  const root = pageRepo()
  await drafting(root, [{ path: "one.txt", body: bytes("first") }])
  await drafting(root, [{ path: "two.txt", body: bytes("second") }], REFUSES)
  expect(keptText(root)).toContain("first")
  expect(keptText(root)).toContain("second")
})

test("a body that spells no text is drafted by no edit", async () => {
  const root = pageRepo()
  const said = await drafting(root, [{ path: "blob.bin", body: BROKEN }])
  expect("refusals" in said ? said.refusals.join("\n") : "").toContain("spells no text")
  expect(keptText(root)).toBe("")
})
