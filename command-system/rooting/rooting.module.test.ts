import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { MARKED, rootOf } from "./rooting.module.code.ts"

const REFUSED = "is under no akasha folder"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function checkoutMade(): string {
  const root = scratch.rootFor("akasha-rooting-")
  writeFileSync(join(root, MARKED), "")
  return root
}

test("the folder holding the akasha domain page is itself the root, however deep the path runs", () => {
  const root = checkoutMade()
  mkdirSync(join(root, "command-system/cli"), { recursive: true })
  expect(rootOf(join(root, "command-system/cli.module.code.ts"))).toBe(root)
  expect(rootOf(join(root, "command-system/cli/cli.module.code.ts"))).toBe(root)
  expect(rootOf(root)).toBe(root)
})

test("the nearest marked folder wins, a checkout being able to sit inside another", () => {
  const outer = checkoutMade()
  const inner = join(outer, "held")
  mkdirSync(join(inner, "command-system"), { recursive: true })
  writeFileSync(join(inner, MARKED), "")
  expect(rootOf(join(inner, "command-system/cli.module.code.ts"))).toBe(inner)
})

test("a checkout answers wherever it is copied, its folder name saying nothing", () => {
  const root = scratch.rootFor("nothing-akasha-about-me-")
  writeFileSync(join(root, MARKED), "")
  mkdirSync(join(root, "command-system"), { recursive: true })
  expect(rootOf(join(root, "command-system/cli.module.code.ts"))).toBe(root)
})

test("a folder named akasha holding no domain page is no root", () => {
  const held = scratch.rootFor("akasha-rooting-")
  const under = join(held, "akasha/command-system")
  mkdirSync(under, { recursive: true })
  expect(() => rootOf(join(under, "cli.module.code.ts"))).toThrow(REFUSED)
})

test("a path outside every akasha folder is refused rather than answered", () => {
  expect(() => rootOf("/")).toThrow(REFUSED)
})
