import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"

const RAW_ITEM_TYPE_LIST: number[] = [
  ITEMTYPE_BLACKSMITHING_RAW_MATERIAL,
  ITEMTYPE_CLOTHIER_RAW_MATERIAL,
  ITEMTYPE_WOODWORKING_RAW_MATERIAL,
  ITEMTYPE_JEWELRYCRAFTING_RAW_MATERIAL,
  ITEMTYPE_JEWELRYCRAFTING_RAW_BOOSTER,
  ITEMTYPE_JEWELRY_RAW_TRAIT,
  ITEMTYPE_RAW_MATERIAL,
]

const RAW_ITEM_TYPES: Record<string | number, true> = {}
for (const [, itemType] of ipairs(RAW_ITEM_TYPE_LIST)) {
  RAW_ITEM_TYPES[itemType] = true
}

export const RawItemTypes: Record<string | number, true> = RAW_ITEM_TYPES
