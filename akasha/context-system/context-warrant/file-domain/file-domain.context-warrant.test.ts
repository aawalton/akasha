import { expect, test } from "bun:test"
import { fileDomain } from "./file-domain.context-warrant.code.ts"

test("this warrant is not built, and names nothing", () => {
  expect(fileDomain()).toEqual([])
})
