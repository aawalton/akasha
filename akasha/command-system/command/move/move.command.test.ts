import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { expect, test } from "bun:test"
import type { Given } from "../../calling.module.code.ts"
import { besideOf, move, pairsIn, repointed, underAkasha } from "./move.command.code.ts"

function git(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], { encoding: "utf8" })
}

function repoWith(named: Readonly<Record<string, string>>): string {
  const root = mkdtempSync(join(tmpdir(), "akasha-move-"))
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
  return root
}

function givenIn(root: string): Given {
  return { root, calledAs: "akasha move", from: root, writer: null }
}

function stands(root: string, path: string): boolean {
  return existsSync(join(root, path))
}

function head(root: string): string {
  return git(root, ["rev-parse", "HEAD"]).trim()
}

function swept(root: string): void {
  rmSync(root, { recursive: true })
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

const REFUSES_PAGE = `export const refuses = {
  id: "01a04bed-1450-7000-8000-00000000bbbb",
  pageTypeSlug: "check",
  slug: "refuses",
  definition: "a check refusing everything",
  code: "ts",
  needs: "path",
  runsOn: ["patch"],
}
`

const REFUSES_CODE = `export function refuses() {
  return ["refused for the test"]
}
`

function refusing(root: string): void {
  const at = "akasha/refuses.check.ts"
  writeFileSync(join(root, at), REFUSES_PAGE)
  writeFileSync(join(root, "akasha/refuses.check.code.ts"), REFUSES_CODE)
  const dir = join(root, ".git/data/index/identity/check/slug")
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    join(dir, "refuses.jsonl"),
    `${JSON.stringify({ path: at, id: "01a04bed-1450-7000-8000-00000000bbbb" })}\n`
  )
}

