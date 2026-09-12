import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperAddonResolve } from "akasha/commands/pages/temper/addon/resolve/temper-addon-resolve.command.code.ts"
import { valueAlsoFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { manifestFor } from "akasha/temper/commands/modules/addon-fixture-manifest/addon-fixture-manifest.module.test-fixtures.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const GIVEN: Given = {
  root: ".",
  calledAs: "akasha temper addon resolve",
  from: ".",
  writer: null,
  agentId: null,
}

const NESTED = "TemperNested"
const NESTED_LEAF = "temper-nested-addon"
const NESTED_DIR = `akasha/temper/${NESTED_LEAF}`
const NESTED_PAGE = `${NESTED_DIR}/${NESTED_LEAF}.eso-addon.ts`

function fixtureFor(): string {
  const root = scratch.rootFor("temper-resolve-root-")
  writeFileSync(
    join(root, "package.json"),
    JSON.stringify({ name: "scratch", workspaces: ["akasha/temper/*"] })
  )
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

function reached(root: string, name: string): { canonicalName: string; dir: string } {
  const said = temperAddonResolve([name, "--code-root", root], GIVEN)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  return JSON.parse(said.report.join("\n")) as { canonicalName: string; dir: string }
}

test("a canonical name reaches the addon", () => {
  const root = fixtureFor()
  expect(reached(root, NESTED).canonicalName).toBe(NESTED)
})

test("the directory leaf reaches the same addon the canonical name does", () => {
  const root = fixtureFor()
  expect(reached(root, NESTED_LEAF).dir).toBe(reached(root, NESTED).dir)
})

test("the parent domain reaches the same addon the canonical name does", () => {
  const root = fixtureFor()
  expect(reached(root, "temper").dir).toBe(reached(root, NESTED).dir)
})

test("a name reaching no addon is refused by that name rather than answered", () => {
  const root = fixtureFor()
  const said = temperAddonResolve(["NotAnAddonHere", "--code-root", root], GIVEN)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("NotAnAddonHere")
  expect(said.refusals.join("\n")).toContain("reaches no addon")
})

test("naming no addon at all is refused", () => {
  const root = fixtureFor()
  const said = temperAddonResolve(["--code-root", root], GIVEN)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("takes `<name>`, and nothing said it")
})

test("two names in one call are refused rather than the first one resolved", () => {
  const root = fixtureFor()
  const said = temperAddonResolve([NESTED, NESTED_LEAF, "--code-root", root], GIVEN)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("takes 1 word and this call says 2")
})

test("a word opening with one dash is read as the name rather than passed over", () => {
  const root = fixtureFor()
  const said = temperAddonResolve(["-x", "--code-root", root], GIVEN)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("-x reaches no addon")
})

test("a flag this takes no argument for is refused rather than passed over", () => {
  const root = fixtureFor()
  const said = temperAddonResolve([NESTED, "--code-root", root, "--json"], GIVEN)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--json` is no argument")
})

test("the checkout named is the one resolved in", () => {
  const root = fixtureFor()
  expect(reached(root, NESTED).dir.startsWith(root)).toBe(true)
})
