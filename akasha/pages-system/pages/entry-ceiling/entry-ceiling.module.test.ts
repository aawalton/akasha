import { expect, test } from "bun:test"
import { ENTRY_CEILING } from "./entry-ceiling.module.code.ts"

test("the ceiling is eight mebibytes", () => {
  expect(ENTRY_CEILING).toBe(8 * 1024 * 1024)
})
