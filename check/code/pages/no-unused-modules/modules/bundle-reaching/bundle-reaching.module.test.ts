import { afterAll, expect, test } from "bun:test"
import {
  entriesIn,
  filesReached,
} from "akasha/check/code/pages/no-unused-modules/modules/bundle-reaching/bundle-reaching.module.code.ts"
import {
  change,
  claiming,
  shadowed,
  wrote,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ADDON_AT = "akasha/pages/held-addon/held-addon.temper-addon.ts"

const ENTRY_PAGE_AT = "akasha/modules/held-entry/held-entry.module.ts"

const ENTRY_AT = "akasha/modules/held-entry/held-entry.module.code.ts"

const PART_AT = "akasha/modules/held-part/held-part.module.code.ts"

const APART_AT = "akasha/modules/held-apart/held-apart.module.code.ts"

const ADDON_TEXT =
  'export const heldAddon = { id: "01a0c660-9eed-7006-8000-000000000001",' +
  ' pageTypeSlug: "temper-addon", slug: "held-addon", bundleEntry: "module/held-entry" }\n'

const ENTRY_TEXT = 'import "../held-part/held-part.module.code.ts"\n\nexport const heldEntry = 1\n'

function rooted(): string {
  const root = scratch.rootFor("akasha-bundle-reaching-")
  wrote(root, {
    [ADDON_AT]: ADDON_TEXT,
    [ENTRY_AT]: ENTRY_TEXT,
    [PART_AT]: "export const heldPart = 2\n",
    [APART_AT]: "export const heldApart = 3\n",
  })
  claiming(root, ADDON_AT, "01a0c660-9eed-7006-8000-000000000001")
  claiming(root, ENTRY_PAGE_AT, "01a0c660-9eed-7006-8000-000000000002")
  return root
}

test("an addon page names the code of the module its bundle starts from", () => {
  const root = rooted()
  const over = change(root, [ENTRY_AT])

  expect(entriesIn(shadowed(over))).toEqual([ENTRY_AT])
})

test("a page naming no entry point names no code", () => {
  const root = scratch.rootFor("akasha-bundle-reaching-bare-")
  wrote(root, { [APART_AT]: "export const heldApart = 3\n" })
  const over = change(root, [APART_AT])

  expect(entriesIn(shadowed(over))).toEqual([])
})

test("an entry point reaches the file that entry point loads", () => {
  const root = rooted()
  const over = change(root, [ENTRY_AT])
  const found = filesReached(over, shadowed(over), [ENTRY_AT])

  expect(found.has(ENTRY_AT)).toBe(true)
  expect(found.has(PART_AT)).toBe(true)
})

test("an entry point reaches no file it never loads", () => {
  const root = rooted()
  const over = change(root, [ENTRY_AT])

  expect(filesReached(over, shadowed(over), [ENTRY_AT]).has(APART_AT)).toBe(false)
})

test("a run with no entry point reaches nothing", () => {
  const root = rooted()
  const over = change(root, [ENTRY_AT])

  expect(filesReached(over, shadowed(over), []).size).toBe(0)
})
