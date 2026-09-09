import { expect, test } from "bun:test"
import { AT_DOMAIN, DESCENT, PATHS, readIn, UP } from "./domain-dag.command.code.ts"
import { domainDag } from "./domain-dag.command.ts"

function refusalsOf(argv: readonly string[]): readonly string[] {
  const read = readIn(argv)
  return "refused" in read ? read.refused : []
}

function wantedOf(argv: readonly string[]) {
  const read = readIn(argv)
  if ("refused" in read) throw new Error(`refused: ${read.refused.join("; ")}`)
  return read
}

test("a call naming nothing draws from the roots and states no flag", () => {
  const wanted = wantedOf([])
  expect(wanted.rooted).toEqual([])
  expect(wanted.above).toEqual([])
  expect(wanted.paths).toBe(false)
  expect(wanted.descent).toBe(false)
})

test("the two bare flags are read as they are said", () => {
  const wanted = wantedOf([PATHS, DESCENT])
  expect(wanted.paths).toBe(true)
  expect(wanted.descent).toBe(true)
})

test("a flag it does not take is refused by name", () => {
  expect(refusalsOf(["--nope"]).join(" ")).toContain("`--nope` is no flag this takes")
})

test("a word that is no flag at all is refused too", () => {
  expect(refusalsOf(["declarations"]).join(" ")).toContain("is no flag this takes")
})

test("a flag wanting a word and given none is refused", () => {
  expect(refusalsOf([AT_DOMAIN]).join(" ")).toContain("nothing followed it")
  expect(refusalsOf([UP, PATHS]).join(" ")).toContain("nothing followed it")
})

test("--domain and --up are each repeatable", () => {
  const wanted = wantedOf([AT_DOMAIN, "one", AT_DOMAIN, "two", UP, "three"])
  expect(wanted.rooted).toEqual(["one", "two"])
  expect(wanted.above).toEqual(["three"])
})

test("the page says it writes nothing and names the module it draws with", () => {
  expect(domainDag.changeKind).toBe("change-none")
  expect(domainDag.parts).toContain("module/domain-drawing")
})
