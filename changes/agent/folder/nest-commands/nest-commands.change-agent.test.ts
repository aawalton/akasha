import { afterAll, expect, test } from "bun:test"
import { indexedRepo, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { type World, worldAt } from "../../../modules/shadow/change-shadow.module.code.ts"
import {
  folderFor,
  folderUnder,
  heldBy,
  namedUnder,
  nestCommands,
  runChange,
} from "./nest-commands.change-agent.code.ts"

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

test("a namespace under another is named its slug with the namespace above it taken off", () => {
  expect(folderFor(SLUGS, "temper-inventory")).toBe("commands/pages/temper/inventory")
  expect(folderFor(SLUGS, "temper-inventory-rule")).toBe("commands/pages/temper/inventory/rule")
})

test("a command is carried into a folder its namespace's slug opens no more", () => {
  const folder = folderFor(SLUGS, "temper-inventory")

  expect(folderUnder(folder, "temper-inventory", "temper-inventory-snapshot")).toBe(
    "commands/pages/temper/inventory/snapshot"
  )
  expect(folderUnder(folder, "temper-inventory", "temper-inventory-clean-up")).toBe(
    "commands/pages/temper/inventory/clean-up"
  )
})

test("a command under a top namespace is named its slug with that namespace taken off", () => {
  expect(folderUnder(folderFor(SLUGS, "temper"), "temper", "temper-upstream-pull")).toBe(
    "commands/pages/temper/upstream-pull"
  )
})

test("a slug under no namespace keeps every word of that slug", () => {
  expect(namedUnder("temper", null)).toBe("temper")
  expect(namedUnder("change", "temper")).toBe("change")
})

test("a slug the namespace above it would leave nothing of keeps every word", () => {
  expect(namedUnder("temper-", "temper")).toBe("temper-")
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
