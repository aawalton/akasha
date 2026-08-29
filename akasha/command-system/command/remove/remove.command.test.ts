import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { expect, test } from "bun:test"
import type { Given } from "../../calling.module.code.ts"
import { emptiedBy, namedIn, remove, underAkasha } from "./remove.command.code.ts"

function git(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], { encoding: "utf8" })
}

function repoWith(named: Readonly<Record<string, string>>): string {
  const root = mkdtempSync(join(tmpdir(), "akasha-remove-"))
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
  return { root, calledAs: "akasha remove", from: root, writer: null }
}

const BODY = `export const held = 1\n`

const REFUSES_PAGE = `export const refuses = {
  id: "01a04bed-1461-7000-8000-00000000bbbb",
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
    `${JSON.stringify({ path: at, id: "01a04bed-1461-7000-8000-00000000bbbb" })}\n`
  )
}

test("named paths are taken away and the removal is committed", () => {
  const root = repoWith({ "akasha/one/held.module.ts": BODY, "akasha/one/kept.module.ts": BODY })
  const said = remove(["akasha/one/held.module.ts"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(existsSync(join(root, "akasha/one/held.module.ts"))).toBe(false)
  expect(git(root, ["ls-files"]).trim()).toBe("akasha/one/kept.module.ts")
  rmSync(root, { recursive: true })
})

test("a path that is not there is refused, and nothing else is taken", () => {
  const root = repoWith({ "akasha/one/held.module.ts": BODY })
  const was = git(root, ["rev-parse", "HEAD"]).trim()
  const said = remove(["akasha/one/held.module.ts", "akasha/one/nowhere.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("is not there")
  expect(existsSync(join(root, "akasha/one/held.module.ts"))).toBe(true)
  expect(git(root, ["rev-parse", "HEAD"]).trim()).toBe(was)
  rmSync(root, { recursive: true })
})

test("a directory opens onto every tracked file under it", () => {
  const root = repoWith({
    "akasha/one/held.module.ts": BODY,
    "akasha/one/deep/under.module.ts": BODY,
    "akasha/two/kept.module.ts": BODY,
  })
  const said = remove(["akasha/one"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(git(root, ["ls-files"]).trim()).toBe("akasha/two/kept.module.ts")
  expect(said.report.join("\n")).toContain("stood under a directory you named")
  rmSync(root, { recursive: true })
})

test("a directory holding no tracked file is refused", () => {
  const root = repoWith({ "akasha/one/held.module.ts": BODY })
  mkdirSync(join(root, "akasha/empty"), { recursive: true })
  const said = remove(["akasha/empty"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("git holds no file under")
  expect(existsSync(join(root, "akasha/empty"))).toBe(true)
  rmSync(root, { recursive: true })
})

test("a page's sidecars go with it without being named", () => {
  const root = repoWith({
    "akasha/one/held.module.ts": BODY,
    "akasha/one/held.module.code.ts": BODY,
    "akasha/one/held.module.test.ts": BODY,
    "akasha/one/kept.module.ts": BODY,
  })
  const said = remove(["akasha/one/held.module.ts"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(existsSync(join(root, "akasha/one/held.module.code.ts"))).toBe(false)
  expect(existsSync(join(root, "akasha/one/held.module.test.ts"))).toBe(false)
  expect(said.report.join("\n")).toContain("stood beside what you named")
  expect(git(root, ["ls-files"]).trim()).toBe("akasha/one/kept.module.ts")
  rmSync(root, { recursive: true })
})

test("a directory the removal leaves empty goes with it", () => {
  const root = repoWith({
    "akasha/one/deep/held.module.ts": BODY,
    "akasha/two/kept.module.ts": BODY,
  })
  const said = remove(["akasha/one/deep/held.module.ts"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(existsSync(join(root, "akasha/one/deep"))).toBe(false)
  expect(existsSync(join(root, "akasha/one"))).toBe(false)
  expect(existsSync(join(root, "akasha"))).toBe(true)
  expect(said.report.join("\n")).toContain("git holds no empty directory")
  rmSync(root, { recursive: true })
})

test("a refused removal leaves nothing behind, and takes none of the paths it could have taken", () => {
  const root = repoWith({
    "akasha/one/held.module.ts": BODY,
    "akasha/one/held.module.code.ts": BODY,
  })
  mkdirSync(join(root, "akasha/empty"), { recursive: true })
  const was = git(root, ["rev-parse", "HEAD"]).trim()
  const said = remove(["akasha/one/held.module.ts", "akasha/empty"], givenIn(root))
  expect(said.code).toBe(1)
  expect(existsSync(join(root, "akasha/one/held.module.ts"))).toBe(true)
  expect(existsSync(join(root, "akasha/one/held.module.code.ts"))).toBe(true)
  expect(existsSync(join(root, "akasha/empty"))).toBe(true)
  expect(git(root, ["rev-parse", "HEAD"]).trim()).toBe(was)
  rmSync(root, { recursive: true })
})

test("a removal is judged by no check, a check being never handed a deletion", () => {
  const root = repoWith({ "akasha/one/held.module.ts": BODY })
  refusing(root)
  const said = remove(["akasha/one/held.module.ts"], givenIn(root))
  expect(said.code).toBe(0)
  expect(existsSync(join(root, "akasha/one/held.module.ts"))).toBe(false)
  rmSync(root, { recursive: true })
})

test("a path standing outside the akasha folder is refused", () => {
  const root = repoWith({ "elsewhere/held.ts": BODY })
  const said = remove(["elsewhere/held.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stands outside")
  expect(existsSync(join(root, "elsewhere/held.ts"))).toBe(true)
  rmSync(root, { recursive: true })
})

test("a path named more than once is refused rather than taken twice", () => {
  const root = repoWith({ "akasha/one/held.module.ts": BODY })
  const said = remove(["akasha/one/held.module.ts", "akasha/one/held.module.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("named more than once")
  rmSync(root, { recursive: true })
})

test("naming no path is refused rather than committed empty", () => {
  const root = repoWith({ "akasha/one/held.module.ts": BODY })
  const said = remove([], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("name at least one path")
  rmSync(root, { recursive: true })
})

test("a flag the removal does not take is refused rather than read as a path", () => {
  const said = namedIn(["--dry-run", "akasha/one/held.module.ts"])
  expect("refused" in said).toBe(true)
  expect("refused" in said ? said.refused : "").toContain("is not a flag this takes")
})

test("the directories a removal could empty stop at the akasha folder", () => {
  expect(emptiedBy(["akasha/one/deep/held.ts"])).toEqual(["akasha/one/deep", "akasha/one"])
  expect(emptiedBy(["akasha/held.ts"])).toEqual([])
})

test("a path is read against the folder the call ran in", () => {
  expect(underAkasha("/root", "/root/akasha/one", "held.ts")).toBe("akasha/one/held.ts")
  expect(underAkasha("/root", "/root", "elsewhere/held.ts")).toBeNull()
})
