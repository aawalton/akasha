import { afterAll, expect, test } from "bun:test"
import { noPathsFiled, valueAlsoFiled } from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages/change"
import { type Shadow, shadowFor } from "@akasha/pages/shadow"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { filing } from "../../../modules/scratch/check-scratch.module.code.ts"
import {
  askingIn,
  heldAddonNamesARosterAddon,
  touches,
} from "./held-addon-names-a-roster-addon.code-check.code.ts"
import { ADDON } from "./held-addon-names-a-roster-addon.code-check.decision.code.ts"

const ADDON_PAGE = "akasha/lib-async.eso-addon.ts"

const MANIFEST_AT = "akasha/lib-async.eso-addon.addon-manifest.json"

const HELD_PAGE = "akasha/held.held-addon.ts"

const ADDON_ID = "01a0824c-b5c0-7a41-8000-000000000001"

const HELD_ID = "01a0824c-b5c0-7a41-8000-000000000002"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-held-addon-")
  noPathsFiled(root)
  filing(root, ADDON, "lib-async", ADDON_ID)
  filing(root, "held-addon", "held", HELD_ID)
  valueAlsoFiled(root, ADDON, [
    { path: ADDON_PAGE, value: { id: ADDON_ID, pageTypeSlug: ADDON, slug: "lib-async" } },
  ])
  return root
}

function arriving(root: string, bodies: Readonly<Record<string, string>>): Change {
  const encoder = new TextEncoder()
  const at = (path: string): Uint8Array | null => {
    const said = bodies[path]
    return said === undefined ? null : encoder.encode(said)
  }
  return { root, changed: Object.keys(bodies), before: at, after: at }
}

function shadowed(change: Change): Shadow {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return cast.shadow
}

test("the check asks the index for the pages of a page type and where each page sits", () => {
  const root = rooted()
  const change = arriving(root, {})
  const asking = askingIn(change, shadowed(change))
  expect(asking.pathsOfType(ADDON)).toEqual([ADDON_PAGE])
  expect(asking.folderOf(ADDON, "lib-async")).toBe("akasha")
  expect(asking.folderOf(ADDON, "nowhere")).toBe(null)
})

test("the check reads a manifest as the change leaves the manifest", () => {
  const root = rooted()
  const change = arriving(root, { [MANIFEST_AT]: '{ "name": "LibAsync" }' })
  expect(askingIn(change, shadowed(change)).textAt(MANIFEST_AT)).toContain("LibAsync")
})

test("a manifest no change and no disk holds reads as nothing", () => {
  const root = rooted()
  const change = arriving(root, {})
  expect(askingIn(change, shadowed(change)).textAt(MANIFEST_AT)).toBe(null)
})

test("an index naming no held addon page judges clean whatever the change carries", () => {
  const root = scratch.rootFor("akasha-held-addon-bare-")
  noPathsFiled(root)
  const change = arriving(root, { [MANIFEST_AT]: '{ "name": "LibAsync" }' })
  expect(heldAddonNamesARosterAddon(change, shadowed(change))).toEqual([])
})

test("a held addon page, an addon page and the manifest beside it are input", () => {
  expect(touches(HELD_PAGE)).toBe(true)
  expect(touches(ADDON_PAGE)).toBe(true)
  expect(touches(MANIFEST_AT)).toBe(true)
})

test("a file naming neither page type is not input", () => {
  expect(touches("temper/temper-lib-async/package.json")).toBe(false)
  expect(touches("pages/shadow/shadow.module.code.ts")).toBe(false)
})
