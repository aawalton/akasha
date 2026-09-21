import { expect, test } from "bun:test"
import { mayRead } from "akasha/alan/harness/web-page-answer/.server/reader-access/reader-access.module.code.ts"

test("a signed-in reader reads every page type for now", async () => {
  expect(await mayRead({ contributor: "one" }, "world-skill")).toBe(true)
  expect(await mayRead({ contributor: "one" }, "person")).toBe(true)
})
