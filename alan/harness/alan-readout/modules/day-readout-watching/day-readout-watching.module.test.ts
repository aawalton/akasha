import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import {
  dayFilesOf,
  dayReadouts,
  FOOD_ENTRY_PAGE_TYPE,
} from "akasha/alan/harness/alan-readout/modules/day-readout-watching/day-readout-watching.module.code.ts"
import { attributesReading } from "akasha/alan/harness/attribute/modules/attributes-reading/attributes-reading.module.ts"
import type { WatchedReadout } from "akasha/alan/harness/readout/modules/watching/readout-watching.module.code.ts"
import { readout } from "akasha/alan/harness/readout/readout.page-type.ts"
import { safetyReading } from "akasha/alan/harness/safety/modules/reading/safety-reading.module.ts"
import { DAY_PAGE_TYPE } from "akasha/alan/track/daily/modules/day-place/day-place.module.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/system/modules/scratching/scratching.module.test-fixtures.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const made = scratchWorld()

afterAll(() => made.sweep())

const DAY = "2026-09-25"

const ID = "01a0d9a0-0000-7000-8000-0000000000"

const ROUTER_APP = "router-app"

const SAFETY = "probe/readouts/probe-safety/probe-safety.readout.ts"

const STRENGTH = "probe/readouts/probe-strength/probe-strength.readout.ts"

const CHARISMA = "probe/readouts/probe-charisma/probe-charisma.readout.ts"

const CONSTITUTION = "probe/readouts/probe-constitution/probe-constitution.readout.ts"

const LUCK = "probe/readouts/probe-luck/probe-luck.readout.ts"

const HIS = "probe/his-web/his-web.router-app.ts"

const HERS = "probe/her-web/her-web.router-app.ts"

const OTHER_DAY = "alan/track/daily/day/pages/2026-09-24/day-2026-09-24.day.ts"

const FOOD = "alan/track/food-entry/pages/probe-food/probe-food.food-entry.ts"

const SAFETY_TAKER = namedAs(module.slug, safetyReading.slug, null)

const ATTRIBUTES_TAKER = namedAs(module.slug, attributesReading.slug, null)

const HIS_SITE = namedAs(ROUTER_APP, "his-web", null)

const HER_SITE = namedAs(ROUTER_APP, "her-web", null)

type Stated = Readonly<Record<string, string | readonly string[]>>

function said(values: Stated): string {
  return Object.entries(values)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join(", ")
}

function world(): string {
  const root = made.rootFor("day-readout-watching-")
  nothingFiled(root)
  let at = 10
  const filed = (pageTypeSlug: string, path: string, values: string): undefined => {
    writing(
      root,
      path,
      `export const it = { type: "${pageType.slug}/${pageTypeSlug}", ${values} }\n`
    )
    listedFiled(root, pageTypeSlug, path.split("/").at(-2) ?? "", [{ path, id: `${ID}${at}` }])
    at += 1
    return undefined
  }
  const site = (path: string, hostname: string): undefined =>
    filed(
      ROUTER_APP,
      path,
      `tunnelRoutes: [{ name: "site", hostname: "${hostname}" }, { name: "hook", hostname: "hook.${hostname}" }]`
    )
  site(HIS, "his.example")
  site(HERS, "her.example")
  filed(
    readout.slug,
    SAFETY,
    said({ servedBy: [SAFETY_TAKER], madeFrom: "open-block", carriedTo: [HIS_SITE, HER_SITE] })
  )
  filed(
    readout.slug,
    STRENGTH,
    said({ servedBy: [ATTRIBUTES_TAKER], madeFrom: "day-row", carriedTo: [HIS_SITE] })
  )
  filed(
    readout.slug,
    CHARISMA,
    said({ servedBy: [ATTRIBUTES_TAKER], madeFrom: "day-row-and-stretches", carriedTo: [HIS_SITE] })
  )
  filed(
    readout.slug,
    CONSTITUTION,
    said({
      servedBy: [ATTRIBUTES_TAKER],
      madeFrom: "day-row-and-food-entries",
      carriedTo: [HIS_SITE],
    })
  )
  filed(readout.slug, LUCK, said({ servedBy: [ATTRIBUTES_TAKER], carriedTo: [HIS_SITE] }))
  filed(DAY_PAGE_TYPE, OTHER_DAY, said({ slug: "2026-09-24" }))
  filed(FOOD_ENTRY_PAGE_TYPE, FOOD, said({ slug: "probe-food" }))
  return root
}

const ROOT = world()

const WATCHED = dayReadouts(ROOT, DAY)

const FILES = dayFilesOf(ROOT, DAY)

function watchedAt(page: string): WatchedReadout {
  const one = WATCHED.find((held) => held.page === page)
  if (one === undefined) throw new Error(`${page} is not watched`)
  return one
}

test("the readouts watched are those whose pages state which of the day's files they are made from", () => {
  expect(WATCHED.map((one) => one.page).sort()).toEqual(
    [CHARISMA, CONSTITUTION, SAFETY, STRENGTH].sort()
  )
})

test("a readout is carried to the first hostname of each site its page names, in the order named", () => {
  expect(watchedAt(SAFETY).to).toEqual(["https://his.example", "https://her.example"])
  expect(watchedAt(STRENGTH).to).toEqual(["https://his.example"])
})

test("a readout made from the open block moves with the stretches file alone", () => {
  const { holds, folders } = watchedAt(SAFETY)
  expect(holds(FILES.stretches)).toBe(true)
  expect(holds(FILES.row)).toBe(false)
  expect(holds(FILES.open)).toBe(false)
  expect(holds(join(ROOT, OTHER_DAY))).toBe(false)
  expect(folders).toEqual([FILES.folder])
})

test("a readout made from the day row moves with the day's two files and every other day's page", () => {
  const { holds } = watchedAt(STRENGTH)
  expect(holds(FILES.row)).toBe(true)
  expect(holds(FILES.open)).toBe(true)
  expect(holds(join(ROOT, OTHER_DAY))).toBe(true)
  expect(holds(FILES.stretches)).toBe(false)
  expect(holds(join(ROOT, FOOD))).toBe(false)
})

test("a readout made from the day row and the stretches moves with both", () => {
  const { holds } = watchedAt(CHARISMA)
  expect(holds(FILES.row)).toBe(true)
  expect(holds(FILES.stretches)).toBe(true)
  expect(holds(join(ROOT, OTHER_DAY))).toBe(true)
})

test("a readout made from the day row and the food entries moves with every food entry's page", () => {
  const { holds, folders } = watchedAt(CONSTITUTION)
  expect(holds(FILES.row)).toBe(true)
  expect(holds(join(ROOT, FOOD))).toBe(true)
  expect(holds(join(ROOT, OTHER_DAY))).toBe(false)
  expect(holds(FILES.stretches)).toBe(false)
  expect(folders).toContain(FILES.folder)
})
