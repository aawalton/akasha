import {
  asComboBoxBase,
  asControl,
  asDropdownClass,
  asDropdownClassPrivate,
  asDropdownComboBox,
  asDropdownScrollControl,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { asLsmCastDisableFadeGradientBoolean } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import {
  asLsmCastGetBaseHeightThisUnknownControlUnknownNumber,
  asLsmCastGetContainerThisUnknownUnknown,
  asLsmCastGetMaxDropdownWidthThisUnknownNumberUndefined,
  asLsmCastGetMinDropdownWidthThisUnknownNumberUndefined,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-1c/scrollable-menu-casts-1c.module.code.ts"
import { asLsmCastRecordStringUnknown } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastSetSpacingThisUnknownSpacingNumberUndefined } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-2c/scrollable-menu-casts-2c.module.code.ts"
import { asLsmCastThisVoidArgsUnknownUndefined } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import { asLsmCastThisVoidControlUnknownAltUnknownString } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastUnknown,
  asUnknown,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { lib } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-state/scrollable-menu-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-dropdown-object-shapes/scrollable-menu-dropdown-object-shapes.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-dropdown-shapes/scrollable-menu-dropdown-shapes.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-game-shapes/scrollable-menu-game-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-addon-list/eso-addon-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-fonts/eso-fonts.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-library-shapes/scrollable-menu-library-shapes.type-declaration.d.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidArgsUnknownUndefined(libDebug.DebugLog)

const tos = tostring

const constants = lib.constants
const searchFilterConstants = asLsmCastRecordStringUnknown(constants.searchFilter)
const dropdownConstants = asLsmCastRecordStringUnknown(constants.dropdown)
const DROPDOWN_DEFAULTS = asLsmCastRecordStringUnknown(dropdownConstants.defaults)

const NO_ENTRIES_RESULTS = searchFilterConstants.noEntriesResults

const MIN_WIDTH_WITHOUT_SEARCH_HEADER = DROPDOWN_DEFAULTS.MIN_WIDTH_WITHOUT_SEARCH_HEADER
void MIN_WIDTH_WITHOUT_SEARCH_HEADER

const getControlName = asLsmCastThisVoidControlUnknownAltUnknownString(lib.Util.getControlName)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const dropdownClassPrivate = asDropdownClassPrivate(classes.dropdownClassPrivate)
const dropdownClass = asDropdownClass(classes.dropdownClass)

interface LsmFilterScratch {
  lastEntryVisible: boolean
}
const FILTER_SCRATCH: LsmFilterScratch = { lastEntryVisible: true }
lib.lsmFilterScratch = FILTER_SCRATCH

type LsmInitDropdownFilterState = (
  this: void,
  self: DropdownObject,
  comboBox: DropdownComboBox,
  comboBoxObject: DropdownComboBox
) => boolean
function asLsmInitDropdownFilterState(value: unknown): LsmInitDropdownFilterState {
  return value as LsmInitDropdownFilterState
}

type LsmItemPassesFilter = (
  this: void,
  item: Record<string, unknown>,
  comboBox: unknown,
  doFilter: unknown,
  dropdownObject: unknown
) => unknown
function asLsmItemPassesFilter(value: unknown): LsmItemPassesFilter {
  return value as LsmItemPassesFilter
}

dropdownClass.Show = function (
  this: DropdownObject,
  comboBox: DropdownComboBox,
  itemTable: unknown[],
  minWidth: number,
  maxWidth: number,
  maxHeight: number,
  spacing: number
): undefined {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      75,
      tos(getControlName(asLsmCastGetContainerThisUnknownUnknown(comboBox).GetContainer())),
      tos(minWidth),
      tos(maxWidth),
      tos(maxHeight),
      tos(spacing)
    )
  }

  this.owner = asComboBoxBase(comboBox)

  const comboBoxObject = asDropdownComboBox(this.m_comboBox)

  const textSearchEnabled = asLsmInitDropdownFilterState(lib.lsmInitDropdownFilterState)(
    this,
    comboBox,
    comboBoxObject
  )
  const itemPassesFilter = asLsmItemPassesFilter(lib.lsmItemPassesFilter)

  const control = asControl(this.control)
  const scrollControl = asControl(this.scrollControl)

  ZO_ScrollList_Clear(scrollControl)

  asLsmCastSetSpacingThisUnknownSpacingNumberUndefined(this).SetSpacing(spacing)

  const numItems = itemTable.length
  let largestEntryWidth = 0
  const dataList = asLsmCastUnknown(ZO_ScrollList_GetDataList(scrollControl))

  let allItemsHeight =
    asLsmCastGetBaseHeightThisUnknownControlUnknownNumber(comboBox).GetBaseHeight(control)

  let anyItemMatchesFilter = false

  for (let i = 1; i <= numItems; i++) {
    const item = asLsmCastRecordStringUnknown(itemTable[i - 1])
    const isLastEntry = i === numItems

    const itemMatchesFilter = itemPassesFilter(item, comboBox, textSearchEnabled, this)
    if (itemMatchesFilter && !anyItemMatchesFilter) {
      anyItemMatchesFilter = true
    }
    FILTER_SCRATCH.lastEntryVisible = !!itemMatchesFilter
    const addItem =
      itemMatchesFilter === true || (isLastEntry && ZO_IsTableEmpty(dataList) && true) || false
    const itemToAdd =
      (addItem && ((itemMatchesFilter && item) || (!itemMatchesFilter && NO_ENTRIES_RESULTS))) ||
      undefined

    if (addItem && itemToAdd !== undefined) {
      ;[allItemsHeight, largestEntryWidth] = dropdownClassPrivate.addEntryToScrollList(
        this,
        asUnknown(asLsmCastRecordStringUnknown(asLsmCastRecordStringUnknown(itemToAdd))),
        dataList,
        i,
        allItemsHeight,
        largestEntryWidth,
        spacing,
        isLastEntry,
        !anyItemMatchesFilter,
        comboBoxObject
      )
    }
  }

  largestEntryWidth = largestEntryWidth + 5
  const longestEntryTextWidth =
    largestEntryWidth + ZO_COMBO_BOX_ENTRY_TEMPLATE_LABEL_PADDING * 2 + ZO_SCROLL_BAR_WIDTH

  const minDropdownWidth =
    asLsmCastGetMinDropdownWidthThisUnknownNumberUndefined(comboBoxObject).GetMinDropdownWidth()
  if (minDropdownWidth != null && minDropdownWidth > minWidth) {
    minWidth = minDropdownWidth
  }
  const maxDropdownWidth =
    asLsmCastGetMaxDropdownWidthThisUnknownNumberUndefined(comboBoxObject).GetMaxDropdownWidth()
  const totalDropDownWidth =
    maxDropdownWidth !== undefined && maxDropdownWidth < longestEntryTextWidth
      ? maxDropdownWidth
      : (longestEntryTextWidth ?? maxWidth)
  const desiredWidth = zo_clamp(totalDropDownWidth, minWidth, totalDropDownWidth)

  let desiredHeight = maxHeight
  ApplyTemplateToControl(
    asControl(asDropdownScrollControl(scrollControl).contents),
    dropdownClassPrivate.getScrollContentsTemplate(allItemsHeight < desiredHeight)
  )
  allItemsHeight = allItemsHeight + ZO_SCROLLABLE_COMBO_BOX_LIST_PADDING_Y * 2 + 1

  if (allItemsHeight < desiredHeight) {
    desiredHeight = allItemsHeight
  }

  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      76,
      tos(totalDropDownWidth),
      tos(allItemsHeight),
      tos(desiredHeight)
    )
  }

  ZO_Scroll_SetUseFadeGradient(
    scrollControl,
    !asLsmCastDisableFadeGradientBoolean(this.owner).disableFadeGradient
  )
  control.SetWidth(desiredWidth)
  control.SetHeight(desiredHeight)

  ZO_ScrollList_SetHeight(scrollControl, desiredHeight)
  ZO_ScrollList_Commit(scrollControl)
}
