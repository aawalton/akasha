import { expect, test } from "bun:test"
import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import { rootAbove } from "./rooting.module.code.ts"

const MARK = "node_modules"

test("the folder holding node_modules is the root, however deep the walk starts", () => {
  const scratch = scratchWorld()
  const root = scratch.rootFor("akasha-rooting-")
  mkdirSync(join(root, MARK))
  const deep = join(root, "one/two/three")
  mkdirSync(deep, { recursive: true })
  expect(rootAbove(deep)).toBe(root)
  expect(rootAbove(root)).toBe(root)
  scratch.sweep()
})

test("a walk that reaches the top of the disk answers nothing", () => {
  expect(rootAbove("/")).toBeNull()
})
