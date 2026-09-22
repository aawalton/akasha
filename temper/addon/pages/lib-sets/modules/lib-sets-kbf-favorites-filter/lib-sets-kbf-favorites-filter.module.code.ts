import type { FilterBuildContext } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-kbf-filter-context/lib-sets-kbf-filter-context.module.code.ts"
import { LSM_DEFAULT_COMBO_BOX_OPTIONS } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-kbf-lsm-options/lib-sets-kbf-lsm-options.module.code.ts"
import {
  defaultMultiSelectSelectedText,
  setupFilterDropdown,
} from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-search-ui-keyboard-filters-setup/lib-sets-search-ui-keyboard-filters-setup.module.code.ts"
import { searchUI } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-search-ui-shared-state/lib-sets-search-ui-shared-state.module.code.ts"
import "akasha/temper/addon/type/lib-sets/lib-sets.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings-2/eso-lib-sets-strings-2.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-lib/lib-sets-lib.module.code.ts"

const getLocalizedText = lib.GetLocalizedText

const favoriteIconTexts = searchUI.favoriteIconTexts

export function buildFavoritesFilter(this: void, ctx: FilterBuildContext): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const filterTypeText = getLocalizedText("favorites")
  const favoritesDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.favoritesFiltersControl,
    filterTypeText,
    multiSelectSelectedText: defaultMultiSelectSelectedText(filterTypeText),
    sortsItems: false,
    lsmOptions: LSM_DEFAULT_COMBO_BOX_OPTIONS,
    isLSMEnabled,
    onEnter,
    onExit,
  })
  self.favoritesDropdown = favoritesDropdown
  const noFavEntry = favoritesDropdown.CreateItemEntry(GetString(SI_ARMORTYPE0))
  noFavEntry.filterType = 0
  noFavEntry.nameClean = "No favorite"
  favoritesDropdown.AddItem(noFavEntry)

  for (const favoriteCategoryData of lib.possibleSetSearchFavoriteCategories) {
    const favoriteCategory = favoriteCategoryData.category
    const favIcon = favoriteIconTexts[favoriteCategory] ?? ""
    const entry = favoritesDropdown.CreateItemEntry(
      `${favIcon} ${zo_strformat("<<C:1>>", favoriteCategory)}`
    )
    entry.filterType = favoriteCategory
    entry.nameClean = favoriteCategory
    favoritesDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
  }
  favoritesDropdown.UpdateItems()
}
