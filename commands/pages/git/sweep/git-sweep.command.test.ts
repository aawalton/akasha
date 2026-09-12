import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { gitSweep } from "akasha/commands/pages/git/sweep/git-sweep.command.code.ts"
import { LEFT, STORES } from "akasha/files/git-place/git-place.module.code.ts"
import { git } from "akasha/git/capping/git-capping.module.code.ts"
import { gitDirIn } from "akasha/git/dir/git-dir.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const LEFT_AT = LEFT[0] ?? ""

const KEPT_AT = STORES[0] ?? ""

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repo(): string {
  const root = scratch.rootFor("akasha-git-sweep-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  writeFileSync(join(root, "one.ts"), "export const one = 1\n")
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  return root
}

function gitDir(root: string): string {
  const at = gitDirIn(root)
  if (at === null) throw new Error("git named no folder for a checkout it had just made")
  return at
}

function filled(root: string, at: string): string {
  const folder = join(gitDir(root), at)
  mkdirSync(folder, { recursive: true })
  writeFileSync(join(folder, "held.jsonl"), "{}\n")
  return folder
}

function givenIn(root: string): Given {
  return { root, calledAs: "akasha git sweep", from: root, writer: null, agentId: null }
}

test("a path akasha left is taken away", () => {
  const root = repo()
  const folder = filled(root, LEFT_AT)
  const said = gitSweep([], givenIn(root))
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report.join("\n")).toContain(`took\t${LEFT_AT}`)
  expect(existsSync(folder)).toBe(false)
})

test("a store akasha keeps is left alone", () => {
  const root = repo()
  const folder = filled(root, KEPT_AT)
  expect(gitSweep([], givenIn(root)).code).toBe(0)
  expect(existsSync(folder)).toBe(true)
})

test("a dry run says what would go and takes nothing", () => {
  const root = repo()
  const folder = filled(root, LEFT_AT)
  const said = gitSweep(["--dry-run"], givenIn(root))
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain(`would take\t${LEFT_AT}`)
  expect(existsSync(folder)).toBe(true)
})

test("a checkout with nothing left over says so", () => {
  const said = gitSweep([], givenIn(repo()))
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("nothing akasha left")
})

test("an argument that is not the dry run is refused, and nothing is taken", () => {
  const root = repo()
  const folder = filled(root, LEFT_AT)
  const said = gitSweep(["--all"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe(
    "`--all` is no argument `akasha git sweep` takes — it takes `--dry-run`"
  )
  expect(existsSync(folder)).toBe(true)
})

test("a path on the command line is refused rather than swept", () => {
  const root = repo()
  const said = gitSweep([KEPT_AT], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe(
    `\`${KEPT_AT}\` is no argument \`akasha git sweep\` takes — it takes \`--dry-run\``
  )
})

test("nothing is committed", () => {
  const root = repo()
  filled(root, LEFT_AT)
  const was = git(root, ["rev-parse", "HEAD"]).stdout
  expect(gitSweep([], givenIn(root)).code).toBe(0)
  expect(git(root, ["rev-parse", "HEAD"]).stdout).toBe(was)
  expect(git(root, ["status", "--porcelain"]).stdout).toBe("")
})
