import { expect, test } from "bun:test"
import { fileProperty } from "./file-property.context-warrant.code.ts"

test("this warrant is not built, and names nothing", () => {
  expect(fileProperty()).toEqual([])
})
