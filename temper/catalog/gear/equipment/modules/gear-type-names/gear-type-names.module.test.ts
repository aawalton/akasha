import { describe, expect, test } from "bun:test"
import {
  gearTypeNames,
  gearTypeNamesOf,
} from "akasha/temper/catalog/gear/equipment/modules/gear-type-names/gear-type-names.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

holdSkillCatalogFromCheckout()

function named(held: ReadonlyMap<number, string>): Record<number, string> {
  return Object.fromEntries(held)
}

describe("The names read from the gear pages are the names the item tooltip drew from its tables.", () => {
  test("each equip type is named by the slot or jewelry type stating it", () => {
    expect(named(gearTypeNames().equipTypes)).toEqual({
      1: "Head",
      2: "Necklace",
      3: "Chest",
      4: "Shoulders",
      7: "Off Hand",
      8: "Waist",
      9: "Legs",
      10: "Feet",
      12: "Ring",
      13: "Hands",
      14: "Main Hand",
      15: "Poison",
    })
  })

  test("each weapon type is named by the weapon type or armor weight stating it", () => {
    expect(named(gearTypeNames().weaponTypes)).toEqual({
      0: "No Type",
      1: "Axe",
      2: "Mace",
      3: "Sword",
      4: "Greatsword",
      5: "Battle Axe",
      6: "Maul",
      8: "Bow",
      9: "Restoration Staff",
      11: "Dagger",
      12: "Inferno Staff",
      13: "Ice Staff",
      14: "Shield",
      15: "Lightning Staff",
    })
  })

  test("each armor type is named by the armor weight stating it", () => {
    expect(named(gearTypeNames().armorTypes)).toEqual({
      0: "No Weight",
      1: "Light",
      2: "Medium",
      3: "Heavy",
    })
  })
})

describe("Two pages stating one number throw rather than naming it by either.", () => {
  test("two slots stating one equip type throw", () => {
    const slot = { title: "Ring 1", equipType: 12 }
    const other = { title: "Ring 2", equipType: 12 }
    expect(() =>
      gearTypeNamesOf({
        armorSlots: [slot, other],
        weaponSlots: [],
        jewelryTypes: [],
        weaponTypes: [],
        armorWeights: [],
      })
    ).toThrow("equipType 12")
  })
})
