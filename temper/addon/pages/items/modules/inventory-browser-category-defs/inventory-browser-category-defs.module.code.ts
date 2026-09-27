import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import {
  type CategoryPageRow,
  placedCategories,
} from "akasha/temper/addon/pages/items/modules/inventory-browser-category-placing/inventory-browser-category-placing.module.code.ts"
import type {
  CategoryDef,
  SubfilterDef,
} from "akasha/temper/addon/pages/items/modules/inventory-browser-types/inventory-browser-types.module.code.ts"
import { temperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-10/eso-enums-10.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"

const NO_TYPES: number[] = []

function consumableAll(): number[] {
  return [
    ITEMTYPE_CONTAINER,
    ITEMTYPE_CONTAINER_CURRENCY,
    ITEMTYPE_CONTAINER_STACKABLE,
    ITEMTYPE_FOOD,
    ITEMTYPE_DRINK,
    ITEMTYPE_POTION,
    ITEMTYPE_POISON,
    ITEMTYPE_RECIPE,
    ITEMTYPE_RACIAL_STYLE_MOTIF,
    ITEMTYPE_MASTER_WRIT,
    ITEMTYPE_AVA_REPAIR,
    ITEMTYPE_GROUP_REPAIR,
    ITEMTYPE_TOOL,
    ITEMTYPE_CROWN_REPAIR,
    ITEMTYPE_CROWN_ITEM,
    ITEMTYPE_DYE_STAMP,
    ITEMTYPE_RECALL_STONE,
  ]
}

function materialsAll(): number[] {
  return [
    ITEMTYPE_ARMOR_TRAIT,
    ITEMTYPE_BLACKSMITHING_BOOSTER,
    ITEMTYPE_BLACKSMITHING_MATERIAL,
    ITEMTYPE_BLACKSMITHING_RAW_MATERIAL,
    ITEMTYPE_CLOTHIER_BOOSTER,
    ITEMTYPE_CLOTHIER_MATERIAL,
    ITEMTYPE_CLOTHIER_RAW_MATERIAL,
    ITEMTYPE_ENCHANTING_RUNE_ASPECT,
    ITEMTYPE_ENCHANTING_RUNE_ESSENCE,
    ITEMTYPE_FISH,
    ITEMTYPE_FLAVORING,
    ITEMTYPE_FURNISHING_MATERIAL,
    ITEMTYPE_INGREDIENT,
    ITEMTYPE_JEWELRYCRAFTING_BOOSTER,
    ITEMTYPE_JEWELRYCRAFTING_MATERIAL,
    ITEMTYPE_JEWELRYCRAFTING_RAW_BOOSTER,
    ITEMTYPE_JEWELRYCRAFTING_RAW_MATERIAL,
    ITEMTYPE_JEWELRY_RAW_TRAIT,
    ITEMTYPE_JEWELRY_TRAIT,
    ITEMTYPE_POISON_BASE,
    ITEMTYPE_POTION_BASE,
    ITEMTYPE_RAW_MATERIAL,
    ITEMTYPE_REAGENT,
    ITEMTYPE_SPICE,
    ITEMTYPE_STYLE_MATERIAL,
    ITEMTYPE_WEAPON_TRAIT,
    ITEMTYPE_WOODWORKING_BOOSTER,
    ITEMTYPE_WOODWORKING_MATERIAL,
    ITEMTYPE_WOODWORKING_RAW_MATERIAL,
  ]
}

function miscAll(): number[] {
  return [
    ITEMTYPE_GLYPH_ARMOR,
    ITEMTYPE_GLYPH_JEWELRY,
    ITEMTYPE_GLYPH_WEAPON,
    ITEMTYPE_SOUL_GEM,
    ITEMTYPE_SIEGE,
    ITEMTYPE_LURE,
    ITEMTYPE_TOOL,
    ITEMTYPE_TRASH,
    ITEMTYPE_TROPHY,
    ITEMTYPE_COLLECTIBLE,
    ITEMTYPE_FISH,
    ITEMTYPE_TREASURE,
    ITEMTYPE_LOCKPICK,
    ITEMTYPE_SCRIBING_INK,
    ITEMTYPE_CRAFTED_ABILITY,
    ITEMTYPE_CRAFTED_ABILITY_SCRIPT,
    ITEMTYPE_TABARD,
    ITEMTYPE_DISGUISE,
    ITEMTYPE_COSTUME,
  ]
}

function bodyEquipSlots(): number[] {
  return [
    EQUIP_TYPE_HEAD,
    EQUIP_TYPE_SHOULDERS,
    EQUIP_TYPE_CHEST,
    EQUIP_TYPE_HAND,
    EQUIP_TYPE_LEGS,
    EQUIP_TYPE_FEET,
    EQUIP_TYPE_WAIST,
  ]
}

function armorWeight(armorType: number): number[] {
  const out = [armorType]
  const slots = bodyEquipSlots()
  for (let i = 0; i < slots.length; i = i + 1) {
    const slot = slots[i]
    if (slot !== undefined) out.push(slot)
  }
  return out
}

interface Matching {
  readonly category: string
  readonly buildTypes: (this: void) => number[]
}

const MATCHING_BY_SLUG: Record<string, Matching> = {
  all: { category: "All", buildTypes: () => NO_TYPES },
  weapons: { category: "Weapons", buildTypes: () => NO_TYPES },
  armor: { category: "Armor", buildTypes: () => NO_TYPES },
  jewelry: { category: "Jewelry", buildTypes: () => NO_TYPES },
  consumables: { category: "Consumable", buildTypes: consumableAll },
  materials: { category: "Materials", buildTypes: materialsAll },
  furnishings: { category: "Furnishing", buildTypes: () => NO_TYPES },
  companion: { category: "Companion", buildTypes: () => NO_TYPES },
  miscellaneous: { category: "Misc", buildTypes: miscAll },
  "weapons-all": { category: "Weapons", buildTypes: () => NO_TYPES },
  "weapons-one-handed": {
    category: "Weapons",
    buildTypes: () => [WEAPONTYPE_AXE, WEAPONTYPE_HAMMER, WEAPONTYPE_SWORD, WEAPONTYPE_DAGGER],
  },
  "weapons-two-handed": {
    category: "Weapons",
    buildTypes: () => [
      WEAPONTYPE_TWO_HANDED_AXE,
      WEAPONTYPE_TWO_HANDED_HAMMER,
      WEAPONTYPE_TWO_HANDED_SWORD,
    ],
  },
  "weapons-bow": { category: "Weapons", buildTypes: () => [WEAPONTYPE_BOW] },
  "weapons-destruction-staff": {
    category: "Weapons",
    buildTypes: () => [WEAPONTYPE_FIRE_STAFF, WEAPONTYPE_FROST_STAFF, WEAPONTYPE_LIGHTNING_STAFF],
  },
  "weapons-healing-staff": { category: "Weapons", buildTypes: () => [WEAPONTYPE_HEALING_STAFF] },
  "armor-all": { category: "Armor", buildTypes: () => NO_TYPES },
  "armor-heavy": { category: "Armor", buildTypes: () => armorWeight(ARMORTYPE_HEAVY) },
  "armor-medium": { category: "Armor", buildTypes: () => armorWeight(ARMORTYPE_MEDIUM) },
  "armor-light": { category: "Armor", buildTypes: () => armorWeight(ARMORTYPE_LIGHT) },
  "armor-clothing": { category: "Armor", buildTypes: () => armorWeight(ARMORTYPE_NONE) },
  "armor-shield": { category: "Weapons", buildTypes: () => [WEAPONTYPE_SHIELD] },
  "jewelry-all": { category: "Jewelry", buildTypes: () => [EQUIP_TYPE_RING, EQUIP_TYPE_NECK] },
  "jewelry-necklace": { category: "Jewelry", buildTypes: () => [EQUIP_TYPE_NECK] },
  "jewelry-ring": { category: "Jewelry", buildTypes: () => [EQUIP_TYPE_RING] },
  "consumables-all": { category: "Consumable", buildTypes: consumableAll },
  "consumables-food": {
    category: "Specialized",
    buildTypes: () => [
      ITEMTYPE_FOOD,
      SPECIALIZED_ITEMTYPE_FOOD_ENTREMET,
      SPECIALIZED_ITEMTYPE_FOOD_FRUIT,
      SPECIALIZED_ITEMTYPE_FOOD_GOURMET,
      SPECIALIZED_ITEMTYPE_FOOD_MEAT,
      SPECIALIZED_ITEMTYPE_FOOD_RAGOUT,
      SPECIALIZED_ITEMTYPE_FOOD_SAVOURY,
      SPECIALIZED_ITEMTYPE_FOOD_UNIQUE,
      SPECIALIZED_ITEMTYPE_FOOD_VEGETABLE,
    ],
  },
  "consumables-drink": {
    category: "Specialized",
    buildTypes: () => [
      ITEMTYPE_DRINK,
      SPECIALIZED_ITEMTYPE_DRINK_ALCOHOLIC,
      SPECIALIZED_ITEMTYPE_DRINK_CORDIAL_TEA,
      SPECIALIZED_ITEMTYPE_DRINK_DISTILLATE,
      SPECIALIZED_ITEMTYPE_DRINK_LIQUEUR,
      SPECIALIZED_ITEMTYPE_DRINK_TEA,
      SPECIALIZED_ITEMTYPE_DRINK_TINCTURE,
      SPECIALIZED_ITEMTYPE_DRINK_TONIC,
      SPECIALIZED_ITEMTYPE_DRINK_UNIQUE,
    ],
  },
  "consumables-recipe": {
    category: "Specialized",
    buildTypes: () => [
      ITEMTYPE_RECIPE,
      SPECIALIZED_ITEMTYPE_RECIPE_ALCHEMY_FORMULA_FURNISHING,
      SPECIALIZED_ITEMTYPE_RECIPE_BLACKSMITHING_DIAGRAM_FURNISHING,
      SPECIALIZED_ITEMTYPE_RECIPE_CLOTHIER_PATTERN_FURNISHING,
      SPECIALIZED_ITEMTYPE_RECIPE_ENCHANTING_SCHEMATIC_FURNISHING,
      SPECIALIZED_ITEMTYPE_RECIPE_JEWELRYCRAFTING_SKETCH_FURNISHING,
      SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_DESIGN_FURNISHING,
      SPECIALIZED_ITEMTYPE_RECIPE_WOODWORKING_BLUEPRINT_FURNISHING,
      SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_STANDARD_DRINK,
      SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_STANDARD_FOOD,
    ],
  },
  "consumables-potion": { category: "Consumable", buildTypes: () => [ITEMTYPE_POTION] },
  "consumables-poison": { category: "Consumable", buildTypes: () => [ITEMTYPE_POISON] },
  "consumables-motif": { category: "Consumable", buildTypes: () => [ITEMTYPE_RACIAL_STYLE_MOTIF] },
  "consumables-master-writ": { category: "Consumable", buildTypes: () => [ITEMTYPE_MASTER_WRIT] },
  "consumables-container": {
    category: "Consumable",
    buildTypes: () => [
      ITEMTYPE_CONTAINER,
      ITEMTYPE_CONTAINER_CURRENCY,
      ITEMTYPE_CONTAINER_STACKABLE,
    ],
  },
  "consumables-repair": {
    category: "Consumable",
    buildTypes: () => [
      ITEMTYPE_TOOL,
      ITEMTYPE_AVA_REPAIR,
      ITEMTYPE_CROWN_REPAIR,
      ITEMTYPE_GROUP_REPAIR,
    ],
  },
  "consumables-crown-item": { category: "Consumable", buildTypes: () => [ITEMTYPE_CROWN_ITEM] },
  "consumables-misc": {
    category: "Consumable",
    buildTypes: () => [ITEMTYPE_DYE_STAMP, ITEMTYPE_RECALL_STONE],
  },
  "materials-all": { category: "Materials", buildTypes: materialsAll },
  "materials-blacksmithing": {
    category: "Materials",
    buildTypes: () => [
      ITEMTYPE_BLACKSMITHING_RAW_MATERIAL,
      ITEMTYPE_BLACKSMITHING_MATERIAL,
      ITEMTYPE_BLACKSMITHING_BOOSTER,
    ],
  },
  "materials-clothing": {
    category: "Materials",
    buildTypes: () => [
      ITEMTYPE_CLOTHIER_RAW_MATERIAL,
      ITEMTYPE_CLOTHIER_MATERIAL,
      ITEMTYPE_CLOTHIER_BOOSTER,
    ],
  },
  "materials-woodworking": {
    category: "Materials",
    buildTypes: () => [
      ITEMTYPE_WOODWORKING_RAW_MATERIAL,
      ITEMTYPE_WOODWORKING_MATERIAL,
      ITEMTYPE_WOODWORKING_BOOSTER,
    ],
  },
  "materials-jewelry": {
    category: "Materials",
    buildTypes: () => [
      ITEMTYPE_JEWELRYCRAFTING_RAW_MATERIAL,
      ITEMTYPE_JEWELRYCRAFTING_MATERIAL,
      ITEMTYPE_JEWELRYCRAFTING_BOOSTER,
    ],
  },
  "materials-alchemy": {
    category: "Materials",
    buildTypes: () => [ITEMTYPE_REAGENT, ITEMTYPE_POTION_BASE, ITEMTYPE_POISON_BASE],
  },
  "materials-enchanting": {
    category: "Materials",
    buildTypes: () => [
      ITEMTYPE_ENCHANTING_RUNE_ASPECT,
      ITEMTYPE_ENCHANTING_RUNE_ESSENCE,
      ITEMTYPE_ENCHANTING_RUNE_POTENCY,
    ],
  },
  "materials-provisioning": {
    category: "Specialized",
    buildTypes: () => [
      ITEMTYPE_INGREDIENT,
      SPECIALIZED_ITEMTYPE_INGREDIENT_ALCOHOL,
      SPECIALIZED_ITEMTYPE_INGREDIENT_DRINK_ADDITIVE,
      SPECIALIZED_ITEMTYPE_INGREDIENT_FOOD_ADDITIVE,
      SPECIALIZED_ITEMTYPE_INGREDIENT_FRUIT,
      SPECIALIZED_ITEMTYPE_INGREDIENT_MEAT,
      SPECIALIZED_ITEMTYPE_INGREDIENT_RARE,
      SPECIALIZED_ITEMTYPE_INGREDIENT_TEA,
      SPECIALIZED_ITEMTYPE_INGREDIENT_TONIC,
      SPECIALIZED_ITEMTYPE_INGREDIENT_VEGETABLE,
    ],
  },
  "materials-style": { category: "Materials", buildTypes: () => [ITEMTYPE_STYLE_MATERIAL] },
  "materials-traits": {
    category: "Materials",
    buildTypes: () => [
      ITEMTYPE_WEAPON_TRAIT,
      ITEMTYPE_ARMOR_TRAIT,
      ITEMTYPE_JEWELRY_TRAIT,
      ITEMTYPE_JEWELRY_RAW_TRAIT,
    ],
  },
  "materials-furnishing": {
    category: "Materials",
    buildTypes: () => [ITEMTYPE_FURNISHING_MATERIAL],
  },
  "companion-all": { category: "Companion", buildTypes: () => NO_TYPES },
  "companion-weapons": {
    category: "Companion",
    buildTypes: () => [
      ITEMTYPE_WEAPON,
      WEAPONTYPE_AXE,
      WEAPONTYPE_HAMMER,
      WEAPONTYPE_SWORD,
      WEAPONTYPE_DAGGER,
      WEAPONTYPE_TWO_HANDED_AXE,
      WEAPONTYPE_TWO_HANDED_HAMMER,
      WEAPONTYPE_TWO_HANDED_SWORD,
      WEAPONTYPE_BOW,
      WEAPONTYPE_FIRE_STAFF,
      WEAPONTYPE_FROST_STAFF,
      WEAPONTYPE_LIGHTNING_STAFF,
      WEAPONTYPE_HEALING_STAFF,
    ],
  },
  "companion-armor": {
    category: "Companion",
    buildTypes: () => armorWeight(ITEMTYPE_ARMOR),
  },
  "companion-jewelry": {
    category: "Companion",
    buildTypes: () => [ITEMTYPE_ARMOR, EQUIP_TYPE_RING, EQUIP_TYPE_NECK],
  },
  "companion-shield": {
    category: "Companion",
    buildTypes: () => [ITEMTYPE_WEAPON, WEAPONTYPE_SHIELD],
  },
  "miscellaneous-all": { category: "Misc", buildTypes: miscAll },
  "miscellaneous-appearance": {
    category: "Appearance",
    buildTypes: () => [
      SPECIALIZED_ITEMTYPE_DISGUISE,
      SPECIALIZED_ITEMTYPE_COSTUME,
      SPECIALIZED_ITEMTYPE_TABARD,
    ],
  },
  "miscellaneous-glyphs": {
    category: "Misc",
    buildTypes: () => [ITEMTYPE_GLYPH_ARMOR, ITEMTYPE_GLYPH_JEWELRY, ITEMTYPE_GLYPH_WEAPON],
  },
  "miscellaneous-soul-gem": { category: "Misc", buildTypes: () => [ITEMTYPE_SOUL_GEM] },
  "miscellaneous-siege": { category: "Misc", buildTypes: () => [ITEMTYPE_SIEGE] },
  "miscellaneous-tools": {
    category: "Misc",
    buildTypes: () => [ITEMTYPE_TOOL, ITEMTYPE_LOCKPICK],
  },
  "miscellaneous-trophy": {
    category: "Specialized",
    buildTypes: () => [
      ITEMTYPE_TROPHY,
      SPECIALIZED_ITEMTYPE_FURNISHING_ATTUNABLE_STATION,
      SPECIALIZED_ITEMTYPE_TROPHY_COLLECTIBLE_FRAGMENT,
      SPECIALIZED_ITEMTYPE_TROPHY_KEY,
      SPECIALIZED_ITEMTYPE_TROPHY_KEY_FRAGMENT,
      SPECIALIZED_ITEMTYPE_TROPHY_MUSEUM_PIECE,
      SPECIALIZED_ITEMTYPE_TROPHY_RECIPE_FRAGMENT,
      SPECIALIZED_ITEMTYPE_TROPHY_RUNEBOX_FRAGMENT,
      SPECIALIZED_ITEMTYPE_TROPHY_SCROLL,
      SPECIALIZED_ITEMTYPE_TROPHY_SURVEY_REPORT,
      SPECIALIZED_ITEMTYPE_TROPHY_TOY,
      SPECIALIZED_ITEMTYPE_TROPHY_TREASURE_MAP,
    ],
  },
  "miscellaneous-bait": { category: "Misc", buildTypes: () => [ITEMTYPE_LURE] },
  "miscellaneous-stolen": { category: "Stolen", buildTypes: () => NO_TYPES },
  "miscellaneous-junk": { category: "Junk", buildTypes: () => [ITEMTYPE_TRASH] },
  "miscellaneous-scribing": {
    category: "Misc",
    buildTypes: () => [
      ITEMTYPE_SCRIBING_INK,
      ITEMTYPE_CRAFTED_ABILITY,
      ITEMTYPE_CRAFTED_ABILITY_SCRIPT,
    ],
  },
  "miscellaneous-collectibles": {
    category: "MiscSubfilter",
    buildTypes: () => [
      SPECIALIZED_ITEMTYPE_COLLECTIBLE_MONSTER_TROPHY,
      SPECIALIZED_ITEMTYPE_COLLECTIBLE_RARE_FISH,
      SPECIALIZED_ITEMTYPE_COLLECTIBLE_STYLE_PAGE,
      SPECIALIZED_ITEMTYPE_FISH,
      SPECIALIZED_ITEMTYPE_TREASURE,
    ],
  },
}

function browserCategories(this: void): readonly CategoryDef[] {
  const pages = $pagesOfType<CategoryPageRow>(temperBrowserCategory)
  const defs: CategoryDef[] = []
  for (const placed of placedCategories(pages)) {
    const own = MATCHING_BY_SLUG[placed.slug]
    if (own === undefined) continue
    const subfilters: SubfilterDef[] = []
    for (const sub of placed.subfilters) {
      const matching = MATCHING_BY_SLUG[sub.slug]
      if (matching === undefined) continue
      subfilters.push({
        label: sub.label,
        category: matching.category,
        buildTypes: matching.buildTypes,
      })
    }
    defs.push({
      label: placed.label,
      category: own.category,
      buildTypes: own.buildTypes,
      subfilters,
    })
  }
  return defs
}

export const BROWSER_CATEGORIES: readonly CategoryDef[] = browserCategories()
