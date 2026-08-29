import { expect, test } from "bun:test"
import { filePropertyFile } from "./file-property-file.context-warrant.code.ts"

test("this warrant is not built, and names nothing", () => {
  expect(filePropertyFile()).toEqual([])
})
