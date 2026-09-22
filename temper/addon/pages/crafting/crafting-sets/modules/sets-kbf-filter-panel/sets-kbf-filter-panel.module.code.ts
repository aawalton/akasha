import { buildDlcFilter } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-kbf-dlc-filter/sets-kbf-dlc-filter.module.code.ts"
import {
  buildDropLocationFilter,
  buildDropMechanicFilter,
  buildDropZoneFilter,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-kbf-drop-filters/sets-kbf-drop-filters.module.code.ts"
import { buildFavoritesFilter } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-kbf-favorites-filter/sets-kbf-favorites-filter.module.code.ts"
import type { FilterBuildContext } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-kbf-filter-context/sets-kbf-filter-context.module.code.ts"
import {
  buildArmorTypeFilter,
  buildEquipmentTypeFilter,
  buildSetTypeFilter,
  buildWeaponTypeFilter,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-kbf-gear-filters/sets-kbf-gear-filters.module.code.ts"
import {
  buildEnchantmentSearchCategoryFilter,
  buildNumBonusFilter,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-kbf-set-bonus-filters/sets-kbf-set-bonus-filters.module.code.ts"
import { getKeyboardSearchUIClass } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-keyboard-class/sets-search-ui-keyboard-class.module.code.ts"
import {
  onFilterDropdownEntryMouseEnterCallback,
  onFilterDropdownEntryMouseExitCallback,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-keyboard-init/sets-search-ui-keyboard-init.module.code.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes-3/sets-search-ui-shapes-3.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

const checkLSM = lib.CheckLSM

const keyboardClass = getKeyboardSearchUIClass()

keyboardClass.InitializeFilters = function (this: LibSetsSearchUIKeyboardObject): undefined {
  const isLSMEnabled = checkLSM()
  if (isLSMEnabled) {
    this.LSM_Dropdowns = {}
  }

  const ctx: FilterBuildContext = {
    self: this,
    filters: this.filtersControl,
    isLSMEnabled,
    onEnter: onFilterDropdownEntryMouseEnterCallback,
    onExit: onFilterDropdownEntryMouseExitCallback,
  }

  this.UpdateSearchButtonEnabledState(false)

  buildSetTypeFilter(ctx)
  buildArmorTypeFilter(ctx)
  buildWeaponTypeFilter(ctx)
  buildEquipmentTypeFilter(ctx)
  buildDlcFilter(ctx)
  buildEnchantmentSearchCategoryFilter(ctx)
  buildFavoritesFilter(ctx)
  buildNumBonusFilter(ctx)
  buildDropZoneFilter(ctx)
  buildDropMechanicFilter(ctx)
  buildDropLocationFilter(ctx)
}
