import { expect, test } from "bun:test"
import { fileImport } from "./file-import.context-warrant.code.ts"

test("this warrant is not built, and names nothing", () => {
  expect(fileImport()).toEqual([])
})
