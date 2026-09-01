import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { driftBetween } from "./rebuilding.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

test("what stands in one and not the other is what drift names", () => {
  const one = scratch.rootFor("akasha-drift-")
  const two = scratch.rootFor("akasha-drift-")
  writeFileSync(join(one, "went"), "held")
  writeFileSync(join(one, "changed"), "was")
  writeFileSync(join(two, "changed"), "now")
  writeFileSync(join(two, "added"), "held")
  expect(driftBetween(one, two)).toEqual({
    added: ["added"],
    changed: ["changed"],
    went: ["went"],
  })
})

test("a directory that is not there differs in nothing from an empty one", () => {
  const one = scratch.rootFor("akasha-drift-")
  expect(driftBetween(join(one, "never"), one)).toEqual({ added: [], changed: [], went: [] })
})
