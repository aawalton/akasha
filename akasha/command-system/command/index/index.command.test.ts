import { afterAll, expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { indexIn } from "../../../pages-system/indexes/index-reading.module.code.ts"
import { stampIn } from "../../../pages-system/indexes/index-stamp.module.code.ts"
import { rebuiltFrom } from "../../../pages-system/indexes/indexing.module.code.ts"
import type { Given } from "../../calling.module.code.ts"
import { calling } from "../../calling.module.code.ts"
import { DATA, INPUT, OK, OPERATIONAL } from "../../cli.module.code.ts"
import { scratchWorld } from "../../scratching.module.code.ts"
import { driftBetween, index, readIn, surface } from "./index.command.code.ts"

const CODE_AT = "akasha/command-system/command/index/index.command.code.ts"

const PAGE_AT = "akasha/command-system/command/index/index.command.ts"

const LOCK_AT = ".git/akasha-landing.lock"

const REAL = join(import.meta.dir, "index.command.code.ts")

const TYPE_ID = "01a04de1-2000-7000-8000-000000000001"

const A_ID = "01a04de1-2000-7000-8000-000000000002"

const B_ID = "01a04de1-2000-7000-8000-000000000003"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function bodyOf(value: Readonly<Record<string, unknown>>): string {
  return `export const held = ${JSON.stringify(value)}\n`
}

const PAGES: Readonly<Record<string, string>> = {
  "akasha/domain.page-type.ts": bodyOf({
    id: TYPE_ID,
    pageTypeSlug: "page-type",
    slug: "domain",
  }),
  "akasha/a.domain.ts": bodyOf({ id: A_ID, pageTypeSlug: "domain", slug: "a" }),
  "akasha/a.module.code.ts": 'import { held } from "./a.domain.ts"\nexport const one = held\n',
  [PAGE_AT]: bodyOf({ id: B_ID, pageTypeSlug: "domain", slug: "index-command" }),
  [CODE_AT]: `export { index } from ${JSON.stringify(REAL)}\n`,
}

function git(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], { encoding: "utf8" })
}

