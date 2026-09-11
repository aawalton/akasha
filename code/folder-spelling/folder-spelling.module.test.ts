import { expect, test } from "bun:test"
import { landedAt, namedBy } from "akasha/code/folder-spelling/folder-spelling.module.code.ts"

const FOLDER = "code-system"

const UNDER_IT = "code-system/router-apps/one.module.code.ts"

const DEEP = "deep/one"

test("a string with no separator is a name rather than a path naming a folder", () => {
  expect(namedBy(FOLDER, [FOLDER])).toBeNull()
})

test("a string equal to a folder names that folder", () => {
  expect(namedBy(DEEP, [DEEP])).toBe(DEEP)
})

test("a string carrying on from a folder at a separator names that folder", () => {
  expect(namedBy(UNDER_IT, [FOLDER])).toBe(FOLDER)
})

test("a string opening with a folder's letters but not at a separator names no folder", () => {
  expect(namedBy("code-systems/one.ts", [FOLDER])).toBeNull()
})

test("the first folder named of the folders handed in is the folder answered", () => {
  expect(namedBy(UNDER_IT, ["nothing", FOLDER, "code-system/router-apps"])).toBe(FOLDER)
})

test("a string naming none of the folders handed in names no folder", () => {
  expect(namedBy("checks/one.ts", [FOLDER, DEEP])).toBeNull()
})

test("a string naming a folder that moved lands under the folder that folder moved to", () => {
  expect(landedAt(UNDER_IT, FOLDER, "code")).toBe("code/router-apps/one.module.code.ts")
})

test("what the string spells after that folder is kept as the string spells it", () => {
  expect(landedAt("code-system/a/b/c/d.ts", FOLDER, "held/deep")).toBe("held/deep/a/b/c/d.ts")
})

test("a string equal to the folder that moved lands at the folder that folder moved to", () => {
  expect(landedAt("deep/one/two", DEEP, "code")).toBe("code/two")
  expect(landedAt(DEEP, DEEP, "code")).toBe("code")
})

test("a string naming no folder that moved lands nowhere", () => {
  expect(landedAt("checks/one.ts", FOLDER, "code")).toBeNull()
  expect(landedAt("code-systems/one.ts", FOLDER, "code")).toBeNull()
  expect(landedAt(FOLDER, FOLDER, "code")).toBeNull()
})
