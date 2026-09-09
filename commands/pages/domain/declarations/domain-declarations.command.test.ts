import { expect, test } from "bun:test"
import { readIn, SUBJECT } from "./domain-declarations.command.code.ts"
import { domainDeclarations } from "./domain-declarations.command.ts"

function refusedIn(argv: readonly string[]): string {
  const read = readIn(argv)
  return "refused" in read ? read.refused.join(" ") : ""
}

test("a call naming no subject is handed both", () => {
  const read = readIn([])
  expect("refused" in read ? [] : read.subjects).toEqual([])
})

test("a subject it names is read as it is said", () => {
  const read = readIn([SUBJECT, "personas"])
  expect("refused" in read ? [] : read.subjects).toEqual(["personas"])
})

test("a subject that is neither domains nor personas is refused", () => {
  expect(refusedIn([SUBJECT, "widgets"])).toContain("`widgets` is no subject")
})

test("a flag it does not take is refused by name", () => {
  expect(refusedIn(["--paths"])).toContain("`--paths` is no flag this takes")
})

test("a flag wanting a word and given none is refused", () => {
  expect(refusedIn([SUBJECT])).toContain("nothing followed it")
})

test("the page says it writes nothing and takes one flag", () => {
  expect(domainDeclarations.changeKind).toBe("change-none")
  expect(domainDeclarations.taking.map((one) => one.said)).toEqual([`${SUBJECT} <subject>`])
})
