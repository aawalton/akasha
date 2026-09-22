import { buildDlcFilter } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-kbf-dlc-filter/lib-sets-kbf-dlc-filter.module.code.ts"
import {
  buildDropLocationFilter,
  buildDropMechanicFilter,
  buildDropZoneFilter,
} from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-kbf-drop-filters/lib-sets-kbf-drop-filters.module.code.ts"
import { buildFavoritesFilter } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-kbf-favorites-filter/lib-sets-kbf-favorites-filter.module.code.ts"
import type { FilterBuildContext } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-kbf-filter-context/lib-sets-kbf-filter-context.module.code.ts"
import {
  buildArmorTypeFilter,
  buildEquipmentTypeFilter,
  buildSetTypeFilter,
  buildWeaponTypeFilter,
} from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-kbf-gear-filters/lib-sets-kbf-gear-filters.module.code.ts"
import {
  buildEnchantmentSearchCategoryFilter,
  buildNumBonusFilter,
} from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-kbf-set-bonus-filters/lib-sets-kbf-set-bonus-filters.module.code.ts"
import { getKeyboardSearchUIClass } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-search-ui-keyboard-class/lib-sets-search-ui-keyboard-class.module.code.ts"
import {
  onFilterDropdownEntryMouseEnterCallback,
  onFilterDropdownEntryMouseExitCallback,
} from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-search-ui-keyboard-init/lib-sets-search-ui-keyboard-init.module.code.ts"
import "akasha/temper/addon/type/lib-sets/lib-sets.type-declaration.d.ts"
import "akasha/temper/addon/pages/lib-sets/lib-sets-search-ui-shapes-3/lib-sets-search-ui-shapes-3.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-lib/lib-sets-lib.module.code.ts"

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
