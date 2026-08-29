import { afterAll, expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { stampKept } from "../../../pages-system/index/index-stamp.module.code.ts"
import type { Given } from "../../calling.module.code.ts"
import { admitting, refusing } from "../../minting.module.code.ts"
import { scratchWorld } from "../../scratching.module.code.ts"
import {
  IMPORTS_AT,
  move,
  PATHS_AT,
  pairsIn,
  repointed,
  surface,
  underAkasha,
} from "./move.command.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function git(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], { encoding: "utf8" })
}

function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-move-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  writeFileSync(join(root, ".git/info/exclude"), "akasha/admits.check*\n")
  admitting(root)
  return root
}

function givenIn(root: string): Given {
  return { root, calledAs: "akasha move", from: root, writer: null, agentId: null }
}

function stands(root: string, path: string): boolean {
  return existsSync(join(root, path))
}

function head(root: string): string {
  return git(root, ["rev-parse", "HEAD"]).trim()
}

function importing(root: string, target: string, importers: readonly string[]): void {
  const at = join(root, IMPORTS_AT, `${target}.jsonl`)
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, importers.map((path) => `${JSON.stringify({ path })}\n`).join(""))
  stampKept(join(root, ".git/data/index"), { commit: head(root), tree: "akasha", settled: [] })
}

const HELD = "akasha/one/held.module.ts"

const THREE = "akasha/three/held.module.ts"

const DEEP = "akasha/one/deep/held.module.ts"

const PAIR = ["--from", HELD, "--to", THREE]

const PAGE = `export const held = {
  id: "01a04bed-1450-7000-8000-00000000aaaa",
  pageTypeSlug: "module",
  slug: "held",
  definition: "a page carried across a move",
}
`

const CODE = `import ts from "typescript"
import { other } from "../two/other.module.code.ts"

export const held = { ts, other }
`

const OTHER = `export const other = 1\n`

const HOLDER = "akasha/one/held.module.code.ts"

const TARGET = "akasha/two/other.module.code.ts"

const ARRIVES = "akasha/four/other.module.code.ts"

const DEEPER = "akasha/one/deep/held.module.code.ts"

