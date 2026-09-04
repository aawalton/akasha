import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { indexNamed, indexThere } from "@akasha/indexes"
import {
  besideTheIndex,
  everythingFiled,
  importUnreadableFiled,
  indexTakenFrom,
  listedFiledIn,
  listedTakenFrom,
  listedUnreadableFiled,
  rebuiltApart,
  rebuiltIn,
  stampListedIn,
} from "@akasha/indexes/testing"
import { id as idPage } from "@akasha/pages-system/page/id"
import { slug as slugPage } from "@akasha/pages-system/page/slug"
import { textProperty } from "@akasha/pages-system/text-property"
import type { Given } from "../../calling/calling.module.code.ts"
import { calling } from "../../calling/calling.module.code.ts"
import { DATA, INPUT, OK, OPERATIONAL } from "../../cli/cli.module.code.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"
import { index, readIn } from "./index.command.code.ts"
import { index as indexCommand } from "./index.command.ts"

const TREE = "."

const CODE_AT = "command-system/commands/index/index.command.code.ts"

const PAGE_AT = "command-system/commands/index/index.command.ts"

const LOCK_AT = ".git/akasha-landing.lock"

const REAL = join(import.meta.dir, "index.command.code.ts")

const TYPE_ID = "01a04de1-2000-7000-8000-000000000001"

const A_ID = "01a04de1-2000-7000-8000-000000000002"

const B_ID = "01a04de1-2000-7000-8000-000000000003"

const ROOT_ID = "01a04de1-2000-7000-8000-000000000004"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function bodyOf(value: Readonly<Record<string, unknown>>): string {
  return `export const held = ${JSON.stringify(value)}\n`
}

function typed(said: string, slug: string, above: string | null, declares: readonly string[] = []) {
  const properties = declares.map((one) => ({
    pagePropertySlug: one,
    required: false,
    many: false,
  }))
  return bodyOf({
    id: `01a04de1-2000-7000-8000-0000000000${said}`,
    pageTypeSlug: "page-type",
    slug,
    extendsSlug: above,
    properties,
  })
}

const PAGES: Readonly<Record<string, string>> = {
  "page.page-type.ts": typed("11", "page", null, ["id", "slug"]),
  "page-type.page-type.ts": typed("12", "page-type", "page-type/page"),
  "page-property.page-type.ts": typed("13", "page-property", "page-type/page"),
  "domain.page-type.ts": bodyOf({
    id: TYPE_ID,
    pageTypeSlug: "page-type",
    slug: "domain",
    extendsSlug: ["page-type/page"],
  }),
  "text-property.page-type.ts": bodyOf(textProperty),
  "id.text-property.ts": bodyOf(idPage),
  "slug.text-property.ts": bodyOf(slugPage),
  "akasha.domain.ts": bodyOf({ id: ROOT_ID, pageTypeSlug: "domain", slug: "akasha" }),
  "a.domain.ts": bodyOf({ id: A_ID, pageTypeSlug: "domain", slug: "a" }),
  "a.module.code.ts": 'import { held } from "./a.domain.ts"\nexport const one = held\n',
  [PAGE_AT]: bodyOf({ id: B_ID, pageTypeSlug: "domain", slug: "index-command" }),
  [CODE_AT]: `export { index } from ${JSON.stringify(REAL)}\n`,
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

function wantedFor(root: string): readonly string[] {
  return rebuiltApart(root, TREE, scratch.rootFor("akasha-wanted-"))
}

function seeded(root: string): undefined {
  rebuiltIn(root, TREE)
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
  expect(everythingFiled(root)).toEqual(wanted)
  expect(said(answer)).toContain(`${indexNamed()} was replaced whole`)
})

test("the rebuild's stamp is read back and named, and it names HEAD", () => {
  const root = repoAt()
  const answer = index(["refresh"], givenAt(root))
  expect(said(answer)).toContain(`stamped with ${git(root, ["rev-parse", "HEAD"]).trim()}`)
  expect(stampListedIn(root)?.settled).toEqual([])
})

