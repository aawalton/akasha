import { afterAll, expect, test } from "bun:test"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperAddonList } from "akasha/commands/pages/temper/addon/list/temper-addon-list.command.code.ts"
import { valueAlsoFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { manifestFor } from "akasha/temper/commands/modules/addon-fixture-manifest/addon-fixture-manifest.module.test-fixtures.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const GIVEN: Given = {
  root: ".",
  calledAs: "akasha temper addon list",
  from: ".",
  writer: null,
  agentId: null,
}

const FLAT = "TemperFlat"
const NESTED = "TemperNested"
const NESTED_LEAF = "temper-nested-addon"
const NESTED_DIR = `akasha/temper/${NESTED_LEAF}`
const NESTED_PAGE = `${NESTED_DIR}/${NESTED_LEAF}.eso-addon.ts`

function fixtureFor(): string {
  const root = scratch.rootFor("temper-list-root-")
  writeFileSync(
    join(root, "package.json"),
    JSON.stringify({ name: "scratch", workspaces: ["akasha/temper/*"] })
  )

  const flat = join(root, "temper/addons", FLAT)
  mkdirSync(flat, { recursive: true })
  writeFileSync(join(flat, "addon.json"), manifestFor(FLAT))

  const nested = join(root, NESTED_DIR)
  mkdirSync(nested, { recursive: true })
  writeFileSync(join(nested, "addon.json"), manifestFor(NESTED))
  writeFileSync(
    join(nested, "package.json"),
    JSON.stringify({ name: `@akasha/${NESTED_LEAF}`, dependencies: {} })
  )
  valueAlsoFiled(root, "eso-addon", [{ path: NESTED_PAGE, value: { slug: NESTED_LEAF } }])
  return root
}

test("the flat layout and the nested layout are both named", () => {
  const root = fixtureFor()
  const said = temperAddonList(["--code-root", root], GIVEN)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  const whole = said.report.join("\n")
  expect(whole).toContain(FLAT)
  expect(whole).toContain(NESTED)
  expect(whole).toContain("2 addon(s)")
})

test("each addon is named beside the folder it was found in", () => {
  const root = fixtureFor()
  const said = temperAddonList(["--code-root", root], GIVEN)
  expect(said.report.join("\n")).toContain(NESTED_DIR)
  expect(said.report.join("\n")).toContain(`temper/addons/${FLAT}`)
})

test("the roster is read from the checkout named rather than from this one", () => {
  const root = fixtureFor()
  const said = temperAddonList(["--code-root", root], GIVEN)
  expect(said.report.join("\n")).not.toContain("TemperInventory")
  expect(said.report.join("\n")).toContain("2 addon(s)")
})

test("a checkout holding no addon is refused rather than reported empty", () => {
  const root = fixtureFor()
  rmSync(join(root, "temper/addons", FLAT), { recursive: true, force: true })
  rmSync(join(root, NESTED_DIR), { recursive: true, force: true })
  const said = temperAddonList(["--code-root", root], GIVEN)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("holds no addon folder")
})

test("the json answer parses and carries one record per addon", () => {
  const root = fixtureFor()
  const said = temperAddonList(["--code-root", root, "--json"], GIVEN)
  expect(said.code).toBe(0)
  const parsed = JSON.parse(said.report.join("\n")) as readonly { canonicalName: string }[]
  expect(parsed.length).toBe(2)
  expect(parsed.map((one) => one.canonicalName).sort()).toEqual([FLAT, NESTED])
})

test("the closure each addon reaches is counted rather than left off", () => {
  const root = fixtureFor()
  const said = temperAddonList(["--code-root", root], GIVEN)
  expect(said.report.join("\n")).toContain("closure=1")
})

test("a flag this takes no argument for is refused rather than passed over", () => {
  const root = fixtureFor()
  const said = temperAddonList(["--code-root", root, "--outdated"], GIVEN)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--outdated` is no argument")
})

test("a word this takes no argument for is refused rather than passed over", () => {
  const root = fixtureFor()
  const said = temperAddonList(["--code-root", root, "TemperFlat"], GIVEN)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`TemperFlat` is no argument")
})

test("the checkout said twice is refused rather than read as the first saying", () => {
  const root = fixtureFor()
  const said = temperAddonList(["--code-root", root, "--code-root", root], GIVEN)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--code-root` is said twice")
})

test("the checkout flag with nothing after it is refused rather than read as unsaid", () => {
  const said = temperAddonList(["--code-root"], GIVEN)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("takes a value, and none follows it")
})
