import { expect, test } from "bun:test"
import { addedIn, foundIn, owedOf } from "./change-taboo-terms.context-warrant.code.ts"

test("what a change adds is the lines the body did not already hold", () => {
  expect(addedIn("one\ntwo", "one\ntwo\nthree")).toBe("three")
})

test("a body left standing adds nothing", () => {
  expect(addedIn("one\ntwo", "one\ntwo")).toBe("")
})

test("a file that stood nowhere adds the whole of itself", () => {
  expect(addedIn("", "one\ntwo")).toBe("one\ntwo")
})

test("a line moved rather than written is not added", () => {
  expect(addedIn("one\ntwo", "two\none")).toBe("")
})

test("a line written twice where it stood once is added once", () => {
  expect(addedIn("one", "one\none")).toBe("one")
})

test("a pattern finds its term whatever the case", () => {
  expect(foundIn("\\bestate\\b", "the Estate stands")).toBe(true)
})

test("a pattern narrowed against a false positive does not find it", () => {
  expect(foundIn("(?<!\\.)\\bslice\\b", "next.slice(two)")).toBe(false)
  expect(foundIn("(?<!\\.)\\bslice\\b", "one slice judged")).toBe(true)
})

test("a pattern that does not compile finds nothing", () => {
  expect(foundIn("(unclosed", "anything at all")).toBe(false)
})

test("what is owed names every sense and what stands instead", () => {
  const said = owedOf([
    { sense: "a gated command", instead: "command" },
    { sense: "anything that refuses", instead: "written plainly" },
  ])
  expect(said).toContain("a gated command — write command instead")
  expect(said).toContain("anything that refuses — write written plainly instead")
})
