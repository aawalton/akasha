import type { ScribingType } from "akasha/temper/addon/pages/items/crafting-station/modules/knowledge-shape/knowledge-shape.module.code.ts"
import { INTERNAL } from "akasha/temper/addon/pages/items/crafting-station/modules/knowledge-state/knowledge-state.module.code.ts"
import type { Category } from "akasha/temper/addon/pages/items/crafting-station/modules/knowledge-types/knowledge-types.module.code.ts"
import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-16/eso-enums-16.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"

function asScribingType(value: {
  order: number
  know: (this: void, id: number) => boolean
}): ScribingType {
  return value as ScribingType
}

INTERNAL.Categories = [INTERNAL.CATEGORY_RECIPE, INTERNAL.CATEGORY_PLAN, INTERNAL.CATEGORY_MOTIF]

const SCRIBING_TYPES: Record<Category, ScribingType> = {}
SCRIBING_TYPES[INTERNAL.SCRIBE_GRIMOIRE] = asScribingType({
  order: 1,
  know: IsCraftedAbilityUnlocked,
})
SCRIBING_TYPES[INTERNAL.SCRIBE_SCRIPT] = asScribingType({
  order: 2,
  know: IsCraftedAbilityScriptUnlocked,
})
INTERNAL.ScribingTypes = SCRIBING_TYPES

INTERNAL.ItemIdStores = [
  INTERNAL.CATEGORY_RECIPE,
  INTERNAL.CATEGORY_PLAN,
  INTERNAL.CATEGORY_MOTIF,
  INTERNAL.SCRIBE_GRIMOIRE,
  INTERNAL.SCRIBE_SCRIPT,
]

INTERNAL.DataStores = [
  INTERNAL.CATEGORY_RECIPE,
  INTERNAL.CATEGORY_PLAN,
  INTERNAL.CATEGORY_MOTIF,
  INTERNAL.CATEGORY_SCRIBING,
  INTERNAL.CATEGORY_RESEARCH,
]

const KNOW_FUNCTIONS: Record<Category, (this: void, itemLink: string) => boolean> = {}
KNOW_FUNCTIONS[INTERNAL.CATEGORY_RECIPE] = IsItemLinkRecipeKnown
KNOW_FUNCTIONS[INTERNAL.CATEGORY_PLAN] = IsItemLinkRecipeKnown
KNOW_FUNCTIONS[INTERNAL.CATEGORY_MOTIF] = IsItemLinkBookKnown
INTERNAL.KnowFunctions = KNOW_FUNCTIONS

const CATEGORY_LABELS: Record<Category, string> = {}
CATEGORY_LABELS[INTERNAL.CATEGORY_RECIPE] = zo_strformat(
  "<<1>>",
  GetString("SI_ITEMTYPE", ITEMTYPE_RECIPE)
)
CATEGORY_LABELS[INTERNAL.CATEGORY_PLAN] = zo_strformat(
  "<<1>>",
  GetString(
    "SI_PROVISIONERSPECIALINGREDIENTTYPE_TRADINGHOUSERECIPECATEGORY",
    PROVISIONER_SPECIAL_INGREDIENT_TYPE_FURNISHING
  )
)
CATEGORY_LABELS[INTERNAL.CATEGORY_MOTIF] = zo_strformat(
  "<<1>>",
  GetString("SI_ITEMTYPE", ITEMTYPE_RACIAL_STYLE_MOTIF)
)
CATEGORY_LABELS[INTERNAL.CATEGORY_SCRIBING] = GetString(SI_SCRIBING_TITLE)
CATEGORY_LABELS[INTERNAL.CATEGORY_RESEARCH] = GetString(SI_SMITHING_TAB_RESEARCH)
INTERNAL.CategoryLabels = CATEGORY_LABELS

const ITEM_QUALITY_TRANSLATION: Record<number, number> = {}
ITEM_QUALITY_TRANSLATION[ITEM_FUNCTIONAL_QUALITY_TRASH] = INTERNAL.QUALITY_LOW
ITEM_QUALITY_TRANSLATION[ITEM_FUNCTIONAL_QUALITY_NORMAL] = INTERNAL.QUALITY_LOW
ITEM_QUALITY_TRANSLATION[ITEM_FUNCTIONAL_QUALITY_MAGIC] = INTERNAL.QUALITY_LOW
ITEM_QUALITY_TRANSLATION[ITEM_FUNCTIONAL_QUALITY_ARCANE] = INTERNAL.QUALITY_MEDIUM
ITEM_QUALITY_TRANSLATION[ITEM_FUNCTIONAL_QUALITY_ARTIFACT] = INTERNAL.QUALITY_HIGH
ITEM_QUALITY_TRANSLATION[ITEM_FUNCTIONAL_QUALITY_LEGENDARY] = INTERNAL.QUALITY_HIGH
INTERNAL.ItemQualityTranslation = ITEM_QUALITY_TRANSLATION
