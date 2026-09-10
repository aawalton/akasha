import { expect, test } from "bun:test"
import { buildDirectoryAt } from "./build-directory.module.code.ts"

test("a build told no folder writes into the folder the pod serves", () => {
  expect(buildDirectoryAt({})).toBe("build")
})

test("a build told a folder writes into that folder", () => {
  expect(buildDirectoryAt({ BUILD_DIRECTORY: "build.next" })).toBe("build.next")
})

test("a folder named as nothing but blanks is no folder", () => {
  expect(buildDirectoryAt({ BUILD_DIRECTORY: "   " })).toBe("build")
})
