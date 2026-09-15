import { expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { keptAt } from "akasha/file/disk/test-fixtures/kept-scratch/kept-scratch.test-fixture.code.ts"

const PREFIX = "akasha-kept-scratch-"

test("a kept root is left as it was by the sweep of any world a test file holds", () => {
  const held = scratchWorld()
  held.rootFor(PREFIX)
  const root = keptAt(PREFIX)
  held.sweep()
  expect(existsSync(root)).toBe(true)
})

test("the kept world is swept by one handler the end of the process runs", () => {
  const root = keptAt(PREFIX)
  const swept = process.listeners("exit").filter((one) => one.name === "sweep")
  expect(swept.length).toBe(1)
  swept[0]?.(0)
  expect(existsSync(root)).toBe(false)
})
