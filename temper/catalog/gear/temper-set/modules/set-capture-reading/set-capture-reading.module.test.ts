import { describe, expect, test } from "bun:test"
import { addPropertyToPages } from "akasha/change/mechanical/file-content/add/add-property-to-pages/add-property-to-pages.change-mechanical-file-content.ts"
import { changePagePageProperty } from "akasha/change/mechanical/file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { removePropertyFromEveryPage } from "akasha/change/mechanical/page-type/remove/remove-property-from-every-page/remove-property-from-every-page.change-mechanical-page-type.ts"
import {
  namesByNumber,
  type SetCaptured,
  setsCapturedIn,
  setsWrittenOver,
} from "akasha/temper/catalog/gear/temper-set/modules/set-capture-reading/set-capture-reading.module.code.ts"

const RESTATE = `${changeMechanicalFileContent.slug}/${changePagePageProperty.slug}` as const

const PUT = `${changeMechanicalFileContent.slug}/${addPropertyToPages.slug}` as const

const TAKE_OFF = `${changeMechanicalPageType.slug}/${removePropertyFromEveryPage.slug}` as const

const WARLOCK_AT = "temper/catalog/gear/temper-set/pages/warlock/warlock.temper-set.ts"

const OTHER_AT = "temper/catalog/gear/temper-set/pages/other/other.temper-set.ts"

const CAPTURE = `TemperCatalog_SavedVariables =
{
    ["Default"] =
    {
        ["@alpha"] =
        {
            ["$AccountWide"] =
            {
                ["inventoryConstantsCatalog"] =
                {
                    ["armorTypes"] =
                    {
                        ["ARMORTYPE_NONE"] = 0,
                        ["ARMORTYPE_LIGHT"] = 1,
                        ["ARMORTYPE_HEAVY"] = 3,
                    },
                    ["equipTypes"] =
                    {
                        ["EQUIP_TYPE_INVALID"] = 0,
                        ["EQUIP_TYPE_HEAD"] = 1,
                        ["EQUIP_TYPE_ONE_HAND"] = 5,
                    },
                    ["weaponTypes"] =
                    {
                        ["WEAPONTYPE_NONE"] = 0,
                        ["WEAPONTYPE_AXE"] = 1,
                    },
                },
                ["itemSetCatalog"] =
                {
                    [19] =
                    {
                        ["name"] = "Vestments of the Warlock",
                        ["totalSlots"] = 3,
                        ["pieces"] =
                        {
                            [1] =
                            {
                                ["name"] = "Hat of the Warlock",
                                ["itemId"] = 43803,
                                ["armorType"] = 1,
                                ["equipType"] = 1,
                                ["weaponType"] = 0,
                            },
                            [2] =
                            {
                                ["name"] = "Axe of the Warlock",
                                ["itemId"] = 43529,
                                ["armorType"] = 0,
                                ["equipType"] = 5,
                                ["weaponType"] = 1,
                            },
                            [3] =
                            {
                                ["name"] = "Piece 3",
                            },
                        },
                    },
                    [20] =
                    {
                        ["name"] = "Witchman Armor",
                        ["totalSlots"] = 1,
                        ["pieces"] =
                        {
                            [1] =
                            {
                                ["name"] = "Piece 1",
                            },
                        },
                    },
                },
            },
        },
    },
}
`

const WARLOCK: SetCaptured = {
  esoSetId: 19,
  name: "Vestments of the Warlock",
  itemIds: [43529, 43803],
  armorTypes: ["ARMORTYPE_LIGHT"],
  equipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_ONE_HAND"],
  weaponTypes: ["WEAPONTYPE_AXE"],
}

describe("setsCapturedIn", () => {
  test("reads each set's item ids and type constants off its pieces", () => {
    expect(setsCapturedIn(CAPTURE)).toEqual([WARLOCK])
  })

  test("reads a capture no piece of which names an item id as nothing", () => {
    const older = CAPTURE.replace(/\["itemId"\] = \d+,/g, "")
    expect(setsCapturedIn(older)).toBeUndefined()
  })

  test("reads a file that will not parse as nothing", () => {
    expect(setsCapturedIn("not lua at all {")).toBeUndefined()
  })
})

describe("namesByNumber", () => {
  test("names no number after a none or invalid constant", () => {
    const names = namesByNumber({ ARMORTYPE_NONE: 0, ARMORTYPE_HEAVY: 3 })
    expect([...names]).toEqual([[3, "ARMORTYPE_HEAVY"]])
  })
})

describe("setsWrittenOver", () => {
  test("puts each list on the page stating the set's id and restates a title the game spells otherwise", () => {
    const pages = new Map([
      [WARLOCK_AT, { esoSetId: 19, title: "Vestments Of The Warlock" }],
      [OTHER_AT, { esoSetId: 700, title: "Other" }],
    ])
    const written = setsWrittenOver([WARLOCK, { ...WARLOCK, esoSetId: 855 }], pages)
    expect(written.paged).toBe(1)
    expect(written.unpaged).toEqual([855])
    expect(written.uncaptured).toEqual([700])
    expect(written.askings).toEqual([
      {
        at: RESTATE,
        given: { at: WARLOCK_AT, key: "title", to: "Vestments of the Warlock" },
      },
      {
        at: PUT,
        given: {
          key: "esoWeaponTypes",
          valued: [{ path: WARLOCK_AT, value: '["WEAPONTYPE_AXE"]' }],
          after: "esoSetId",
        },
      },
      {
        at: PUT,
        given: {
          key: "esoEquipTypes",
          valued: [{ path: WARLOCK_AT, value: '["EQUIP_TYPE_HEAD","EQUIP_TYPE_ONE_HAND"]' }],
          after: "esoSetId",
        },
      },
      {
        at: PUT,
        given: {
          key: "esoArmorTypes",
          valued: [{ path: WARLOCK_AT, value: '["ARMORTYPE_LIGHT"]' }],
          after: "esoSetId",
        },
      },
      {
        at: PUT,
        given: {
          key: "esoItemIds",
          valued: [{ path: WARLOCK_AT, value: "[43529,43803]" }],
          after: "esoSetId",
        },
      },
    ])
  })

  test("takes a list off every page before writing it again", () => {
    const pages = new Map([[WARLOCK_AT, { esoSetId: 19, title: WARLOCK.name, esoItemIds: [1] }]])
    const ats = setsWrittenOver([WARLOCK], pages).askings.map((one) => one.at)
    expect(ats.slice(-2)).toEqual([TAKE_OFF, PUT])
  })
})
