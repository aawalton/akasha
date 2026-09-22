import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const STRINGS: Record<string, string> = {
  SI_TEMPER_SCROLLABLEMENU_SEARCH_FILTER_TOOLTIP:
    "Enter a search term to filter the menus and (nested) submenu entries.\nPrefix search with '/' shows non matching submenu-entries too",

  SI_TEMPER_SCROLLABLEMENU_CNTXT_CHECK_ALL: "Check all",
  SI_TEMPER_SCROLLABLEMENU_CNTXT_CHECK_NONE: "Check none",
  SI_TEMPER_SCROLLABLEMENU_CNTXT_CHECK_INVERT: "Invert",

  SI_TEMPER_SCROLLABLEMENU_SLIDER_CURRENT_MIN_MAX_STEP: "Current: %q (Min.: %s/Max.: %s, step: %s)",
}

for (const [stringId, stringValue] of pairs(STRINGS)) {
  ZO_CreateStringId(stringId, stringValue)
  SafeAddVersion(stringId, 1)
}
