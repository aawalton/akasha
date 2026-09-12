import { expect, test } from "bun:test"
import { parsed } from "akasha/checks/code-checks/pages/no-refused-syntax/no-refused-syntax.code-check.decision.test-fixtures.ts"
import { noSecondExitCode } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/no-second-exit-code/no-second-exit-code.syntax-rule.code.ts"

test("a file declaring no exit code is refused nothing", () => {
  expect(noSecondExitCode(parsed("export const one = 1\n"))).toEqual([])
})

test("an exit code declared again is refused", () => {
  const said = noSecondExitCode(parsed("const OPERATIONAL = 3\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("OPERATIONAL")
})

test("each of the five is refused", () => {
  const text =
    "const OK = 0\nconst INPUT = 1\nconst DATA = 2\nconst OPERATIONAL = 3\nconst UNCLASSIFIED = 70\n"
  expect(noSecondExitCode(parsed(text))).toHaveLength(5)
})

test("an exported declaration is refused as a private one is", () => {
  expect(noSecondExitCode(parsed("export const DATA = 2\n"))).toHaveLength(1)
})

test("one of those names holding another number is left", () => {
  expect(noSecondExitCode(parsed("const OK = 200\n"))).toEqual([])
})

test("one of those numbers under another name is left", () => {
  expect(noSecondExitCode(parsed("const FIRST = 1\n"))).toEqual([])
})

test("a name read from the page that declares it is left", () => {
  expect(noSecondExitCode(parsed("export const OK = EXIT.OK\n"))).toEqual([])
})

test("a declaration inside a function is refused too", () => {
  expect(noSecondExitCode(parsed("function one() {\n  const DATA = 2\n}\n"))).toHaveLength(1)
})

test("the line named is the line the declaration is on", () => {
  const said = noSecondExitCode(parsed("const one = 1\nconst DATA = 2\n"))
  expect(said[0]?.line).toBe(2)
})
