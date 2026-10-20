import { expect, test } from "bun:test"
import { holdPagesOfTypeFromCheckout } from "akasha/design/language/lua-compiler/modules/plugin-pages-of-type/plugin-pages-of-type.module.test-fixtures.ts"
import type {
  CharacterArmorSlotData,
  CharacterBuildData,
  CharacterJewelrySlotData,
  CharacterWeaponSlotData,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-codec-types/character-capture-codec-types.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { itemLevelPlaceOf } from "akasha/temper/player/character/build/build-codec/modules/item-level-places/item-level-places.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

holdSetCatalogFromCheckout()
holdSkillCatalogFromCheckout()
holdPagesOfTypeFromCheckout()

Object.assign(globalThis, {
  BitAnd: (one: number, other: number) => one & other,
  BitOr: (one: number, other: number) => one | other,
  BitLShift: (value: number, by: number) => value << by,
  BitRShift: (value: number, by: number) => value >>> by,
})

const { encodeCharacterBuild } = await import(
  "akasha/temper/capture/characters-capture-addon/modules/character-capture-encoder/character-capture-encoder.module.code.ts"
)
const { getFoodIndex } = await import(
  "akasha/temper/capture/characters-capture-addon/modules/character-capture-food-map/character-capture-food-map.module.code.ts"
)
const { characterPassiveSkillCount } = await import(
  "akasha/temper/capture/characters-capture-addon/modules/character-capture-passive-map/character-capture-passive-map.module.code.ts"
)

const DUBIOUS_CAMORAN_THRONE_BUFF = 89957

function armorPiece(itemLevelPlace: number, enchantLevel = 0): CharacterArmorSlotData {
  return {
    isEmpty: false,
    weightIndex: 1,
    traitIndex: 1,
    enchantIndex: 0,
    setIndex: 1,
    qualityIndex: 1,
    enchantQualityIndex: 0,
    enchantSubtype: 0,
    itemLevelPlace,
    enchantLevel,
  }
}

const NO_JEWELRY: CharacterJewelrySlotData = {
  isEmpty: true,
  traitIndex: 0,
  enchantIndex: 0,
  setIndex: 0,
  qualityIndex: 0,
  enchantQualityIndex: 0,
  enchantSubtype: 0,
  itemLevelPlace: 0,
  enchantLevel: 0,
}

const NO_WEAPON: CharacterWeaponSlotData = {
  isEmpty: true,
  isShield: false,
  shieldTraitIndex: 0,
  shieldEnchantIndex: 0,
  typeIndex: 0,
  traitIndex: 0,
  enchantIndex: 0,
  poisonIndex: 0,
  setIndex: 0,
  qualityIndex: 0,
  enchantQualityIndex: 0,
  enchantSubtype: 0,
  itemLevelPlace: 0,
  enchantLevel: 0,
}

function captured(armor: CharacterArmorSlotData[], foodIndex: number): CharacterBuildData {
  const passives = characterPassiveSkillCount()
  return {
    classIndex: 1,
    raceIndex: 1,
    allianceIndex: 1,
    roleBitmask: 0,
    vampireStageIndex: 0,
    curseIndex: 0,
    mundusIndex: 0,
    magicka: 0,
    health: 64,
    stamina: 0,
    skillLineIndices: [],
    armor,
    jewelry: [NO_JEWELRY, NO_JEWELRY, NO_JEWELRY],
    weaponBars: [
      { mainHand: NO_WEAPON, offHand: NO_WEAPON },
      { mainHand: NO_WEAPON, offHand: NO_WEAPON },
    ],
    primarySkills: [0, 0, 0, 0, 0, 0],
    backupSkills: [0, 0, 0, 0, 0, 0],
    passiveBitmask: Array.from({ length: passives }, () => false),
    passiveRanks: Array.from({ length: passives }, () => 0),
    championPoints: [0, 1, 2].map(() => ({ slotted: [0, 0, 0, 0], passive: [] })),
    foodIndex,
    potionIndex: 0,
    potion2Index: 0,
    targetArmorBit: 0,
    targetHealth: 100,
    scribing: [],
    esoPlusBit: 0,
  }
}

test("each worn piece's level the add-on writes is read back by the build codec", () => {
  const levels = [1, 16, 26, 46, "CP10", "CP150", "CP160"] as const
  const hash = encodeCharacterBuild(
    captured(
      levels.map((level) => armorPiece(itemLevelPlaceOf(level))),
      0
    )
  )
  const armor = decodeBuild(buildHash(hash))?.equipment.armor
  expect(Object.values(armor ?? {}).map((piece) => piece.data?.level)).toEqual([...levels])
})

test("each worn piece's glyph level the add-on writes is read back by the build codec", () => {
  const glyphLevels = [5, 15, 25, 35, 45, 50, 0]
  const hash = encodeCharacterBuild(
    captured(
      glyphLevels.map((one) => armorPiece(itemLevelPlaceOf("CP160"), one)),
      0
    )
  )
  const armor = decodeBuild(buildHash(hash))?.equipment.armor
  expect(Object.values(armor ?? {}).map((piece) => piece.data?.enchantmentLevel)).toEqual([
    5,
    15,
    25,
    35,
    45,
    50,
    undefined,
  ])
})

test("a food or drink the add-on writes is read back by the build codec as that page", () => {
  const hash = encodeCharacterBuild(
    captured(
      Array.from({ length: 7 }, () => armorPiece(0)),
      getFoodIndex(DUBIOUS_CAMORAN_THRONE_BUFF)
    )
  )
  expect(decodeBuild(buildHash(hash))?.consumables.foodOrDrink).toBe("dubious-camoran-throne")
})
