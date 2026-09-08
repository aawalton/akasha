import { expect, test } from "bun:test"
import { toolRestrictions } from "./tool-access.module.code.ts"

test("no agent reaches Write or Edit", () => {
  const disallowed = toolRestrictions().disallowedTools
  expect(disallowed).toContain("Write")
  expect(disallowed).toContain("Edit")
})
