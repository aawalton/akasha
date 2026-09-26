import { describe, expect, test } from "bun:test"
import {
  type PageValue,
  placeKindsOf,
  setDataBody,
  setInfoBody,
  setPagesOf,
} from "akasha/temper/catalog/gear/temper-set/modules/set-tables-writing/set-tables-writing.module.code.ts"
import { warden } from "akasha/temper/catalog/skill/temper-class/pages/warden.temper-class.ts"
import { temperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.ts"

const WARDEN = `${temperClass.slug}/${warden.slug}`

const WARLOCK: PageValue = {
  esoSetId: 19,
  title: "Vestments of the Warlock",
  setNameDe: "Gewänder des Hexers",
  esoItemIds: [43529, 43803],
  esoArmorTypes: ["ARMORTYPE_LIGHT"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_NECK"],
  setTypeId: 6,
  setDlcId: 0,
  setDropMechanics: [28],
  setWayshrines: [185, 185, 185],
  setDropZones: [31, 382, 382],
  setVeteranEquipTypes: ["EQUIP_TYPE_HEAD"],
  setDropLocationNamesEn: ["Boss", ""],
  classId: WARDEN,
  itemBrowserItemId: 46177,
  itemBrowserSources: ["181:-203,-202", "3"],
}

const ZONES: readonly PageValue[] = [
  { esoZoneId: 181, itemBrowserPlaceKind: 3 },
  { esoZoneId: 3, itemBrowserPlaceKind: 1 },
  { esoZoneId: 19 },
]

const CRAFTED: PageValue = {
  esoSetId: 37,
  title: "Death's Wind",
  setTypeId: 3,
  setTraitsNeeded: 2,
  esoArmorTypes: ["ARMORTYPE_LIGHT", "ARMORTYPE_HEAVY"],
  esoEquipTypes: ["EQUIP_TYPE_CHEST"],
  itemBrowserItemId: 46563,
  itemBrowserKinds: ["multi-style"],
}

const PAGES = setPagesOf(
  new Map<string, PageValue>([
    ["b", WARLOCK],
    ["a", CRAFTED],
    ["c", { esoSetId: 0, title: "No Set" }],
  ])
)

describe("setInfoBody", () => {
  test("files each set stating a kind, with its veteran slots and class", () => {
    const body = setInfoBody(PAGES, new Map([[WARDEN, 4]]))
    expect(body).toContain(
      '  [19]: { dlcId: 0, dropMechanic: [28], dropMechanicDropLocationNames: { en: ["Boss", ""] }, setType: 6, classId: 4, veteran: { [EQUIP_TYPE_HEAD]: true }, wayshrines: [185, 185, 185], zoneIds: [31, 382, 382] },'
    )
    expect(body).toContain("[37]: { dlcId: 0, dropMechanic: [], setType: 3, traitsNeeded: 2,")
    expect(body).not.toContain("[0]:")
  })
})

describe("setDataBody", () => {
  test("names each set in every language and files it under its slots", () => {
    const body = setDataBody(PAGES, [124], placeKindsOf(ZONES))
    expect(body).toContain('[19]: { de: "Gewänder des Hexers", en: "Vestments of the Warlock" },')
    expect(body).toContain("[19]: [43529, 43803],")
    expect(body).toContain("[EQUIP_TYPE_NECK]: { [19]: 1 },")
    expect(body).toContain("[ARMORTYPE_LIGHT]: { [19]: 1, [37]: 1 },")
    expect(body).toContain("  setsWithJewelry: {\n    [19]: 1,\n  },")
    expect(body).toContain("  dungeonZoneIds: {\n    [181]: true,\n  },")
    expect(body).toContain("  publicDungeonZoneIds: {\n    [124]: true,\n  },")
  })
})

describe("placeKindsOf", () => {
  test("keys each zone page stating a kind by its zone id, and passes over one stating none", () => {
    expect([...placeKindsOf(ZONES)]).toEqual([
      [181, 3],
      [3, 1],
    ])
  })
})
