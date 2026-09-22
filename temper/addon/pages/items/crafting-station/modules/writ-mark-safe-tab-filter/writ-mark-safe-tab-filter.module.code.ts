import { SHOW_TRAIT_HIDDEN_COLUMNS } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-mark-constants/writ-mark-constants.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"

export function safeGetTabFilterInfo(
  this: void,
  base: (this: void) => LuaMultiReturn<unknown[]>,
  applyTrait: boolean
): LuaMultiReturn<unknown[]> {
  const [ok, packed] = pcall((): unknown[] => {
    const results = [...base()]
    if (applyTrait && results[0] === ITEM_TYPE_DISPLAY_CATEGORY_CONSUMABLE) {
      results[2] = SHOW_TRAIT_HIDDEN_COLUMNS
    }
    return results
  })
  if (!ok) {
    return $multi(undefined, undefined, undefined)
  }
  return $multi(...packed)
}
