import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const LSB_STRINGS: Record<string, string> = {
  LIBSHIFTERBOX_ALLREADY_LOADED: "Is already loaded",
  LIBSHIFTERBOX_EMPTY: "empty",
  LIBSHIFTERBOX_DRAG_MULTIPLE: " and <<1[no further rows/1 further row/$d further rows]>>",
}

export function registerLibShifterBoxStrings(this: void): undefined {
  for (const [key, value] of pairs(LSB_STRINGS)) {
    ZO_CreateStringId(key, value)
    SafeAddVersion(key, 1)
  }
}
