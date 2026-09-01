import { expect, test } from "bun:test"
import { parsedAs } from "@akasha/code-system/code-source"
import { parsed } from "../../no-refused-syntax.code-check.test-fixtures.ts"
import { noAkashaCommandFromCode } from "./no-akasha-command-from-code.syntax-rule.code.ts"

test("a file launching nothing is refused nothing", () => {
  expect(noAkashaCommandFromCode(parsed("export const one = 1\n"))).toEqual([])
})

test("the command run by name is refused", () => {
  const said = noAkashaCommandFromCode(parsed('spawnSync("akasha", ["read"])\n'))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("akasha")
})

test("the command run by a path ending in its name is refused", () => {
  const text = 'spawnSync("/home/one/bin/akasha", ["read"])\n'
  expect(noAkashaCommandFromCode(parsed(text))).toHaveLength(1)
})

test("the dispatcher named straight in a launching call is refused", () => {
  const text = 'Bun.spawnSync([bun, "akasha/command-system/cli/cli.module.code.ts"])\n'
  expect(noAkashaCommandFromCode(parsed(text))).toHaveLength(1)
})

test("the dispatcher reached through a bound name and a join is refused", () => {
  const text =
    'const CLI = "akasha/command-system/cli/cli.module.code.ts"\n' +
    "Bun.spawnSync([process.execPath, join(root, CLI), ...args])\n"
  const said = noAkashaCommandFromCode(parsed(text))
  expect(said).toHaveLength(1)
  expect(said[0]?.line).toBe(2)
})

test("the dispatcher written as data and launched by nothing stands", () => {
  const text = 'const DISPATCHER = "akasha/command-system/cli/cli.module.code.ts"\n'
  expect(noAkashaCommandFromCode(parsed(text))).toEqual([])
})

test("the dispatcher handed to a path reader stands", () => {
  const text = 'expect(rootOf("/one/akasha/command-system/cli/cli.module.code.ts")).toBe("/one")\n'
  expect(noAkashaCommandFromCode(parsed(text))).toEqual([])
})

test("the command named in text shown to a reader stands", () => {
  const text = 'const READ_CALL = "akasha read --file-path"\n'
  expect(noAkashaCommandFromCode(parsed(text))).toEqual([])
})

test("the command's name argued to another program stands", () => {
  const text = 'spawnSync("git", ["clone", "akasha"])\n'
  expect(noAkashaCommandFromCode(parsed(text))).toEqual([])
})

test("a file standing in the dispatcher's own folder is refused nothing", () => {
  const at = "akasha/command-system/cli/cli.module.test.ts"
  const text = 'Bun.spawnSync([process.execPath, "akasha/command-system/cli/cli.module.code.ts"])\n'
  expect(noAkashaCommandFromCode({ path: at, source: parsedAs(at, text) })).toEqual([])
})

test("a program starting itself to outlive its caller stands", () => {
  const text = "Bun.spawn([process.execPath, import.meta.path, root, ...args])\n"
  expect(noAkashaCommandFromCode(parsed(text))).toEqual([])
})

test("the command run through the shell is refused", () => {
  expect(noAkashaCommandFromCode(parsed("$`akasha write --file-path one`\n"))).toHaveLength(1)
})

test("another program run through the shell stands", () => {
  expect(noAkashaCommandFromCode(parsed("$`git status`\n"))).toEqual([])
})

test("the line named is the line the call stands on", () => {
  const text = 'const one = 1\nconst two = 2\nspawnSync("akasha", [])\n'
  expect(noAkashaCommandFromCode(parsed(text))[0]?.line).toBe(3)
})

test("two such calls are refused once each", () => {
  const text = 'spawnSync("akasha", [])\nspawnSync("akasha", [])\n'
  expect(noAkashaCommandFromCode(parsed(text))).toHaveLength(2)
})

test("the reason carries what to do instead", () => {
  const said = noAkashaCommandFromCode(parsed('spawnSync("akasha", [])\n'))
  expect(said[0]?.reason).toContain("importing them")
})

test("a name built as the code runs is not seen", () => {
  const text = "spawnSync(bin + suffix, [])\n"
  expect(noAkashaCommandFromCode(parsed(text))).toEqual([])
})
