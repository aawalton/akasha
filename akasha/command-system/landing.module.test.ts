import { afterAll, expect, test } from "bun:test"
import { spawn, spawnSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Judging } from "../checks-system/judging.module.code.ts"
import { rebuiltFrom } from "../pages-system/indexes/indexing.module.code.ts"
import {
  baseOf,
  bodyAt,
  gateBuilt,
  landing,
  leavingOf,
  NO_GATE,
  oneLine,
  readingEnded,
} from "./landing.module.code.ts"
import {
  A,
  ADMITS,
  butTheStamp,
  bytes,
  everyFileUnder,
  git,
  gitOver,
  ID,
  indexIn,
  LINE,
  MODULE_AT,
  REFUSES,
  repoWith,
  scratch,
  TYPE,
  until,
} from "./landing.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a body the change does not touch is read from the base commit, not the working tree", () => {
  const root = repoWith({ "one.txt": "committed", "two.txt": "committed" })
  writeFileSync(join(root, "two.txt"), "dirty in the worktree")
  const leaving = leavingOf(root, {
    base: baseOf(root),
    changed: [{ path: "one.txt", body: bytes("proposed") }],
  })
  const said = leaving.at("two.txt")
  expect(said === null ? "" : new TextDecoder().decode(said)).toBe("committed")
  readingEnded()
})

test("a body the change touches is read as the change would leave it", () => {
  const root = repoWith({ "one.txt": "committed" })
  const leaving = leavingOf(root, {
    base: baseOf(root),
    changed: [{ path: "one.txt", body: bytes("proposed") }],
  })
  const said = leaving.at("one.txt")
  expect(said === null ? "" : new TextDecoder().decode(said)).toBe("proposed")
  readingEnded()
})

test("a body the change takes away reads as gone rather than as what stands", () => {
  const root = repoWith({ "one.txt": "committed" })
  const leaving = leavingOf(root, {
    base: baseOf(root),
    changed: [{ path: "one.txt", body: null }],
  })
  expect(leaving.at("one.txt")).toBeNull()
  readingEnded()
})

test("a body carrying a raw NUL and a body that is not UTF-8 come back byte for byte", () => {
  const nul = new Uint8Array([104, 0, 101, 108, 100, 0, 0, 10])
  const broken = new Uint8Array([0xff, 0xfe, 0x41, 0x80, 0x42, 0xc3, 0x28])
  const root = repoWith({ "nul.bin": nul, "broken.bin": broken })
  const leaving = leavingOf(root, {
    base: baseOf(root),
    changed: [{ path: "one.txt", body: bytes("proposed") }],
  })
  expect(leaving.at("nul.bin")).toEqual(nul)
  expect(leaving.at("broken.bin")).toEqual(broken)
  readingEnded()
})

test("a path the base commit does not carry reads as nothing rather than as trouble", () => {
  const root = repoWith({ "one.txt": "committed" })
  const base = baseOf(root)
  expect(bodyAt(root, base, "nowhere.txt")).toBeNull()
  expect(bodyAt(root, base, "one.txt/deeper.txt")).toBeNull()
  readingEnded()
})

test("a base that names no commit is said out loud rather than read as nothing", () => {
  const root = repoWith({ "one.txt": "committed" })
  expect(() => bodyAt(root, "0".repeat(40), "one.txt")).toThrow("names no commit")
  readingEnded()
})

test("reading a body the base commit does not carry says nothing on stderr", () => {
  const root = repoWith({ "one.txt": "committed" })
  const said = spawnSync(
    "bun",
    [
      "-e",
      `import { baseOf, bodyAt, readingEnded } from ${JSON.stringify(MODULE_AT)}
const root = ${JSON.stringify(root)}
const base = baseOf(root)
for (const one of ["a.txt", "b.txt", "c.txt"]) bodyAt(root, base, one)
readingEnded()`,
    ],
    { encoding: "utf8" }
  )
  expect(said.stderr).toBe("")
  expect(said.status).toBe(0)
})

test("no git outlives a landing, nor one a check throws through", () => {
  const root = repoWith({ "one.txt": "committed", "two.txt": "committed" })
  const reading: Judging = {
    named: ["reading"],
    over: (leaving) => {
      expect(leaving.at("one.txt")).not.toBeNull()
      expect(gitOver(root).length).toBe(1)
      return []
    },
  }
  const throwing: Judging = {
    named: ["throwing"],
    over: (leaving) => {
      expect(leaving.at("one.txt")).not.toBeNull()
      expect(gitOver(root).length).toBe(1)
      throw new Error("thrown for the test")
    },
  }
  landing(root, [{ path: "new.txt", body: bytes("proposed") }], "held", reading)
  expect(gitOver(root)).toEqual([])
  expect(() => landing(root, [{ path: "two.txt", body: null }], "held", throwing)).toThrow(
    "thrown for the test"
  )
  expect(gitOver(root)).toEqual([])
  expect(existsSync(join(root, "two.txt"))).toBe(true)
})

