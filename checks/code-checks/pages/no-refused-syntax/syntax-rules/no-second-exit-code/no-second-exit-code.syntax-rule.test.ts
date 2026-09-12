import { expect, test } from "bun:test"
import { parsed } from "akasha/checks/code-checks/pages/no-refused-syntax/no-refused-syntax.code-check.decision.test-fixtures.ts"
import { noSecondExitCode } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/no-second-exit-code/no-second-exit-code.syntax-rule.code.ts"

const BUILT = 'const one = { report: [], refusals: ["why"], code: 3 }\n'

const WHERE_IT_IS_BUILT = "akasha/commands/modules/refusing/probe.module.code.ts"

const WHERE_THE_ANSWER_IS_BUILT = "akasha/commands/modules/calling/probe.module.code.ts"

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

test("a refusal whose code is a number rather than a name is refused", () => {
  const said = noSecondExitCode(parsed(BUILT))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("OPERATIONAL")
})

test("a refusal naming its code is left", () => {
  expect(
    noSecondExitCode(parsed('const one = { report: [], refusals: ["why"], code: DATA }\n'))
  ).toEqual([])
})

test("a number on a code beside no refusals is left", () => {
  expect(noSecondExitCode(parsed('const one = { code: 1, out: "" }\n'))).toEqual([])
})

test("an answer whose list of refusals is empty is left", () => {
  expect(noSecondExitCode(parsed("const one = { report: done, refusals: [], code: 0 }\n"))).toEqual(
    []
  )
})

test("a list of refusals no literal spells is read as carrying them", () => {
  const said = noSecondExitCode(parsed("const one = { report: [], refusals, code: 1 }\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("INPUT")
})

test("a number that is no exit code is left alone there too", () => {
  expect(noSecondExitCode(parsed('const one = { refusals: ["why"], code: 7 }\n'))).toEqual([])
})

test("the module building a command's refusal spells the number", () => {
  expect(noSecondExitCode(parsed(BUILT, WHERE_IT_IS_BUILT))).toEqual([])
})

test("the line named is the line the code sits on", () => {
  const said = noSecondExitCode(parsed('const one = {\n  refusals: ["why"],\n  code: 2,\n}\n'))
  expect(said[0]?.line).toBe(3)
})

test("a refusal handed its code as a number is refused", () => {
  const said = noSecondExitCode(parsed("const one = refusedBy(read.refused, 1)\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("INPUT")
})

test("a refusal handed its code by name is left", () => {
  expect(noSecondExitCode(parsed("const one = refusedBy(read.refused, INPUT)\n"))).toEqual([])
})

test("a refusal built one reason at a time is refused too", () => {
  const said = noSecondExitCode(parsed('const one = refused("nothing followed it", 2)\n'))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("DATA")
})

test("an answer carrying refusals and a number is refused", () => {
  const said = noSecondExitCode(parsed("const one = answeredWith([], read.refused, 3)\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("OPERATIONAL")
})

test("an answer carrying no refusals is left", () => {
  expect(noSecondExitCode(parsed("const one = answeredWith(done, [], 0)\n"))).toEqual([])
})

test("a builder of that name handed a reason alone is left", () => {
  expect(noSecondExitCode(parsed('const one = refusedBy("no page was read")\n'))).toEqual([])
})

test("a builder of that name handed no number is left", () => {
  expect(noSecondExitCode(parsed("const one = refused(payload, what)\n"))).toEqual([])
})

test("a call by another name ending in a number is left", () => {
  expect(noSecondExitCode(parsed("const one = costRecorded(root, path, before, 0)\n"))).toEqual([])
})

test("a number that is no exit code is left where a call hands it too", () => {
  expect(noSecondExitCode(parsed('const one = refused("why", 7)\n'))).toEqual([])
})

test("a call handed more than that name takes is left", () => {
  expect(noSecondExitCode(parsed("const one = answeredWith(a, b, c, 1)\n"))).toEqual([])
})

test("the module building the answer hands the number its test reads", () => {
  const text = 'const one = answeredWith([], ["why"], 1)\n'
  expect(noSecondExitCode(parsed(text, WHERE_THE_ANSWER_IS_BUILT))).toEqual([])
})

test("a number inside an expression is not judged", () => {
  const text = "const one = answeredWith([], said.refused, said.code ?? 1)\n"
  expect(noSecondExitCode(parsed(text))).toEqual([])
})

test("the line named is the line the number handed sits on", () => {
  const text = "const one = answeredWith(\n  [],\n  read.refused,\n  1\n)\n"
  expect(noSecondExitCode(parsed(text))[0]?.line).toBe(4)
})
