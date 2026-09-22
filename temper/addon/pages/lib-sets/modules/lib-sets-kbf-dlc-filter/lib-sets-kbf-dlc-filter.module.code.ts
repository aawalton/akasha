import {
  asNumber,
  asStringOpt,
  asStrRecord,
} from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-casts/lib-sets-casts.module.code.ts"
import type { FilterBuildContext } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-kbf-filter-context/lib-sets-kbf-filter-context.module.code.ts"
import { LSM_DEFAULT_COMBO_BOX_OPTIONS } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-kbf-lsm-options/lib-sets-kbf-lsm-options.module.code.ts"
import {
  SORT_BY_ALL,
  sortFilterComboBox,
} from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-kbf-sorting/lib-sets-kbf-sorting.module.code.ts"
import {
  defaultMultiSelectSelectedText,
  setupFilterDropdown,
} from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-search-ui-keyboard-filters-setup/lib-sets-search-ui-keyboard-filters-setup.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-scrollable-menu/lib-scrollable-menu.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-sets/lib-sets.type-declaration.d.ts"
import "akasha/temper/addon/pages/lib-sets/lib-sets-search-ui-shapes/lib-sets-search-ui-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-lib/lib-sets-lib.module.code.ts"

const getLocalizedText = lib.GetLocalizedText
const lib_CleanDLCTimeStamp = lib.CleanDLCTimeStamp

const LSM_comboBoxOptionsDLCID = asStrRecord(ZO_ShallowTableCopy(LSM_DEFAULT_COMBO_BOX_OPTIONS))

export function buildDlcFilter(this: void, ctx: FilterBuildContext): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const lsmDropdowns = self.LSM_Dropdowns
  const dropdownToParamName = self.multiSelectFilterDropdownToSearchParamName
  const filterTypeText = getLocalizedText("dlc")
  const dlcIdDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.DCLIdFiltersControl,
    filterTypeText,
    multiSelectSelectedText: defaultMultiSelectSelectedText(filterTypeText),
    sortsItems: true,
    lsmOptions: LSM_comboBoxOptionsDLCID,
    isLSMEnabled: false,
    onEnter,
    onExit,
  })
  self.DLCIdFiltersDropdown = dlcIdDropdown
  if (isLSMEnabled && lsmDropdowns !== undefined) {
    LSM_comboBoxOptionsDLCID.customFilterFunc = function (
      this: void,
      comboBoxItem: SearchUIComboBoxItem,
      filterString: string
    ): boolean {
      let found = false
      const name = comboBoxItem.label ?? comboBoxItem.name
      const tooltip = comboBoxItem.tooltipText
      const filterStringLower = zo_strlower(filterString)
      if (name !== undefined && name !== "") {
        found = string.find(zo_strlower(name), filterStringLower)[0] !== undefined
      }
      if (!found && tooltip !== undefined && tooltip !== "") {
        found = string.find(zo_strlower(tooltip), filterStringLower)[0] !== undefined
      }
      return found
    }

    const getCurrentDLCIDSortKey = (): string =>
      lib.svData?.setSearchDLCDropdownSortBy === 2 ? "releaseDateTimeStamp" : "nameClean"
    const dlcIdCustomSortFunc = function (
      this: void,
      _item1: SearchUIComboBoxItem,
      _item2: SearchUIComboBoxItem,
      comboBoxObject: SearchUIComboBox
    ): undefined {
      const sortKey = getCurrentDLCIDSortKey()
      sortFilterComboBox(comboBoxObject, sortKey, false)
    }
    LSM_comboBoxOptionsDLCID.customSortKeys = SORT_BY_ALL
    LSM_comboBoxOptionsDLCID.customSortKey = getCurrentDLCIDSortKey()
    LSM_comboBoxOptionsDLCID.customSortFunc = dlcIdCustomSortFunc
    LSM_comboBoxOptionsDLCID.enableSort = true
    const dlcParamName = dropdownToParamName.get(self.DCLIdFiltersControl)
    if (dlcParamName !== undefined) {
      lsmDropdowns[dlcParamName] = AddCustomScrollableComboBoxDropdownMenu(
        filters,
        self.DCLIdFiltersControl,
        LSM_comboBoxOptionsDLCID
      )
    }
  }

  for (const [dlcId, isValid] of pairs(lib.allowedDLCIds)) {
    if (isValid === true) {
      const [dlcName, releaseDateTimestamp] = lib.GetDLCInfo(asNumber(dlcId))
      const entry = dlcIdDropdown.CreateItemEntry(dlcName)
      entry.filterType = asNumber(dlcId)
      entry.nameClean = dlcName
      entry.releaseDateTimeStamp = releaseDateTimestamp
      const [, cleanedReleaseDate] = lib_CleanDLCTimeStamp(releaseDateTimestamp, true)
      entry.tooltipText = asStringOpt(cleanedReleaseDate)
      dlcIdDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
    }
  }
  dlcIdDropdown._sortFunc = function (this: void): undefined {}

  dlcIdDropdown.SetSortsItems(true)
}