function repoAt(): string {
  const root = scratch.rootFor("akasha-refresh-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(PAGES)) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  return root
}

function everyFileUnder(at: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  if (!existsSync(at)) return found
  const walk = (here: string, said: string): void => {
    for (const one of readdirSync(here, { withFileTypes: true })) {
      const named = `${said}${one.name}`
      if (one.isDirectory()) walk(join(here, one.name), `${named}/`)
      else found.set(named, readFileSync(join(here, one.name), "utf8"))
    }
  }
  walk(at, "")
  return found
}

function wantedFor(root: string): ReadonlyMap<string, string> {
  const held = scratch.rootFor("akasha-wanted-")
  rebuiltFrom(join(root, "akasha"), held, root)
  return everyFileUnder(held)
}

function seeded(root: string): void {
  rebuiltFrom(join(root, "akasha"), indexIn(root), root)
}

function givenAt(root: string): Given {
  return { root, calledAs: "akasha index", from: root, writer: null, agentId: null }
}

function said(answer: { readonly report: readonly string[] }): string {
  return answer.report.join("\n")
}

test("an act nobody named is refused with the acts there are", () => {
  const held = readIn([])
  expect("refused" in held).toBe(true)
  expect("refused" in held ? held.refused[0] : "").toContain("refresh")
})

test("an act this does not carry is refused", () => {
  const held = readIn(["verify"])
  expect("refused" in held ? held.refused[0] : "").toContain("`verify` is no act this carries")
})

test("a flag belonging to a command that writes is refused rather than ignored", () => {
  for (const one of ["--message", "--message-file", "--break-the-glass"]) {
    const held = readIn([one, "held", "refresh"])
    expect("refused" in held ? held.refused[0] : "").toContain(one)
  }
})

test("a flag this does not take is refused", () => {
  const held = readIn(["refresh", "--force"])
  expect("refused" in held ? held.refused[0] : "").toContain("`--force` is no flag this takes")
})

test("a second act is refused rather than chosen between", () => {
  const held = readIn(["refresh", "verify"])
  expect("refused" in held ? held.refused[0] : "").toContain("one call names one act")
})

test("`refresh` is read, and the flags with it", () => {
  expect(readIn(["refresh", "--dry-run"])).toEqual({
    act: "refresh",
    dryRun: true,
    unlanded: false,
  })
  expect(readIn(["refresh", "--unlanded"])).toEqual({
    act: "refresh",
    dryRun: false,
    unlanded: true,
  })
})

test("an index that is not there is built, and it is the index a clean rebuild builds", () => {
  const root = repoAt()
  const wanted = wantedFor(root)
  const answer = index(["refresh"], givenAt(root))
  expect(answer.code).toBe(OK)
  expect(everyFileUnder(indexIn(root))).toEqual(wanted)
  expect(said(answer)).toContain(".git/data/index was replaced whole")
})

test("the rebuild's stamp is read back and named, and it names HEAD", () => {
  const root = repoAt()
  const answer = index(["refresh"], givenAt(root))
  expect(said(answer)).toContain(`stamped with ${git(root, ["rev-parse", "HEAD"]).trim()}`)
  expect(stampIn(indexIn(root))?.settled).toEqual([])
})

test("`index refresh` is reached with no index at all", () => {
  const root = repoAt()
  rmSync(indexIn(root), { recursive: true, force: true })
  const answer = calling(["index", "refresh"], {
    root,
    calledAs: "akasha",
    from: root,
    writer: null,
    agentId: null,
  })
  expect(answer.refusals).toEqual([])
  expect(answer.code).toBe(OK)
  expect(everyFileUnder(indexIn(root))).toEqual(wantedFor(root))
})

test("`index refresh` is reached through an index that will not parse", () => {
  const root = repoAt()
  seeded(root)
  const at = join(indexIn(root), "identity", "command", "slug")
  mkdirSync(at, { recursive: true })
  writeFileSync(join(at, "index.jsonl"), "{ this is not json\n")
  const answer = calling(["index", "refresh"], {
    root,
    calledAs: "akasha",
    from: root,
    writer: null,
    agentId: null,
  })
  expect(answer.refusals).toEqual([])
  expect(answer.code).toBe(OK)
  expect(existsSync(join(at, "index.jsonl"))).toBe(false)
})

test("a damaged index is put back to what a clean rebuild builds", () => {
  const root = repoAt()
  seeded(root)
  const wanted = wantedFor(root)
  const at = indexIn(root)
  rmSync(join(at, "identity", "domain", "slug", "a.jsonl"))
  writeFileSync(join(at, "identity", "domain", "slug", "gone.jsonl"), "{ not json\n")
  writeFileSync(join(at, "import", "path", "akasha", "a.domain.ts.jsonl"), "{ not json\n")
  const answer = index(["refresh"], givenAt(root))
  expect(answer.code).toBe(OK)
  expect(everyFileUnder(at)).toEqual(wanted)
  expect(said(answer)).toContain("the index differed from what the pages say")
})

test("an index already saying what the pages say is reported as differing in nothing", () => {
  const root = repoAt()
  seeded(root)
  const answer = index(["refresh"], givenAt(root))
  expect(answer.code).toBe(OK)
  expect(said(answer)).toContain("nothing in the index differed from what the pages say")
})

test("a worktree standing apart from HEAD is refused, and nothing is put in place", () => {
  const root = repoAt()
  seeded(root)
  const at = indexIn(root)
  const was = everyFileUnder(at)
  writeFileSync(
    join(root, "akasha", "b.domain.ts"),
    bodyOf({ id: B_ID, pageTypeSlug: "domain", slug: "b" })
  )
  const answer = index(["refresh"], givenAt(root))
  expect(answer.code).toBe(DATA)
  expect(answer.refusals[0]).toContain("stands apart from HEAD in 1 path")
  expect(answer.refusals[1]).toContain("--unlanded")
  expect(everyFileUnder(at)).toEqual(was)
})

test("`--unlanded` builds over the worktree, and the stamp names what stands apart", () => {
  const root = repoAt()
  writeFileSync(
    join(root, "akasha", "b.domain.ts"),
    bodyOf({ id: B_ID, pageTypeSlug: "domain", slug: "b" })
  )
  const answer = index(["refresh", "--unlanded"], givenAt(root))
  expect(answer.code).toBe(OK)
  expect(existsSync(join(indexIn(root), "identity", "domain", "slug", "b.jsonl"))).toBe(true)
  expect(said(answer)).toContain("stand apart from HEAD and the stamp names them")
  expect(stampIn(indexIn(root))?.settled).toEqual(["akasha/b.domain.ts"])
})

test("`--dry-run` puts nothing in place and leaves nothing aside", () => {
  const root = repoAt()
  seeded(root)
  const at = indexIn(root)
  rmSync(join(at, "identity", "domain", "slug", "a.jsonl"))
  const was = everyFileUnder(at)
  const answer = index(["refresh", "--dry-run"], givenAt(root))
  expect(answer.code).toBe(OK)
  expect(said(answer)).toContain("nothing was put in place — --dry-run")
  expect(said(answer)).toContain("the index differed from what the pages say")
  expect(everyFileUnder(at)).toEqual(was)
  expect(readdirSync(join(root, ".git", "data")).sort()).toEqual(["index"])
})

test("a refresh leaves the landing lock behind it", () => {
  const root = repoAt()
  expect(index(["refresh"], givenAt(root)).code).toBe(OK)
  expect(existsSync(join(root, LOCK_AT))).toBe(false)
})

test("a lock nothing alive holds is taken over rather than waited on", () => {
  const root = repoAt()
  mkdirSync(join(root, ".git"), { recursive: true })
  writeFileSync(join(root, LOCK_AT), "999999999 0")
  expect(index(["refresh"], givenAt(root)).code).toBe(OK)
})

test("a root holding no akasha folder is refused, and the index stands as it was", () => {
  const root = scratch.rootFor("akasha-refresh-")
  git(root, ["init", "--quiet"])
  const answer = index(["refresh"], givenAt(root))
  expect(answer.code).toBe(DATA)
  expect(answer.refusals[0]).toContain("stands under")
  expect(existsSync(indexIn(root))).toBe(false)
})

test("a root git does not hold is refused as the command's trouble, not the caller's", () => {
  const root = scratch.rootFor("akasha-refresh-")
  mkdirSync(join(root, "akasha"), { recursive: true })
  const answer = index(["refresh"], givenAt(root))
  expect(answer.code).toBe(OPERATIONAL)
  expect(answer.refusals[0]).toContain("no commit could be read")
  expect(answer.refusals[answer.refusals.length - 1]).toContain("the index stands as it did")
})

test("a bad act is the caller's trouble", () => {
  const root = repoAt()
  expect(index(["verify"], givenAt(root)).code).toBe(INPUT)
})

test("what stands in one and not the other is what drift names", () => {
  const one = scratch.rootFor("akasha-drift-")
  const two = scratch.rootFor("akasha-drift-")
  writeFileSync(join(one, "went"), "held")
  writeFileSync(join(one, "changed"), "was")
  writeFileSync(join(two, "changed"), "now")
  writeFileSync(join(two, "added"), "held")
  expect(driftBetween(one, two)).toEqual({
    added: ["added"],
    changed: ["changed"],
    went: ["went"],
  })
})

test("every act and flag the surface shows is one this takes", () => {
  for (const one of surface.taking) {
    const said = readIn([one.said.split(" ")[0] ?? ""])
    expect("refused" in said ? said.refused.join(" ") : "").not.toContain("this takes")
  }
})