test("a parent killed outright leaves no git behind it", async () => {
  const root = repoWith({ "one.txt": "committed" })
  const kid = spawn(
    "bun",
    [
      "-e",
      `import { baseOf, bodyAt } from ${JSON.stringify(MODULE_AT)}
const root = ${JSON.stringify(root)}
bodyAt(root, baseOf(root), "one.txt")
setInterval(() => {}, 1000)`,
    ],
    { stdio: "ignore" }
  )
  expect(await until(() => gitOver(root).length === 1)).toBe(true)
  kid.kill("SIGKILL")
  expect(await until(() => gitOver(root).length === 0)).toBe(true)
})

test("a landing files the index entries its page implies, with no rebuild run by hand", () => {
  const root = repoWith({ "seed.txt": "held" })
  const said = landing(root, [{ path: "akasha/a.domain.ts", body: bytes(A) }], "held", ADMITS)
  expect("refusals" in said).toBe(false)
  const held = indexIn(root)
  const named = [
    `identity/page/id/${ID}.jsonl`,
    "identity/domain/slug/a.jsonl",
    "path/akasha/a.domain.ts.jsonl",
  ]
  for (const at of named) expect(readFileSync(join(held, at), "utf8").trim()).toBe(LINE)
})

test("a landing that takes a page away takes its index entries with it", () => {
  const root = repoWith({ "seed.txt": "held" })
  landing(root, [{ path: "akasha/a.domain.ts", body: bytes(A) }], "held", ADMITS)
  const held = indexIn(root)
  expect(existsSync(join(held, `identity/page/id/${ID}.jsonl`))).toBe(true)
  landing(root, [{ path: "akasha/a.domain.ts", body: null }], "held", ADMITS)
  expect(existsSync(join(held, `identity/page/id/${ID}.jsonl`))).toBe(false)
  expect(existsSync(join(held, "identity/domain"))).toBe(false)
})

test("a landing no check judged keeps the index all the same", () => {
  const root = repoWith({ "seed.txt": "held" })
  landing(root, [{ path: "akasha/a.domain.ts", body: bytes(A) }], "held", NO_GATE)
  expect(existsSync(join(indexIn(root), `identity/page/id/${ID}.jsonl`))).toBe(true)
})

test("a refused change leaves the index as it found it, as it leaves the worktree", () => {
  const root = repoWith({ "seed.txt": "held" })
  landing(root, [{ path: "akasha/a.domain.ts", body: bytes(A) }], "held", ADMITS)
  const was = everyFileUnder(indexIn(root))
  const said = landing(root, [{ path: "akasha/b.domain.ts", body: bytes(A) }], "held", REFUSES)
  expect("refusals" in said).toBe(true)
  expect(everyFileUnder(indexIn(root))).toEqual(was)
})

test("the index two landings leave is the index a rebuild from those pages builds, but for the stamp only a rebuild writes", () => {
  const root = repoWith({ "seed.txt": "held" })
  landing(root, [{ path: "akasha/domain.page-type.ts", body: bytes(TYPE) }], "held", ADMITS)
  landing(root, [{ path: "akasha/a.domain.ts", body: bytes(A) }], "held", ADMITS)
  const rebuilt = scratch.rootFor("akasha-rebuilt-")
  rebuiltFrom(join(root, "akasha"), rebuilt, root)
  expect(butTheStamp(everyFileUnder(rebuilt))).toEqual(butTheStamp(everyFileUnder(indexIn(root))))
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
  const watching: Judging = {
    named: ["watching"],
    over: (leaving) => {
      seen.push(...leaving.changed)
      return []
    },
  }
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

test("the gate reaches the checks late, and a root carrying no check index will not build one", () => {
  const root = repoWith({ "one.txt": "committed" })
  const said = gateBuilt(root)
  expect("broken" in said).toBe(true)
  const why = "broken" in said ? said.broken : ""
  expect(why).toContain("identity/check/slug")
  expect(why).not.toContain("a gate is built from")
})

test("a gate that could not be built judges nothing rather than passing everything", () => {
  expect(NO_GATE.named).toEqual([])
  expect(
    NO_GATE.over({ root: "/nowhere", changed: ["one.txt"], at: () => null, was: () => null })
  ).toEqual([])
})

test("why a gate could not be built is carried as one line a commit trailer can hold", () => {
  expect(oneLine("  Expected identifier\n  but found end of file  ")).toBe(
    "Expected identifier but found end of file"
  )
  expect(oneLine("held ".repeat(200))).toEndWith("...")
  expect(oneLine("held ".repeat(200)).length).toBe(240)
})

test("a change read against a commit that moved a path it carries is refused unwritten", () => {
  const root = repoWith({ "akasha/a.domain.ts": A, "akasha/domain.page-type.ts": TYPE })
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
  const root = repoWith({ "akasha/a.domain.ts": A, "akasha/domain.page-type.ts": TYPE })
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
  const root = repoWith({ "akasha/a.domain.ts": A, "akasha/domain.page-type.ts": TYPE })
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

test("what was written is put back when the landing throws after writing", () => {
  const root = repoWith({ "akasha/a.domain.ts": A, "akasha/domain.page-type.ts": TYPE })
  mkdirSync(join(root, ".git/data"), { recursive: true })
  writeFileSync(indexIn(root), "no directory stands here")
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
