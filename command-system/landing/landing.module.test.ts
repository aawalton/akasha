import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { patchIn } from "@akasha/agents/patch-keeping"
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
import { readingEnded } from "../commit-reading/commit-reading.module.code.ts"
import { NO_GATE } from "../gate-building/gate-building.module.code.ts"
import { baseOf, changeOf, landing } from "./landing.module.code.ts"
import {
  A,
  ADMITS,
  BROKEN,
  bytes,
  CARRIED,
  DRAFT,
  filedFor,
  git,
  gitOver,
  ID,
  identityAmong,
  judgingThat,
  LINE,
  NUL,
  PAGE,
  pageRepo,
  pagesRepo,
  REFUSES,
  repoWith,
  scratch,
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

test("a body the change takes away reads as gone rather than as what stands", () => {
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

test("no git outlives a landing, nor one a check throws through", () => {
  const root = repoWith({ "one.txt": "committed", "two.txt": "committed" })
  const reading = judgingThat("reading", (change) => {
    expect(change.after("one.txt")).not.toBeNull()
    expect(gitOver(root).length).toBe(1)
    return []
  })
  const throwing = judgingThat("throwing", (change) => {
    expect(change.after("one.txt")).not.toBeNull()
    expect(gitOver(root).length).toBe(1)
    throw new Error("thrown for the test")
  })
  landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", reading)
  expect(gitOver(root)).toEqual([])
  expect(() => landing(root, [{ path: "two.txt", body: null }], "held", throwing)).toThrow(
    "thrown for the test"
  )
  expect(gitOver(root)).toEqual([])
  expect(existsSync(join(root, "two.txt"))).toBe(true)
})

test("a landing files the index entries its page implies, with no rebuild run by hand", () => {
  const root = repoWith({ "seed.txt": "held" })
  landing(root, CARRIED, "held", ADMITS)
  const said = landing(root, [{ path: "akasha/a.domain.ts", body: bytes(A) }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  const filed = everythingFiled(root)
  for (const at of filedFor(ID)) expect(filed).toContain(`/${at} ${LINE}\n`)
})

test("a landing that takes a page away takes its index entries with it", () => {
  const root = repoWith({ "seed.txt": "held" })
  landing(root, CARRIED, "held", ADMITS)
  landing(root, [{ path: "akasha/a.domain.ts", body: bytes(A) }], "held", ADMITS)
  expect(idFiledIn(root, ID)).toBe(true)
  landing(root, [{ path: "akasha/a.domain.ts", body: null }], "held", ADMITS)
  expect(idFiledIn(root, ID)).toBe(false)
  expect(listedFiledIn(root, "domain", "a")).toBe(false)
  expect(identitiesListedIn(root, "domain")).toBe(false)
})

test("a landing no check judged keeps the index all the same", () => {
  const root = repoWith({ "seed.txt": "held" })
  landing(root, CARRIED, "held", ADMITS)
  landing(root, [{ path: "akasha/a.domain.ts", body: bytes(A) }], "held", NO_GATE)
  expect(idFiledIn(root, ID)).toBe(true)
})

test("a refused change leaves the index as it found it, as it leaves the worktree", () => {
  const root = repoWith({ "seed.txt": "held" })
  landing(root, CARRIED, "held", ADMITS)
  landing(root, [{ path: "akasha/a.domain.ts", body: bytes(A) }], "held", ADMITS)
  const was = everythingFiled(root)
  const said = landing(root, [{ path: "akasha/b.domain.ts", body: bytes(A) }], "held", REFUSES)
  expect("refusals" in said).toBe(true)
  expect(everythingFiled(root)).toEqual(was)
})

test("the index two landings leave is the index a rebuild from those pages builds, but for the stamp only a rebuild writes", () => {
  const root = repoWith({ "seed.txt": "held" })
  landing(root, CARRIED, "held", ADMITS)
  landing(root, [{ path: "akasha/a.domain.ts", body: bytes(A) }], "held", ADMITS)
  const rebuilt = scratch.rootFor("akasha-rebuilt-")
  rebuiltFrom(join(root, "akasha"), rebuilt, root)
  expect(identityAmong(everythingFiled(root)).length).toBeGreaterThan(0)
  expect(identityAmong(everyFileUnder(rebuilt)).length).toBeGreaterThan(0)
  expect(butTheStamp(everyFileUnder(rebuilt))).toEqual(butTheStamp(everythingFiled(root)))
})

test("a refused change leaves nothing behind", () => {
  const root = repoWith({ "one.txt": "committed" })
  const was = baseOf(root)
  const said = landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", REFUSES)
  expect("refusals" in said).toBe(true)
  expect(existsSync(join(root, "new.txt"))).toBe(false)
  expect(baseOf(root)).toBe(was)
})

test("a refusal says nothing was written and how many changes were asked for", () => {
  const root = repoWith({ "one.txt": "committed" })
  const said = landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", REFUSES)
  const refusals = "refusals" in said ? said.refusals : []
  expect(refusals[refusals.length - 1]).toContain("nothing was written")
  expect(refusals[refusals.length - 1]).toContain("land together or not at all")
})

test("a change that passes is written and committed onto the base it was judged against", () => {
  const root = repoWith({ "one.txt": "committed" })
  const said = landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  if ("refusals" in said) return
  expect(readFileSync(join(root, "new.txt"), "utf8")).toBe("proposed")
  expect(said.wrote).toEqual(["new.txt"])
  expect(said.commit).not.toBeNull()
  expect(git(root, ["rev-parse", "HEAD^"]).trim()).toBe(said.base)
})

test("a change that takes a file away removes it and commits the removal", () => {
  const root = repoWith({ "one.txt": "committed", "two.txt": "committed" })
  const said = landing(root, [{ path: "two.txt", body: null }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  if ("refusals" in said) return
  expect(existsSync(join(root, "two.txt"))).toBe(false)
  expect(said.took).toEqual(["two.txt"])
  expect(git(root, ["ls-files"]).trim()).toBe("one.txt")
})

test("asking for nothing is refused rather than committed empty", () => {
  const root = repoWith({ "one.txt": "committed" })
  const was = baseOf(root)
  const said = landing(root, [], "held", ADMITS)
  expect("refusals" in said).toBe(true)
  expect(baseOf(root)).toBe(was)
})

test("a change asking for what already stands commits nothing", () => {
  const root = repoWith({ "one.txt": "committed" })
  const was = baseOf(root)
  const said = landing(root, [{ path: "one.txt", body: bytes("committed") }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  if ("refusals" in said) return
  expect(said.commit).toBeNull()
  expect(baseOf(root)).toBe(was)
})

test("the checks are shown every path the change touches", () => {
  const root = repoWith({ "one.txt": "committed" })
  const seen: string[] = []
  const watching = judgingThat("watching", (change) => {
    seen.push(...change.changed)
    return []
  })
  landing(
    root,
    [
      { path: "b.txt", body: bytes("one") },
      { path: "a.txt", body: bytes("two") },
    ],
    "held",
    watching
  )
  expect(seen).toEqual(["a.txt", "b.txt"])
})

test("a change read against a commit that moved a path it carries is refused unwritten", () => {
  const root = pagesRepo()
  const read = baseOf(root)
  writeFileSync(join(root, "akasha/a.domain.ts"), `${A}\n`)
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "second"])
  const said = landing(
    root,
    [{ path: "akasha/a.domain.ts", body: bytes("moved") }],
    "m",
    ADMITS,
    null,
    read
  )
  expect("refusals" in said).toBe(true)
  expect("refusals" in said ? said.refusals.join("\n") : "").toContain("moved in between")
  expect(readFileSync(join(root, "akasha/a.domain.ts"), "utf8")).toBe(`${A}\n`)
})

test("a change read against a commit that moved nothing it carries is landed", () => {
  const root = pagesRepo()
  const read = baseOf(root)
  writeFileSync(join(root, "later.txt"), "later")
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "second"])
  const said = landing(
    root,
    [{ path: "akasha/a.domain.ts", body: bytes("moved") }],
    "m",
    ADMITS,
    null,
    read
  )
  expect("refusals" in said).toBe(false)
  expect(readFileSync(join(root, "akasha/a.domain.ts"), "utf8")).toBe("moved")
})

test("a change read against the commit that stands is landed", () => {
  const root = pagesRepo()
  landing(root, CARRIED, "held", ADMITS)
  const said = landing(
    root,
    [
      { path: "akasha/a.domain.ts", body: bytes(A) },
      { path: "akasha/b.txt", body: bytes("new") },
    ],
    "m",
    ADMITS,
    null,
    baseOf(root)
  )
  expect("refusals" in said).toBe(false)
  expect(readFileSync(join(root, "akasha/b.txt"), "utf8")).toBe("new")
})

test("a change read against an abbreviated commit is read against the commit it names", () => {
  const root = pagesRepo()
  const read = git(root, ["rev-parse", "--short=10", "HEAD"]).trim()
  writeFileSync(join(root, "later.txt"), "later")
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "second"])
  const change = [{ path: "akasha/a.domain.ts", body: bytes("moved") }]
  const said = landing(root, change, "m", ADMITS, null, read)
  expect("refusals" in said).toBe(false)
  expect(readFileSync(join(root, "akasha/a.domain.ts"), "utf8")).toBe("moved")
})

test("a change read against a name standing for no commit is refused unwritten", () => {
  const root = repoWith({ "one.txt": "committed" })
  const was = baseOf(root)
  const change = [{ path: "new.txt", body: bytes("proposed") }]
  const said = landing(root, change, "m", ADMITS, null, "yesterday")
  expect("refusals" in said ? said.refusals.join("\n") : "").toContain("names no commit")
  expect(existsSync(join(root, "new.txt"))).toBe(false)
  expect(baseOf(root)).toBe(was)
})

test("what was written is put back when the landing throws after writing", () => {
  const root = pagesRepo()
  fileWhereTheIndexIs(root, "no directory stands here")
  const b = A.replace('slug: "a"', 'slug: "b"').replace("const a =", "const b =")
  expect(() =>
    landing(
      root,
      [
        { path: "akasha/a.domain.ts", body: bytes("written over") },
        { path: "akasha/b.domain.ts", body: bytes(b) },
      ],
      "m",
      ADMITS
    )
  ).toThrow()
  expect(readFileSync(join(root, "akasha/a.domain.ts"), "utf8")).toBe(A)
  expect(existsSync(join(root, "akasha/b.domain.ts"))).toBe(false)
})

test("a path a change carries moves on disk and goes into no commit", () => {
  const root = repoWith({ "one.txt": "committed" })
  writeFileSync(join(root, "held.uncommitted.ts"), "unsaid")
  const carries = [{ from: "held.uncommitted.ts", to: "deep/held.uncommitted.ts" }]
  const change = [{ path: "new.txt", body: bytes("proposed") }]
  const said = landing(root, change, "held", ADMITS, null, null, [], carries)
  expect("refusals" in said).toBe(false)
  expect(readFileSync(join(root, "deep/held.uncommitted.ts"), "utf8")).toBe("unsaid")
  expect(existsSync(join(root, "held.uncommitted.ts"))).toBe(false)
  expect(git(root, ["ls-files"]).trim().split("\n").sort()).toEqual(["new.txt", "one.txt"])
})

test("a carry that will not go puts back the ones that went and commits nothing", () => {
  const root = repoWith({ "one.txt": "committed" })
  const was = baseOf(root)
  writeFileSync(join(root, "one.uncommitted.ts"), "one")
  writeFileSync(join(root, "two.uncommitted.ts"), "two")
  mkdirSync(join(root, "deep/two.uncommitted.ts"), { recursive: true })
  writeFileSync(join(root, "deep/two.uncommitted.ts/in-the-way.txt"), "standing here")
  const carries = [
    { from: "one.uncommitted.ts", to: "deep/one.uncommitted.ts" },
    { from: "two.uncommitted.ts", to: "deep/two.uncommitted.ts" },
  ]
  const change = [{ path: "new.txt", body: bytes("proposed") }]
  expect(() => landing(root, change, "held", ADMITS, null, null, [], carries)).toThrow()
  expect(readFileSync(join(root, "one.uncommitted.ts"), "utf8")).toBe("one")
  expect(readFileSync(join(root, "two.uncommitted.ts"), "utf8")).toBe("two")
  expect(existsSync(join(root, "deep/one.uncommitted.ts"))).toBe(false)
  expect(existsSync(join(root, "new.txt"))).toBe(false)
  expect(baseOf(root)).toBe(was)
})

test("a change drafted is kept in the patch and reaches no file and no commit", () => {
  const root = pageRepo()
  const was = baseOf(root)
  const change = [{ path: "new.txt", body: bytes("proposed") }]
  const said = landing(root, change, "held", ADMITS, null, null, [], [], DRAFT)
  expect("refusals" in said ? [] : said.drafted).toEqual(["new.txt"])
  expect(patchIn(root, PAGE) ?? "").toContain("+proposed")
  expect(existsSync(join(root, "new.txt"))).toBe(false)
  expect(baseOf(root)).toBe(was)
})

test("a check refusing a draft says so over the whole patch and refuses nothing", () => {
  const root = pageRepo()
  const a = [{ path: "one.txt", body: bytes("first") }]
  landing(root, a, "held", ADMITS, null, null, [], [], DRAFT)
  const b = [{ path: "two.txt", body: bytes("second") }]
  const said = landing(root, b, "held", REFUSES, null, null, [], [], DRAFT)
  const refused = "refusals" in said ? [] : said.refused.map((one) => one.path)
  expect(refused).toEqual(["one.txt", "two.txt"])
  expect(patchIn(root, PAGE) ?? "").toContain("+second")
})
