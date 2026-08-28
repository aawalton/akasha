import { expect, test } from "bun:test"
import { addressIn, pathIn, repoOf } from "./address.ts"

test("an address is the repository, a colon, and the path inside it", () => {
  expect(addressIn("akasha", "pages/domain/global.domain.md")).toBe(
    "akasha:pages/domain/global.domain.md"
  )
})

test("an address is read back into the two halves it was spelled from", () => {
  const at = addressIn("akasha", "pages/domain/global.domain.md")
  expect(repoOf(at)).toBe("akasha")
  expect(pathIn(at)).toBe("pages/domain/global.domain.md")
})

test("a path carrying a colon keeps every colon after the first", () => {
  const at = addressIn("akasha", "pages/odd/a:b.domain.md")
  expect(repoOf(at)).toBe("akasha")
  expect(pathIn(at)).toBe("pages/odd/a:b.domain.md")
})

test("a bare path names no repository and points nowhere", () => {
  expect(repoOf("pages/domain/global.domain.md")).toBe(null)
  expect(pathIn("pages/domain/global.domain.md")).toBe(null)
})

test("a colon with nothing before it names no repository", () => {
  expect(repoOf(":pages/domain/global.domain.md")).toBe(null)
  expect(pathIn(":pages/domain/global.domain.md")).toBe(null)
})

test("a repository with nothing after the colon points at no page", () => {
  expect(pathIn("akasha:")).toBe(null)
})

test("nothing at all is not an address", () => {
  expect(repoOf("")).toBe(null)
  expect(pathIn("")).toBe(null)
})

test("two repositories holding the same path answer two addresses", () => {
  const one = addressIn("akasha", "pages/domain/global.domain.md")
  const other = addressIn("code-editor", "pages/domain/global.domain.md")
  expect(one).not.toBe(other)
  expect(repoOf(one)).toBe("akasha")
  expect(repoOf(other)).toBe("code-editor")
})