test("`index refresh` is reached with no index at all", async () => {
  const root = repoAt()
  indexTakenFrom(root)
  const answer = await calling(["index", "refresh"], {
    root,
    calledAs: "akasha",
    from: root,
    writer: null,
    agentId: null,
  })
  expect(answer.refusals).toEqual([])
  expect(answer.code).toBe(OK)
  expect(everythingFiled(root)).toEqual(wantedFor(root))
})

test("`index refresh` is reached through an index that will not parse", async () => {
  const root = repoAt()
  seeded(root)
  listedUnreadableFiled(root, "command", "index")
  const answer = await calling(["index", "refresh"], {
    root,
    calledAs: "akasha",
    from: root,
    writer: null,
    agentId: null,
  })
  expect(answer.refusals).toEqual([])
  expect(answer.code).toBe(OK)
  expect(listedFiledIn(root, "command", "index")).toBe(false)
})

test("a damaged index is put back to what a clean rebuild builds", () => {
  const root = repoAt()
  seeded(root)
  const wanted = wantedFor(root)
  listedTakenFrom(root, "domain", "a")
  listedUnreadableFiled(root, "domain", "gone")
  importUnreadableFiled(root, "a.domain.ts")
  const answer = index(["refresh"], givenAt(root))
  expect(answer.code).toBe(OK)
  expect(everythingFiled(root)).toEqual(wanted)
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
  const was = everythingFiled(root)
  writeFileSync(join(root, "b.domain.ts"), bodyOf({ id: B_ID, pageTypeSlug: "domain", slug: "b" }))
  const answer = index(["refresh"], givenAt(root))
  expect(answer.code).toBe(DATA)
  expect(answer.refusals[0]).toContain("stands apart from HEAD in 1 path")
  expect(answer.refusals[1]).toContain("--unlanded")
  expect(everythingFiled(root)).toEqual(was)
})

test("`--unlanded` builds over the worktree, and the stamp names what stands apart", () => {
  const root = repoAt()
  writeFileSync(join(root, "b.domain.ts"), bodyOf({ id: B_ID, pageTypeSlug: "domain", slug: "b" }))
  const answer = index(["refresh", "--unlanded"], givenAt(root))
  expect(answer.code).toBe(OK)
  expect(listedFiledIn(root, "domain", "b")).toBe(true)
  expect(said(answer)).toContain("stand apart from HEAD and the stamp names them")
  expect(stampListedIn(root)?.settled).toEqual(["b.domain.ts"])
})

test("`--dry-run` puts nothing in place and leaves nothing aside", () => {
  const root = repoAt()
  seeded(root)
  listedTakenFrom(root, "domain", "a")
  const was = everythingFiled(root)
  const answer = index(["refresh", "--dry-run"], givenAt(root))
  expect(answer.code).toBe(OK)
  expect(said(answer)).toContain("nothing was put in place — --dry-run")
  expect(said(answer)).toContain("the index differed from what the pages say")
  expect(everythingFiled(root)).toEqual(was)
  expect(besideTheIndex(root)).toEqual([])
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

test("a root holding no akasha domain page is refused, and the index remains as it is", () => {
  const root = scratch.rootFor("akasha-refresh-")
  git(root, ["init", "--quiet"])
  const answer = index(["refresh"], givenAt(root))
  expect(answer.code).toBe(DATA)
  expect(answer.refusals[0]).toContain("akasha.domain.ts")
  expect(indexThere(root)).toBe(false)
})

test("a root git does not hold is refused as the command's trouble, not the caller's", () => {
  const root = scratch.rootFor("akasha-refresh-")
  writeFileSync(join(root, "akasha.domain.ts"), PAGES["akasha.domain.ts"] ?? "")
  const answer = index(["refresh"], givenAt(root))
  expect(answer.code).toBe(OPERATIONAL)
  expect(answer.refusals[0]).toContain("no commit could be read")
  expect(answer.refusals[answer.refusals.length - 1]).toContain("the index stands as it did")
})

test("a bad act is the caller's trouble", () => {
  const root = repoAt()
  expect(index(["verify"], givenAt(root)).code).toBe(INPUT)
})

test("every act and flag the surface shows is one this takes", () => {
  for (const one of indexCommand.taking) {
    const said = readIn([one.said.split(" ")[0] ?? ""])
    expect("refused" in said ? said.refused.join(" ") : "").not.toContain("this takes")
  }
})
