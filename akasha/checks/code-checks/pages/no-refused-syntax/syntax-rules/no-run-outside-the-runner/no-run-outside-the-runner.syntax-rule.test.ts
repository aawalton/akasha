import { expect, test } from "bun:test"
import { parsedAs } from "@akasha/code-system/code-source"
import { parsed } from "../../no-refused-syntax.code-check.test-fixtures.ts"
import { noRunOutsideTheRunner } from "./no-run-outside-the-runner.syntax-rule.code.ts"

const TAKEN = 'import { execFileSync } from "node:child_process"\n'

test("a file running nothing is refused nothing", () => {
  expect(noRunOutsideTheRunner(parsed("export const one = 1\n"))).toEqual([])
})

test("execFileSync taken from node's child process and called is refused", () => {
  const said = noRunOutsideTheRunner(parsed(TAKEN + 'execFileSync("git", ["status"])\n'))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("execFileSync")
})

test("spawnSync taken from node's child process and called is refused", () => {
  const text = 'import { spawnSync } from "node:child_process"\nspawnSync("git", ["status"])\n'
  expect(noRunOutsideTheRunner(parsed(text))).toHaveLength(1)
})

test("execSync taken from node's child process and called is refused", () => {
  const text = 'import { execSync } from "node:child_process"\nexecSync("git status")\n'
  expect(noRunOutsideTheRunner(parsed(text))).toHaveLength(1)
})

test("Bun.spawnSync is refused wherever it is reached", () => {
  const said = noRunOutsideTheRunner(parsed('Bun.spawnSync(["git", "status"])\n'))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("Bun.spawnSync")
})

test("a name reached through a namespace taken from node's child process is refused", () => {
  const text = 'import * as cp from "node:child_process"\ncp.execFileSync("git", ["status"])\n'
  const said = noRunOutsideTheRunner(parsed(text))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("cp.execFileSync")
})

test("a renamed name taken from node's child process is refused", () => {
  const text =
    'import { execFileSync as runIt } from "node:child_process"\nrunIt("git", ["status"])\n'
  const said = noRunOutsideTheRunner(parsed(text))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("runIt")
})

test("the line named is the line the call is on", () => {
  const text = TAKEN + "const one = 1\nexecFileSync(argv)\n"
  expect(noRunOutsideTheRunner(parsed(text))[0]?.line).toBe(3)
})

test("the reason names what to do instead", () => {
  const said = noRunOutsideTheRunner(parsed("Bun.spawnSync(argv)\n"))
  expect(said[0]?.reason).toContain("@akasha/utils-run/running")
})

test("a regular expression's own exec is permitted", () => {
  const text = "const NAMED = /^one$/\nexport const hit = NAMED.exec(path)\n"
  expect(noRunOutsideTheRunner(parsed(text))).toEqual([])
})

test("Bun.spawn is permitted", () => {
  expect(noRunOutsideTheRunner(parsed('Bun.spawn(["git", "status"])\n'))).toEqual([])
})

test("spawn taken from node's child process is permitted", () => {
  const text = 'import { spawn } from "node:child_process"\nconst kid = spawn("ssh", args)\n'
  expect(noRunOutsideTheRunner(parsed(text))).toEqual([])
})

test("Bun.which is permitted", () => {
  expect(noRunOutsideTheRunner(parsed("Bun.which(TOOL)\n"))).toEqual([])
})

test("a file in the runner's own folder is refused nothing", () => {
  const at = "akasha/utils-run/running/running.module.code.ts"
  const text = 'import { spawnSync } from "node:child_process"\nspawnSync(argv)\n'
  expect(noRunOutsideTheRunner({ path: at, source: parsedAs(at, text) })).toEqual([])
})

test("execFileSync taken from anywhere else is permitted", () => {
  const text = 'import { execFileSync } from "./one.module.code.ts"\nexecFileSync(argv)\n'
  expect(noRunOutsideTheRunner(parsed(text))).toEqual([])
})