test("a file is carried to its new path, the old path goes, and the page's id is untouched", () => {
  const root = repoWith({ [HELD]: PAGE })
  const said = move(PAIR, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(stands(root, HELD)).toBe(false)
  expect(git(root, ["ls-files"]).trim()).toBe(THREE)
  expect(readFileSync(join(root, THREE), "utf8")).toBe(PAGE)
  expect(said.report[0]).toBe(`${HELD} moved to ${THREE}`)
  expect(said.report.join("\n")).not.toContain("wrote ")
  expect(said.report.at(-1)).toStartWith("committed as ")
  expect(said.report.join("\n")).toContain("was not looked for")
})

test("a page's sidecars go with it without being named", () => {
  const root = repoWith({
    [HELD]: PAGE,
    [HOLDER]: CODE,
    "akasha/one/held.module.test.ts": OTHER,
    [TARGET]: OTHER,
  })
  const said = move(["--from", HELD, "--to", DEEP], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(stands(root, DEEPER)).toBe(true)
  expect(stands(root, "akasha/one/deep/held.module.test.ts")).toBe(true)
  expect(stands(root, HOLDER)).toBe(false)
  expect(said.report.join("\n")).toContain("stood beside what you named")
})

test("a moved body's relative specifier is repointed and a package one is not", () => {
  const root = repoWith({ [HOLDER]: CODE, [TARGET]: OTHER })
  const said = move(["--from", HOLDER, "--to", DEEPER], givenIn(root))
  expect(said.refusals).toEqual([])
  const now = readFileSync(join(root, DEEPER), "utf8")
  expect(now).toContain('from "../../two/other.module.code.ts"')
  expect(now).toContain('import ts from "typescript"')
})

test("a file importing what moved is repointed, and a dry run writes none of it", () => {
  const root = repoWith({ [HOLDER]: CODE, [TARGET]: OTHER })
  importing(root, TARGET, [HOLDER])
  const carry = ["--from", TARGET, "--to", ARRIVES]
  const dry = move([...carry, "--dry-run"], givenIn(root))
  expect(dry.report.join("\n")).toContain(`1 file importing what moved would be repointed — ${HOLDER}`)
  expect(readFileSync(join(root, HOLDER), "utf8")).toBe(CODE)
  const said = move(carry, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(readFileSync(join(root, HOLDER), "utf8")).toContain('from "../four/other.module.code.ts"')
  expect(said.report.join("\n")).toContain(`1 file importing what moved was repointed — ${HOLDER}`)
})

test("a file moving in the same act is repointed from its body, not as an importer", () => {
  const root = repoWith({ [HOLDER]: CODE, [TARGET]: OTHER })
  importing(root, TARGET, [HOLDER])
  const carry = ["--from", TARGET, "--to", ARRIVES, "--from", HOLDER, "--to", DEEPER]
  const said = move(carry, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(readFileSync(join(root, DEEPER), "utf8")).toContain('from "../../four/other.module.code.ts"')
  expect(said.report.join("\n")).toContain("the index names no file importing what moved")
})

test("an unanswerable index leaves the importers as they stand and says so", () => {
  const root = repoWith({ [HOLDER]: CODE, [TARGET]: OTHER })
  const said = move(["--from", TARGET, "--to", ARRIVES], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(readFileSync(join(root, HOLDER), "utf8")).toBe(CODE)
  expect(said.report.join("\n")).toContain("what imports the moved files could not be answered")
})

const AAAA = "01a04bed-1450-7000-8000-00000000aaaa"

const RENAME = ["--from", HELD, "--to", "akasha/one/other.module.ts"]

const READER = "akasha/elsewhere/reader.module.ts"

function claiming(root: string, path: string, ids: readonly string[]): void {
  const at = join(root, PATHS_AT, `${path}.jsonl`)
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, ids.map((id) => `${JSON.stringify({ path, id })}\n`).join(""))
}

function naming(root: string, id: string): void {
  const at = join(root, ".git/data/index/relation/page/id", id, "required-reading-slugs")
  mkdirSync(at, { recursive: true })
  writeFileSync(join(at, `${AAAA}.jsonl`), `${JSON.stringify({ path: READER })}\n`)
}

function renamed(root: string): string {
  const said = move(RENAME, givenIn(root))
  const why = said.refusals.join("\n")
  expect(said.code).toBe(1)
  expect(why).toContain("renaming is not a move")
  expect(stands(root, HELD)).toBe(true)
  return why
}

test("a rename names what names the file, and only where the index answers one page", () => {
  const root = repoWith({ [HELD]: PAGE })
  naming(root, AAAA)
  expect(renamed(root)).toContain(
    `\`${PATHS_AT}\` is not there, so what names it could not be answered`
  )
  claiming(root, "akasha/one/two.module.ts", [AAAA])
  expect(renamed(root)).toContain("the index shows no page naming it")
  claiming(root, HELD, [AAAA, "01a04bed-1450-7000-8000-00000000dddd"])
  const two = renamed(root)
  expect(two).toContain(`the index answers 2 pages to the path \`${HELD}\``)
  expect(two).not.toContain(READER)
  claiming(root, HELD, [AAAA])
  expect(renamed(root)).toContain(READER)
})

test("a refused move leaves nothing behind", () => {
  const root = repoWith({ [HELD]: PAGE, [HOLDER]: OTHER })
  refusing(root)
  const was = head(root)
  const said = move(PAIR, givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(stands(root, HELD)).toBe(true)
  expect(stands(root, HOLDER)).toBe(true)
  expect(stands(root, THREE)).toBe(false)
  expect(stands(root, "akasha/three")).toBe(false)
  expect(head(root)).toBe(was)
})

test("a path that is not there is refused", () => {
  const root = repoWith({ [HELD]: PAGE })
  const said = move(
    ["--from", "akasha/one/nowhere.module.ts", "--to", "akasha/three/nowhere.module.ts"],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is not there")
  expect(stands(root, "akasha/three")).toBe(false)
})

test("a destination that already stands is refused", () => {
  const root = repoWith({ [HELD]: PAGE, [THREE]: OTHER })
  const said = move(PAIR, givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("already stands")
  expect(readFileSync(join(root, THREE), "utf8")).toBe(OTHER)
})

test("a side standing outside the akasha folder is refused", () => {
  const root = repoWith({ [HELD]: PAGE })
  const said = move(["--from", HELD, "--to", "elsewhere/held.module.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stands outside")
})

test("naming no pair is refused rather than committed empty", () => {
  const root = repoWith({ [HELD]: PAGE })
  const said = move([], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("name at least one pair")
})

test("a --from with no --to is refused", () => {
  const said = pairsIn(["--from", "one", "--from", "two"])
  expect("refused" in said ? said.refused : "").toContain("each pair names both sides")
})

test("a dry run gates and writes nothing at all", () => {
  const root = repoWith({ [HELD]: PAGE })
  const was = head(root)
  const said = move([...PAIR, "--dry-run"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.report.join("\n")).toContain("nothing was written")
  expect(stands(root, "akasha/three")).toBe(false)
  expect(head(root)).toBe(was)
  expect(git(root, ["status", "--porcelain", "--", "akasha"]).trim()).toBe("")
  const then = move(PAIR, givenIn(root))
  expect(then.refusals).toEqual([])
  expect(stands(root, THREE)).toBe(true)
  expect(stands(root, HELD)).toBe(false)
  expect(head(root)).not.toBe(was)
})

test("a dry run names the pairs it would carry, sidecars and all", () => {
  const root = repoWith({
    [HELD]: PAGE,
    [HOLDER]: CODE,
    "akasha/one/held.module.test.ts": OTHER,
    [TARGET]: OTHER,
  })
  const said = move(["--from", HELD, "--to", DEEP, "--dry-run"], givenIn(root))
  const report = said.report.join("\n")
  expect(report).toContain(`${HELD} would move to ${DEEP}`)
  expect(report).toContain("stand beside what you named and would go with it")
  expect(report).toContain("akasha/one/held.module.code.ts to akasha/one/deep/held.module.code.ts")
  expect(report).toContain("akasha/one/held.module.test.ts to akasha/one/deep/held.module.test.ts")
  expect(report).toContain("what imports the moved files could not be answered")
})

test("a dry run over a move the checks refuse reports it and carries nothing", () => {
  const root = repoWith({ [HELD]: PAGE })
  refusing(root)
  const said = move([...PAIR, "--dry-run"], givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(stands(root, "akasha/three")).toBe(false)
  expect(stands(root, HELD)).toBe(true)
})

test("breaking the glass carries a move the checks refuse, and only breaking it does", () => {
  const root = repoWith({ [HELD]: PAGE })
  refusing(root)
  const was = head(root)
  const gated = move([...PAIR, "--message", "held moves"], givenIn(root))
  expect(gated.code).toBe(3)
  expect(gated.refusals.join("\n")).toContain("refused for the test")
  expect(stands(root, THREE)).toBe(false)
  expect(head(root)).toBe(was)

  const said = move(
    [...PAIR, "--message", "held moves", "--break-the-glass", "  the check is wrong  "],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain(
    "no check ran — the glass was broken for: the check is wrong"
  )
  expect(stands(root, THREE)).toBe(true)
  expect(stands(root, HELD)).toBe(false)
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe(
    "held moves\n\nChecks-bypassed: the check is wrong"
  )
})

test("breaking the glass with no reason, or alongside a dry run, is refused", () => {
  const root = repoWith({ [HELD]: PAGE })
  const ends = move([...PAIR, "--break-the-glass"], givenIn(root))
  expect(ends.code).toBe(1)
  expect(ends.refusals[0]).toContain("needs a value, and the line ends")
  const empty = move([...PAIR, "--break-the-glass", "  "], givenIn(root))
  expect(empty.code).toBe(1)
  expect(empty.refusals[0]).toContain("no check is to run, and this one is empty")
  const both = move([...PAIR, "--break-the-glass", "no time", "--dry-run"], givenIn(root))
  expect(both.code).toBe(1)
  expect(both.refusals[0]).toContain("runs none, so together they report nothing")
  expect(stands(root, "akasha/three")).toBe(false)
})

test("a message is read from a file and trimmed, and stated twice over or empty is refused", () => {
  const root = repoWith({ [HELD]: PAGE })
  const at = join(root, "message.txt")
  writeFileSync(at, "carried by a file\n")
  const both = move([...PAIR, "--message", "carried", "--message-file", at], givenIn(root))
  expect(both.code).toBe(1)
  expect(both.refusals.join("\n")).toContain("both are given")
  writeFileSync(at, "   \n")
  const empty = move([...PAIR, "--message-file", at], givenIn(root))
  expect(empty.code).toBe(1)
  expect(empty.refusals[0]).toContain("the message given is empty")
  expect(stands(root, "akasha/three")).toBe(false)
  writeFileSync(at, "  carried by a file  \n")
  const said = move([...PAIR, "--message-file", at], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe("carried by a file")
})

test("a path is read against the folder the call ran in", () => {
  expect(underAkasha("/root", "/root/akasha/one", "held.ts")).toBe("akasha/one/held.ts")
  expect(underAkasha("/root", "/root", "elsewhere/held.ts")).toBeNull()
  expect(underAkasha("/root", "/root", "/root/akasha/held.ts")).toBe("akasha/held.ts")
})

test("a specifier reaching a file that moves in the same act reaches its new path", () => {
  const moved = new Map([[TARGET, ARRIVES]])
  const said = repointed(HOLDER, HOLDER, CODE, moved)
  expect(said).toContain('from "../four/other.module.code.ts"')
  expect(said).toContain('import ts from "typescript"')
})

test("every flag the surface shows is a flag this takes", () => {
  for (const one of surface.taking) {
    const said = pairsIn([one.said.split(" ")[0] ?? ""])
    expect("refused" in said ? said.refused : "").not.toContain("this takes")
  }
})
