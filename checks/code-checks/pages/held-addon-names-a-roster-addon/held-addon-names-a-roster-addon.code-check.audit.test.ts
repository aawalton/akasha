import { afterAll, expect, test } from "bun:test"
import { noPathsFiled, valueAlsoFiled } from "@akasha/indexes/testing"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { filing } from "../../../modules/scratch/check-scratch.module.code.ts"
import {
  askingAt,
  heldAddonNamesARosterAddon,
} from "./held-addon-names-a-roster-addon.code-check.audit.code.ts"

const ADDON = "eso-addon"

const ADDON_PAGE = "akasha/lib-late.eso-addon.ts"

const MANIFEST_AT = "akasha/lib-late.eso-addon.addon-manifest.json"

const HELD_PAGE = "akasha/late.held-addon.ts"

const ADDON_ID = "01a0824c-b5c0-7a41-8000-000000000003"

const HELD_ID = "01a0824c-b5c0-7a41-8000-000000000004"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function treed(names: string): string {
  const root = scratch.rootFor("akasha-held-addon-audit-")
  noPathsFiled(root)
  filing(root, ADDON, "lib-late", ADDON_ID)
  filing(root, "held-addon", "late", HELD_ID)
  valueAlsoFiled(root, ADDON, [
    {
      path: ADDON_PAGE,
      value: { id: ADDON_ID, pageTypeSlug: ADDON, slug: "lib-late", addonManifest: "json" },
    },
  ])
  valueAlsoFiled(root, "held-addon", [
    {
      path: HELD_PAGE,
      value: { id: HELD_ID, pageTypeSlug: "held-addon", addonName: names, esoAddon: "lib-late" },
    },
  ])
  writing(root, MANIFEST_AT, '{ "name": "LibLate" }')
  return root
}

test("an audit reads a manifest from the disk rather than from a change", () => {
  expect(askingAt(treed("LibLate")).textAt(MANIFEST_AT)).toContain("LibLate")
})

test("an audit lets through a page whose addon page sits where that addon is manifested", () => {
  expect(heldAddonNamesARosterAddon(treed("LibLate"))).toEqual([])
})

test("an audit refuses a page naming an addon no manifest in the tree calls", () => {
  const said = heldAddonNamesARosterAddon(treed("LibGone"))
  expect(said.map((one) => one.path)).toEqual([HELD_PAGE])
  expect(said[0]?.reason).toContain("stale")
})
