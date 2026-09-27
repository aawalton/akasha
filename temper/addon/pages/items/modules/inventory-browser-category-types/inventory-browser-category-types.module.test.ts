import { expect, test } from "bun:test"
import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  asking,
  type Row,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  type CategoryNumbers,
  type CategoryTypesRow,
  categoryTypes,
  numberByAddress,
} from "akasha/temper/addon/pages/items/modules/inventory-browser-category-types/inventory-browser-category-types.module.code.ts"
import { shield } from "akasha/temper/catalog/gear/temper-armor-weight/pages/shield/shield.temper-armor-weight.ts"
import { temperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.ts"
import { head } from "akasha/temper/catalog/gear/temper-equip-type/pages/head.temper-equip-type.ts"
import { temperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.ts"
import { temperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.ts"
import { weapon } from "akasha/temper/catalog/temper-item-type/pages/weapon.temper-item-type.ts"
import { temperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.ts"
import { temperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.ts"
import { engineConstantsTable } from "akasha/temper/eso/constant/modules/engine-constants-seeding/engine-constants-seeding.module.code.ts"
import { temperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.ts"

const CONSUMABLE_ALL =
  "IT:CONTAINER IT:CONTAINER_CURRENCY IT:CONTAINER_STACKABLE IT:FOOD IT:DRINK IT:POTION IT:POISON IT:RECIPE IT:RACIAL_STYLE_MOTIF IT:MASTER_WRIT IT:AVA_REPAIR IT:GROUP_REPAIR IT:TOOL IT:CROWN_REPAIR IT:CROWN_ITEM IT:DYE_STAMP IT:RECALL_STONE"

const MATERIALS_ALL =
  "IT:ARMOR_TRAIT IT:BLACKSMITHING_BOOSTER IT:BLACKSMITHING_MATERIAL IT:BLACKSMITHING_RAW_MATERIAL IT:CLOTHIER_BOOSTER IT:CLOTHIER_MATERIAL IT:CLOTHIER_RAW_MATERIAL IT:ENCHANTING_RUNE_ASPECT IT:ENCHANTING_RUNE_ESSENCE IT:FISH IT:FLAVORING IT:FURNISHING_MATERIAL IT:INGREDIENT IT:JEWELRYCRAFTING_BOOSTER IT:JEWELRYCRAFTING_MATERIAL IT:JEWELRYCRAFTING_RAW_BOOSTER IT:JEWELRYCRAFTING_RAW_MATERIAL IT:JEWELRY_RAW_TRAIT IT:JEWELRY_TRAIT IT:POISON_BASE IT:POTION_BASE IT:RAW_MATERIAL IT:REAGENT IT:SPICE IT:STYLE_MATERIAL IT:WEAPON_TRAIT IT:WOODWORKING_BOOSTER IT:WOODWORKING_MATERIAL IT:WOODWORKING_RAW_MATERIAL"

const MISC_ALL =
  "IT:GLYPH_ARMOR IT:GLYPH_JEWELRY IT:GLYPH_WEAPON IT:SOUL_GEM IT:SIEGE IT:LURE IT:TOOL IT:TRASH IT:TROPHY IT:COLLECTIBLE IT:FISH IT:TREASURE IT:LOCKPICK IT:SCRIBING_INK IT:CRAFTED_ABILITY IT:CRAFTED_ABILITY_SCRIPT IT:TABARD IT:DISGUISE IT:COSTUME"

const BODY = "EQ:HEAD EQ:SHOULDERS EQ:CHEST EQ:HAND EQ:LEGS EQ:FEET EQ:WAIST"

const HAND_WRITTEN: Readonly<Record<string, readonly [string, string]>> = {
  all: ["All", ""],
  weapons: ["Weapons", ""],
  armor: ["Armor", ""],
  jewelry: ["Jewelry", ""],
  consumables: ["Consumable", CONSUMABLE_ALL],
  materials: ["Materials", MATERIALS_ALL],
  furnishings: ["Furnishing", ""],
  companion: ["Companion", ""],
  miscellaneous: ["Misc", MISC_ALL],
  "weapons-all": ["Weapons", ""],
  "weapons-one-handed": ["Weapons", "WT:AXE WT:HAMMER WT:SWORD WT:DAGGER"],
  "weapons-two-handed": ["Weapons", "WT:TWO_HANDED_AXE WT:TWO_HANDED_HAMMER WT:TWO_HANDED_SWORD"],
  "weapons-bow": ["Weapons", "WT:BOW"],
  "weapons-destruction-staff": ["Weapons", "WT:FIRE_STAFF WT:FROST_STAFF WT:LIGHTNING_STAFF"],
  "weapons-healing-staff": ["Weapons", "WT:HEALING_STAFF"],
  "armor-all": ["Armor", ""],
  "armor-heavy": ["Armor", `AR:HEAVY ${BODY}`],
  "armor-medium": ["Armor", `AR:MEDIUM ${BODY}`],
  "armor-light": ["Armor", `AR:LIGHT ${BODY}`],
  "armor-clothing": ["Armor", `AR:NONE ${BODY}`],
  "armor-shield": ["Weapons", "WT:SHIELD"],
  "jewelry-all": ["Jewelry", "EQ:RING EQ:NECK"],
  "jewelry-necklace": ["Jewelry", "EQ:NECK"],
  "jewelry-ring": ["Jewelry", "EQ:RING"],
  "consumables-all": ["Consumable", CONSUMABLE_ALL],
  "consumables-food": [
    "Specialized",
    "IT:FOOD SP:FOOD_ENTREMET SP:FOOD_FRUIT SP:FOOD_GOURMET SP:FOOD_MEAT SP:FOOD_RAGOUT SP:FOOD_SAVOURY SP:FOOD_UNIQUE SP:FOOD_VEGETABLE",
  ],
  "consumables-drink": [
    "Specialized",
    "IT:DRINK SP:DRINK_ALCOHOLIC SP:DRINK_CORDIAL_TEA SP:DRINK_DISTILLATE SP:DRINK_LIQUEUR SP:DRINK_TEA SP:DRINK_TINCTURE SP:DRINK_TONIC SP:DRINK_UNIQUE",
  ],
  "consumables-recipe": [
    "Specialized",
    "IT:RECIPE SP:RECIPE_ALCHEMY_FORMULA_FURNISHING SP:RECIPE_BLACKSMITHING_DIAGRAM_FURNISHING SP:RECIPE_CLOTHIER_PATTERN_FURNISHING SP:RECIPE_ENCHANTING_SCHEMATIC_FURNISHING SP:RECIPE_JEWELRYCRAFTING_SKETCH_FURNISHING SP:RECIPE_PROVISIONING_DESIGN_FURNISHING SP:RECIPE_WOODWORKING_BLUEPRINT_FURNISHING SP:RECIPE_PROVISIONING_STANDARD_DRINK SP:RECIPE_PROVISIONING_STANDARD_FOOD",
  ],
  "consumables-potion": ["Consumable", "IT:POTION"],
  "consumables-poison": ["Consumable", "IT:POISON"],
  "consumables-motif": ["Consumable", "IT:RACIAL_STYLE_MOTIF"],
  "consumables-master-writ": ["Consumable", "IT:MASTER_WRIT"],
  "consumables-container": [
    "Consumable",
    "IT:CONTAINER IT:CONTAINER_CURRENCY IT:CONTAINER_STACKABLE",
  ],
  "consumables-repair": ["Consumable", "IT:TOOL IT:AVA_REPAIR IT:CROWN_REPAIR IT:GROUP_REPAIR"],
  "consumables-crown-item": ["Consumable", "IT:CROWN_ITEM"],
  "consumables-misc": ["Consumable", "IT:DYE_STAMP IT:RECALL_STONE"],
  "materials-all": ["Materials", MATERIALS_ALL],
  "materials-blacksmithing": [
    "Materials",
    "IT:BLACKSMITHING_RAW_MATERIAL IT:BLACKSMITHING_MATERIAL IT:BLACKSMITHING_BOOSTER",
  ],
  "materials-clothing": [
    "Materials",
    "IT:CLOTHIER_RAW_MATERIAL IT:CLOTHIER_MATERIAL IT:CLOTHIER_BOOSTER",
  ],
  "materials-woodworking": [
    "Materials",
    "IT:WOODWORKING_RAW_MATERIAL IT:WOODWORKING_MATERIAL IT:WOODWORKING_BOOSTER",
  ],
  "materials-jewelry": [
    "Materials",
    "IT:JEWELRYCRAFTING_RAW_MATERIAL IT:JEWELRYCRAFTING_MATERIAL IT:JEWELRYCRAFTING_BOOSTER",
  ],
  "materials-alchemy": ["Materials", "IT:REAGENT IT:POTION_BASE IT:POISON_BASE"],
  "materials-enchanting": [
    "Materials",
    "IT:ENCHANTING_RUNE_ASPECT IT:ENCHANTING_RUNE_ESSENCE IT:ENCHANTING_RUNE_POTENCY",
  ],
  "materials-provisioning": [
    "Specialized",
    "IT:INGREDIENT SP:INGREDIENT_ALCOHOL SP:INGREDIENT_DRINK_ADDITIVE SP:INGREDIENT_FOOD_ADDITIVE SP:INGREDIENT_FRUIT SP:INGREDIENT_MEAT SP:INGREDIENT_RARE SP:INGREDIENT_TEA SP:INGREDIENT_TONIC SP:INGREDIENT_VEGETABLE",
  ],
  "materials-style": ["Materials", "IT:STYLE_MATERIAL"],
  "materials-traits": [
    "Materials",
    "IT:WEAPON_TRAIT IT:ARMOR_TRAIT IT:JEWELRY_TRAIT IT:JEWELRY_RAW_TRAIT",
  ],
  "materials-furnishing": ["Materials", "IT:FURNISHING_MATERIAL"],
  "companion-all": ["Companion", ""],
  "companion-weapons": [
    "Companion",
    "IT:WEAPON WT:AXE WT:HAMMER WT:SWORD WT:DAGGER WT:TWO_HANDED_AXE WT:TWO_HANDED_HAMMER WT:TWO_HANDED_SWORD WT:BOW WT:FIRE_STAFF WT:FROST_STAFF WT:LIGHTNING_STAFF WT:HEALING_STAFF",
  ],
  "companion-armor": ["Companion", `IT:ARMOR ${BODY}`],
  "companion-jewelry": ["Companion", "IT:ARMOR EQ:RING EQ:NECK"],
  "companion-shield": ["Companion", "IT:WEAPON WT:SHIELD"],
  "miscellaneous-all": ["Misc", MISC_ALL],
  "miscellaneous-appearance": ["Appearance", "SP:DISGUISE SP:COSTUME SP:TABARD"],
  "miscellaneous-glyphs": ["Misc", "IT:GLYPH_ARMOR IT:GLYPH_JEWELRY IT:GLYPH_WEAPON"],
  "miscellaneous-soul-gem": ["Misc", "IT:SOUL_GEM"],
  "miscellaneous-siege": ["Misc", "IT:SIEGE"],
  "miscellaneous-tools": ["Misc", "IT:TOOL IT:LOCKPICK"],
  "miscellaneous-trophy": [
    "Specialized",
    "IT:TROPHY SP:FURNISHING_ATTUNABLE_STATION SP:TROPHY_COLLECTIBLE_FRAGMENT SP:TROPHY_KEY SP:TROPHY_KEY_FRAGMENT SP:TROPHY_MUSEUM_PIECE SP:TROPHY_RECIPE_FRAGMENT SP:TROPHY_RUNEBOX_FRAGMENT SP:TROPHY_SCROLL SP:TROPHY_SURVEY_REPORT SP:TROPHY_TOY SP:TROPHY_TREASURE_MAP",
  ],
  "miscellaneous-bait": ["Misc", "IT:LURE"],
  "miscellaneous-stolen": ["Stolen", ""],
  "miscellaneous-junk": ["Junk", "IT:TRASH"],
  "miscellaneous-scribing": [
    "Misc",
    "IT:SCRIBING_INK IT:CRAFTED_ABILITY IT:CRAFTED_ABILITY_SCRIPT",
  ],
  "miscellaneous-collectibles": [
    "MiscSubfilter",
    "SP:COLLECTIBLE_MONSTER_TROPHY SP:COLLECTIBLE_RARE_FISH SP:COLLECTIBLE_STYLE_PAGE SP:FISH SP:TREASURE",
  ],
}

const PREFIX: Readonly<Record<string, string>> = {
  IT: "ITEMTYPE_",
  SP: "SPECIALIZED_ITEMTYPE_",
  WT: "WEAPONTYPE_",
  AR: "ARMORTYPE_",
  EQ: "EQUIP_TYPE_",
}

function constantNumbers(list: string, numbers: Readonly<Record<string, number>>): number[] {
  return list
    .split(" ")
    .filter((one) => one !== "")
    .map((one) => {
      const [kind = "", name = ""] = one.split(":")
      const value = numbers[`${PREFIX[kind]}${name}`]
      if (value === undefined) throw new Error(`no constant for ${one}`)
      return value
    })
}

function addresses(value: unknown): readonly string[] | undefined {
  return Array.isArray(value) ? value.filter((one) => typeof one === "string") : undefined
}

type SluggedRow = Row & { readonly slug: string }

function checkoutRows(pageTypeSlug: string, keys: readonly string[]): readonly SluggedRow[] {
  const asked = asking(akashaRoot(), { pageTypeSlug, keys: ["slug", ...keys] })
  if (!("rows" in asked))
    throw new Error(`the ${pageTypeSlug} pages went unread — ${asked.refused}`)
  return asked.rows.map((row) => ({ ...row, slug: String(row.slug) }))
}

function pageNumbers(): CategoryNumbers {
  const numberOf = (key: string) => (row: SluggedRow) => parseNumber(row[key])
  const weights = checkoutRows(temperArmorWeight.slug, ["armorType", "esoWeaponTypeNumber"])
  return {
    itemTypes: numberByAddress(
      temperItemType.slug,
      checkoutRows(temperItemType.slug, ["esoItemTypeNumber"]),
      numberOf("esoItemTypeNumber")
    ),
    specializedItemTypes: numberByAddress(
      temperSpecializedItemType.slug,
      checkoutRows(temperSpecializedItemType.slug, ["esoSpecializedItemTypeNumber"]),
      numberOf("esoSpecializedItemTypeNumber")
    ),
    weaponTypes: numberByAddress(
      temperWeaponType.slug,
      checkoutRows(temperWeaponType.slug, ["esoWeaponTypeNumber"]),
      numberOf("esoWeaponTypeNumber")
    ),
    armorTypes: numberByAddress(temperArmorWeight.slug, weights, numberOf("armorType")),
    armorWeaponTypes: numberByAddress(
      temperArmorWeight.slug,
      weights,
      numberOf("esoWeaponTypeNumber")
    ),
    equipTypes: numberByAddress(
      temperEquipType.slug,
      checkoutRows(temperEquipType.slug, ["equipType"]),
      numberOf("equipType")
    ),
  }
}

const CATEGORY_KEYS = [
  "match",
  "itemTypes",
  "specializedItemTypes",
  "weaponTypes",
  "armorWeights",
  "equipTypes",
] as const

function categoryRow(page: Row): CategoryTypesRow {
  const match = page.match
  return {
    ...(typeof match === "string" ? { match } : {}),
    itemTypes: addresses(page.itemTypes),
    specializedItemTypes: addresses(page.specializedItemTypes),
    weaponTypes: addresses(page.weaponTypes),
    armorWeights: addresses(page.armorWeights),
    equipTypes: addresses(page.equipTypes),
  }
}

test("each category page matches items as the browser matched them by hand, against the same game numbers", () => {
  const constants = engineConstantsTable().numbers
  const numbers = pageNumbers()
  const fromPages: Record<string, readonly [string | undefined, readonly number[]]> = {}
  for (const page of checkoutRows(temperBrowserCategory.slug, CATEGORY_KEYS)) {
    const row = categoryRow(page)
    fromPages[page.slug] = [row.match, categoryTypes(row, numbers)]
  }
  const byHand: Record<string, readonly [string, readonly number[]]> = {}
  for (const [slug, [match, list]] of Object.entries(HAND_WRITTEN)) {
    byHand[slug] = [match, constantNumbers(list, constants)]
  }
  expect(fromPages).toEqual(byHand)
})

test("an armor weight gives its armor type where the category matches armor, and its weapon number elsewhere", () => {
  const weaponType = `${temperItemType.slug}/${weapon.slug}`
  const shieldWeight = `${temperArmorWeight.slug}/${shield.slug}`
  const headPlace = `${temperEquipType.slug}/${head.slug}`
  const numbers: CategoryNumbers = {
    itemTypes: { [weaponType]: 1 },
    specializedItemTypes: {},
    weaponTypes: {},
    armorTypes: { [shieldWeight]: 0 },
    armorWeaponTypes: { [shieldWeight]: 14 },
    equipTypes: { [headPlace]: 1 },
  }
  expect(
    categoryTypes(
      { match: "Armor", armorWeights: [shieldWeight], equipTypes: [headPlace] },
      numbers
    )
  ).toEqual([0, 1])
  expect(
    categoryTypes(
      { match: "Companion", itemTypes: [weaponType], armorWeights: [shieldWeight] },
      numbers
    )
  ).toEqual([1, 14])
})
