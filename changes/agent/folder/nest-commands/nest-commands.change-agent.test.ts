import { afterAll, expect, test } from "bun:test"
import { indexedRepo, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { type World, worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { folderFor, heldBy, nestCommands, runChange } from "./nest-commands.change-agent.code.ts"

afterAll(scratch.sweep)

const SLUGS = ["temper", "temper-inventory", "temper-inventory-rule", "change"]

function worldIn(): World {
  const root = indexedRepo({})
  return worldAt(root, textIn(root))
}

test("the namespace holding a command is the longest slug that command opens with", () => {
  expect(heldBy(SLUGS, "temper-inventory-rule-list")).toBe("temper-inventory-rule")
  expect(heldBy(SLUGS, "temper-inventory-snapshot")).toBe("temper-inventory")
  expect(heldBy(SLUGS, "temper-upstream-pull")).toBe("temper")
})

test("a slug equal to a namespace slug is held by that namespace no more than by another", () => {
  expect(heldBy(SLUGS, "change")).toBeNull()
  expect(heldBy(SLUGS, "temper")).toBeNull()
})

test("a namespace slug is a prefix only where a hyphen closes it", () => {
  expect(heldBy(SLUGS, "tempered-glass")).toBeNull()
  expect(heldBy(["email"], "emails-list")).toBeNull()
})

test("a slug no namespace slug opens is held by no namespace", () => {
  expect(heldBy(SLUGS, "apply")).toBeNull()
})

test("a namespace under no namespace is carried into the commands folder itself", () => {
  expect(folderFor(SLUGS, "temper")).toBe("commands/pages/temper")
  expect(folderFor(SLUGS, "change")).toBe("commands/pages/change")
})

test("a namespace under another is carried into the folder that namespace spells", () => {
  expect(folderFor(SLUGS, "temper-inventory")).toBe("commands/pages/temper/temper-inventory")
  expect(folderFor(SLUGS, "temper-inventory-rule")).toBe(
    "commands/pages/temper/temper-inventory/temper-inventory-rule"
  )
})

test("a namespace the index names no page for is refused", async () => {
  const said = await nestCommands(worldIn(), { namespace: "temper" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names no namespace/)
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const said = await runChange(worldIn(), {})

  expect(said.refused ?? "").toContain("`namespace`")
})