test("a file is carried to its new path, the old path goes, and the page's id is untouched", () => {
  const root = repoWith({ [HELD]: PAGE })
  const said = move(PAIR, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(stands(root, HELD)).toBe(false)
  expect(git(root, ["ls-files"]).trim()).toBe(THREE)
  expect(readFileSync(join(root, THREE), "utf8")).toBe(PAGE)
  swept(root)
})

test("a page's sidecars go with it without being named", () => {
  const root = repoWith({
    [HELD]: PAGE,
    "akasha/one/held.module.code.ts": CODE,
    "akasha/one/held.module.test.ts": OTHER,
    "akasha/two/other.module.code.ts": OTHER,
  })
  const said = move(["--from", HELD, "--to", DEEP], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(stands(root, "akasha/one/deep/held.module.code.ts")).toBe(true)
  expect(stands(root, "akasha/one/deep/held.module.test.ts")).toBe(true)
  expect(stands(root, "akasha/one/held.module.code.ts")).toBe(false)
  expect(said.report.join("\n")).toContain("stood beside what you named")
  swept(root)
})

test("a moved body's relative specifier is repointed, and one naming a package is left alone", () => {
  const root = repoWith({
    "akasha/one/held.module.code.ts": CODE,
    "akasha/two/other.module.code.ts": OTHER,
  })
  const said = move(
    ["--from", "akasha/one/held.module.code.ts", "--to", "akasha/one/deep/held.module.code.ts"],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  const now = readFileSync(join(root, "akasha/one/deep/held.module.code.ts"), "utf8")
  expect(now).toContain('from "../../two/other.module.code.ts"')
  expect(now).toContain('import ts from "typescript"')
  swept(root)
})

test("every answer says the files importing what moved were not established", () => {
  const root = repoWith({ [HELD]: PAGE })
  const said = move(PAIR, givenIn(root))
  expect(said.report.join("\n")).toContain("the index carries no edge")
  swept(root)
})

test("a move that would change what a page is called is refused, and names what names it", () => {
  const root = repoWith({ [HELD]: PAGE })
  const id = "01a04bed-1450-7000-8000-00000000aaaa"
  const naming = join(root, `.git/data/index/relation/page/id/${id}/required-reading-slugs`)
  mkdirSync(naming, { recursive: true })
  writeFileSync(
    join(naming, "01a04bed-1450-7000-8000-00000000cccc.jsonl"),
    `${JSON.stringify({ path: "akasha/elsewhere/reader.module.ts" })}\n`
  )
  const held = join(root, ".git/data/index/identity/page/id")
  mkdirSync(held, { recursive: true })
  writeFileSync(join(held, `${id}.jsonl`), `${JSON.stringify({ path: HELD, id })}\n`)
  const said = move(["--from", HELD, "--to", "akasha/one/other.module.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("renaming is not a move")
  expect(said.refusals.join("\n")).toContain("akasha/elsewhere/reader.module.ts")
  expect(stands(root, HELD)).toBe(true)
  swept(root)
})

test("a refused move leaves nothing behind", () => {
  const root = repoWith({ [HELD]: PAGE, "akasha/one/held.module.code.ts": OTHER })
  refusing(root)
  const was = head(root)
  const said = move(PAIR, givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(stands(root, HELD)).toBe(true)
  expect(stands(root, "akasha/one/held.module.code.ts")).toBe(true)
  expect(stands(root, THREE)).toBe(false)
  expect(stands(root, "akasha/three")).toBe(false)
  expect(head(root)).toBe(was)
  swept(root)
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
  swept(root)
})

test("a destination that already stands is refused", () => {
  const root = repoWith({ [HELD]: PAGE, [THREE]: OTHER })
  const said = move(PAIR, givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("already stands")
  expect(readFileSync(join(root, THREE), "utf8")).toBe(OTHER)
  swept(root)
})

test("a side standing outside the akasha folder is refused", () => {
  const root = repoWith({ [HELD]: PAGE })
  const said = move(["--from", HELD, "--to", "elsewhere/held.module.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stands outside")
  swept(root)
})

test("naming no pair is refused rather than committed empty", () => {
  const root = repoWith({ [HELD]: PAGE })
  const said = move([], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("name at least one pair")
  swept(root)
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
  swept(root)
})

test("a dry run names the pairs it would carry, sidecars and all", () => {
  const root = repoWith({
    [HELD]: PAGE,
    "akasha/one/held.module.code.ts": CODE,
    "akasha/one/held.module.test.ts": OTHER,
    "akasha/two/other.module.code.ts": OTHER,
  })
  const said = move(["--from", HELD, "--to", DEEP, "--dry-run"], givenIn(root))
  const report = said.report.join("\n")
  expect(report).toContain(`${HELD} would move to ${DEEP}`)
  expect(report).toContain("stand beside what you named and would go with it")
  expect(report).toContain("akasha/one/held.module.code.ts to akasha/one/deep/held.module.code.ts")
  expect(report).toContain("akasha/one/held.module.test.ts to akasha/one/deep/held.module.test.ts")
  expect(report).toContain("the index carries no edge")
  swept(root)
})

test("a dry run over a move the checks refuse reports the refusal and carries nothing", () => {
  const root = repoWith({ [HELD]: PAGE })
  refusing(root)
  const said = move([...PAIR, "--dry-run"], givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(stands(root, "akasha/three")).toBe(false)
  expect(stands(root, HELD)).toBe(true)
  swept(root)
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
  expect(git(root, ["log", "-1", "--pretty=%s"]).trim()).toBe("held moves")
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe(
    "held moves\n\nChecks-bypassed: the check is wrong"
  )
  swept(root)
})

test("breaking the glass with no reason, or alongside a dry run, is refused", () => {
  const root = repoWith({ [HELD]: PAGE })
  const ends = move([...PAIR, "--break-the-glass"], givenIn(root))
  expect(ends.code).toBe(1)
  expect(ends.refusals[0]).toBe(
    "--break-the-glass needs a value, and the line ends or names another flag"
  )
  const empty = move([...PAIR, "--break-the-glass", "  "], givenIn(root))
  expect(empty.code).toBe(1)
  expect(empty.refusals[0]).toBe(
    "--break-the-glass takes the reason no check is to run, and this one is empty"
  )
  const both = move([...PAIR, "--break-the-glass", "no time", "--dry-run"], givenIn(root))
  expect(both.code).toBe(1)
  expect(both.refusals[0]).toBe(
    "--dry-run reports what the checks say and --break-the-glass runs none, so together they report nothing"
  )
  expect(stands(root, "akasha/three")).toBe(false)
  swept(root)
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
  swept(root)
})

test("a path is read against the folder the call ran in", () => {
  expect(underAkasha("/root", "/root/akasha/one", "held.ts")).toBe("akasha/one/held.ts")
  expect(underAkasha("/root", "/root", "elsewhere/held.ts")).toBeNull()
  expect(underAkasha("/root", "/root", "/root/akasha/held.ts")).toBe("akasha/held.ts")
})

test("a sidecar is found by the name it stands under, not by what the page states", () => {
  const root = repoWith({
    [HELD]: PAGE,
    "akasha/one/held.module.code.ts": OTHER,
    "akasha/one/held.module.test.ts": OTHER,
    "akasha/one/held.module.notes.ts": OTHER,
    "akasha/one/heldover.module.ts": OTHER,
  })
  expect(besideOf(root, HELD)).toEqual([
    "akasha/one/held.module.code.ts",
    "akasha/one/held.module.test.ts",
  ])
  swept(root)
})

test("a specifier reaching a file that moves in the same act reaches its new path", () => {
  const moved = new Map([["akasha/two/other.module.code.ts", "akasha/four/other.module.code.ts"]])
  const said = repointed(
    "akasha/one/held.module.code.ts",
    "akasha/one/held.module.code.ts",
    CODE,
    moved
  )
  expect(said).toContain('from "../four/other.module.code.ts"')
  expect(said).toContain('import ts from "typescript"')
})
