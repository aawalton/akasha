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

test("a file is carried to its new path and the old path is taken away", () => {
  const root = repoWith({ "akasha/one/held.module.ts": PAGE })
  const said = move(
    ["--from", "akasha/one/held.module.ts", "--to", "akasha/three/held.module.ts"],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(existsSync(join(root, "akasha/one/held.module.ts"))).toBe(false)
  expect(existsSync(join(root, "akasha/three/held.module.ts"))).toBe(true)
  expect(git(root, ["ls-files"]).trim()).toBe("akasha/three/held.module.ts")
  rmSync(root, { recursive: true })
})

test("a page's id is unchanged when its path changes", () => {
  const root = repoWith({ "akasha/one/held.module.ts": PAGE })
  const said = move(
    ["--from", "akasha/one/held.module.ts", "--to", "akasha/three/held.module.ts"],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  const now = readFileSync(join(root, "akasha/three/held.module.ts"), "utf8")
  expect(now).toContain("01a04bed-1450-7000-8000-00000000aaaa")
  expect(now).toBe(PAGE)
  rmSync(root, { recursive: true })
})

test("a page's sidecars go with it without being named", () => {
  const root = repoWith({
    "akasha/one/held.module.ts": PAGE,
    "akasha/one/held.module.code.ts": CODE,
    "akasha/one/held.module.test.ts": OTHER,
    "akasha/two/other.module.code.ts": OTHER,
  })
  const said = move(
    ["--from", "akasha/one/held.module.ts", "--to", "akasha/one/deep/held.module.ts"],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(existsSync(join(root, "akasha/one/deep/held.module.code.ts"))).toBe(true)
  expect(existsSync(join(root, "akasha/one/deep/held.module.test.ts"))).toBe(true)
  expect(existsSync(join(root, "akasha/one/held.module.code.ts"))).toBe(false)
  expect(said.report.join("\n")).toContain("stood beside what you named")
  rmSync(root, { recursive: true })
})

test("a moved body's relative specifier is repointed to reach what it reached", () => {
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
  rmSync(root, { recursive: true })
})

test("a specifier naming a package is left alone", () => {
  const root = repoWith({
    "akasha/one/held.module.code.ts": CODE,
    "akasha/two/other.module.code.ts": OTHER,
  })
  move(
    ["--from", "akasha/one/held.module.code.ts", "--to", "akasha/one/deep/held.module.code.ts"],
    givenIn(root)
  )
  const now = readFileSync(join(root, "akasha/one/deep/held.module.code.ts"), "utf8")
  expect(now).toContain('import ts from "typescript"')
  rmSync(root, { recursive: true })
})

test("every answer says the files importing what moved were not established", () => {
  const root = repoWith({ "akasha/one/held.module.ts": PAGE })
  const said = move(
    ["--from", "akasha/one/held.module.ts", "--to", "akasha/three/held.module.ts"],
    givenIn(root)
  )
  expect(said.report.join("\n")).toContain("the index carries no edge")
  rmSync(root, { recursive: true })
})

test("a move that would change what a page is called is refused, and names what names it", () => {
  const root = repoWith({ "akasha/one/held.module.ts": PAGE })
  const id = "01a04bed-1450-7000-8000-00000000aaaa"
  const naming = join(root, `.git/data/index/relation/page/id/${id}/required-reading-slugs`)
  mkdirSync(naming, { recursive: true })
  writeFileSync(
    join(naming, "01a04bed-1450-7000-8000-00000000cccc.jsonl"),
    `${JSON.stringify({ path: "akasha/elsewhere/reader.module.ts" })}\n`
  )
  const held = join(root, ".git/data/index/identity/page/id")
  mkdirSync(held, { recursive: true })
  writeFileSync(
    join(held, `${id}.jsonl`),
    `${JSON.stringify({ path: "akasha/one/held.module.ts", id })}\n`
  )
  const said = move(
    ["--from", "akasha/one/held.module.ts", "--to", "akasha/one/other.module.ts"],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("renaming is not a move")
  expect(said.refusals.join("\n")).toContain("akasha/elsewhere/reader.module.ts")
  expect(existsSync(join(root, "akasha/one/held.module.ts"))).toBe(true)
  rmSync(root, { recursive: true })
})

test("a refused move leaves nothing behind", () => {
  const root = repoWith({
    "akasha/one/held.module.ts": PAGE,
    "akasha/one/held.module.code.ts": OTHER,
  })
  refusing(root)
  const was = git(root, ["rev-parse", "HEAD"]).trim()
  const said = move(
    ["--from", "akasha/one/held.module.ts", "--to", "akasha/three/held.module.ts"],
    givenIn(root)
  )
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(existsSync(join(root, "akasha/one/held.module.ts"))).toBe(true)
  expect(existsSync(join(root, "akasha/one/held.module.code.ts"))).toBe(true)
  expect(existsSync(join(root, "akasha/three/held.module.ts"))).toBe(false)
  expect(existsSync(join(root, "akasha/three"))).toBe(false)
  expect(git(root, ["rev-parse", "HEAD"]).trim()).toBe(was)
  rmSync(root, { recursive: true })
})

test("a path that is not there is refused", () => {
  const root = repoWith({ "akasha/one/held.module.ts": PAGE })
  const said = move(
    ["--from", "akasha/one/nowhere.module.ts", "--to", "akasha/three/nowhere.module.ts"],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is not there")
  expect(existsSync(join(root, "akasha/three"))).toBe(false)
  rmSync(root, { recursive: true })
})

test("a destination that already stands is refused", () => {
  const root = repoWith({
    "akasha/one/held.module.ts": PAGE,
    "akasha/three/held.module.ts": OTHER,
  })
  const said = move(
    ["--from", "akasha/one/held.module.ts", "--to", "akasha/three/held.module.ts"],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("already stands")
  expect(readFileSync(join(root, "akasha/three/held.module.ts"), "utf8")).toBe(OTHER)
  rmSync(root, { recursive: true })
})

test("a side standing outside the akasha folder is refused", () => {
  const root = repoWith({ "akasha/one/held.module.ts": PAGE })
  const said = move(
    ["--from", "akasha/one/held.module.ts", "--to", "elsewhere/held.module.ts"],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stands outside")
  rmSync(root, { recursive: true })
})

test("naming no pair is refused rather than committed empty", () => {
  const root = repoWith({ "akasha/one/held.module.ts": PAGE })
  const said = move([], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("name at least one pair")
  rmSync(root, { recursive: true })
})

test("a --from with no --to is refused", () => {
  const said = pairsIn(["--from", "one", "--from", "two"])
  expect("refused" in said).toBe(true)
  expect("refused" in said ? said.refused : "").toContain("each pair names both sides")
})

test("a dry run gates and writes nothing at all", () => {
  const root = repoWith({ "akasha/one/held.module.ts": PAGE })
  const was = git(root, ["rev-parse", "HEAD"]).trim()
  const argv = ["--from", "akasha/one/held.module.ts", "--to", "akasha/three/held.module.ts"]
  const said = move([...argv, "--dry-run"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.report.join("\n")).toContain("nothing was written")
  expect(existsSync(join(root, "akasha/three"))).toBe(false)
  expect(git(root, ["rev-parse", "HEAD"]).trim()).toBe(was)
  expect(git(root, ["status", "--porcelain", "--", "akasha"]).trim()).toBe("")
  const then = move(argv, givenIn(root))
  expect(then.refusals).toEqual([])
  expect(existsSync(join(root, "akasha/three/held.module.ts"))).toBe(true)
  expect(existsSync(join(root, "akasha/one/held.module.ts"))).toBe(false)
  expect(git(root, ["rev-parse", "HEAD"]).trim()).not.toBe(was)
  rmSync(root, { recursive: true })
})

test("a dry run names the pairs it would carry, sidecars and all", () => {
  const root = repoWith({
    "akasha/one/held.module.ts": PAGE,
    "akasha/one/held.module.code.ts": CODE,
    "akasha/one/held.module.test.ts": OTHER,
    "akasha/two/other.module.code.ts": OTHER,
  })
  const said = move(
    ["--from", "akasha/one/held.module.ts", "--to", "akasha/one/deep/held.module.ts", "--dry-run"],
    givenIn(root)
  )
  const report = said.report.join("\n")
  expect(report).toContain("akasha/one/held.module.ts would move to akasha/one/deep/held.module.ts")
  expect(report).toContain("stand beside what you named and would go with it")
  expect(report).toContain("akasha/one/held.module.code.ts to akasha/one/deep/held.module.code.ts")
  expect(report).toContain("akasha/one/held.module.test.ts to akasha/one/deep/held.module.test.ts")
  expect(report).toContain("the index carries no edge")
  rmSync(root, { recursive: true })
})

test("a dry run over a move the checks refuse reports the refusal and carries nothing", () => {
  const root = repoWith({ "akasha/one/held.module.ts": PAGE })
  refusing(root)
  const said = move(
    ["--from", "akasha/one/held.module.ts", "--to", "akasha/three/held.module.ts", "--dry-run"],
    givenIn(root)
  )
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(existsSync(join(root, "akasha/three"))).toBe(false)
  expect(existsSync(join(root, "akasha/one/held.module.ts"))).toBe(true)
  rmSync(root, { recursive: true })
})

test("a message is read from a file and trimmed", () => {
  const root = repoWith({ "akasha/one/held.module.ts": PAGE })
  const at = join(root, "message.txt")
  writeFileSync(at, "  carried by a file  \n")
  const said = move(
    ["--from", "akasha/one/held.module.ts", "--to", "akasha/three/held.module.ts", "--message-file", at],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe("carried by a file")
  rmSync(root, { recursive: true })
})

test("a message stated twice over, or empty, is refused and carries nothing", () => {
  const root = repoWith({ "akasha/one/held.module.ts": PAGE })
  const at = join(root, "message.txt")
  const pair = ["--from", "akasha/one/held.module.ts", "--to", "akasha/three/held.module.ts"]
  writeFileSync(at, "carried by a file\n")
  const both = move([...pair, "--message", "carried", "--message-file", at], givenIn(root))
  expect(both.code).toBe(1)
  expect(both.refusals.join("\n")).toContain("both are given")
  writeFileSync(at, "   \n")
  const said = move([...pair, "--message-file", at], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("the message given is empty")
  expect(existsSync(join(root, "akasha/three"))).toBe(false)
  rmSync(root, { recursive: true })
})

test("a path is read against the folder the call ran in", () => {
  expect(underAkasha("/root", "/root/akasha/one", "held.ts")).toBe("akasha/one/held.ts")
  expect(underAkasha("/root", "/root", "elsewhere/held.ts")).toBeNull()
  expect(underAkasha("/root", "/root", "/root/akasha/held.ts")).toBe("akasha/held.ts")
})

test("a sidecar is found by the name it stands under, not by what the page states", () => {
  const root = repoWith({
    "akasha/one/held.module.ts": PAGE,
    "akasha/one/held.module.code.ts": OTHER,
    "akasha/one/held.module.test.ts": OTHER,
    "akasha/one/held.module.notes.ts": OTHER,
    "akasha/one/heldover.module.ts": OTHER,
  })
  expect(besideOf(root, "akasha/one/held.module.ts")).toEqual([
    "akasha/one/held.module.code.ts",
    "akasha/one/held.module.test.ts",
  ])
  rmSync(root, { recursive: true })
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
