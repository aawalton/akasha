import {
  asBoolean,
  asLsmCastBooleanUndefined,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastNumberUndefined,
  asLsmCastRecordStringUnknown,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastStringUndefined } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-2c/scrollable-menu-casts-2c.module.code.ts"
import { asString } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"
import {
  COMBO_BOX_DEFAULTS,
  COMBO_BOX_MAPPING,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-constants-combobox/scrollable-menu-constants-combobox.module.code.ts"
import { getValueOrCallback } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-combobox-shapes/scrollable-menu-combobox-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-library-shapes/scrollable-menu-library-shapes.type-declaration.d.ts"

type LsmCastLocalComboBoxOptionTarget = ComboBoxOptionTarget
function asLsmCastLocalComboBoxOptionTarget(value: unknown): LsmCastLocalComboBoxOptionTarget {
  return value as LsmCastLocalComboBoxOptionTarget
}

interface ComboBoxOptionTarget {
  GetOptions: (this: ComboBoxOptionTarget) => Record<string, unknown>
  DisableMultiSelect: (this: ComboBoxOptionTarget) => undefined
  SetMaxSelections: (this: ComboBoxOptionTarget, n: number | undefined) => undefined
  SetMaxSelectionsErrorText: (this: ComboBoxOptionTarget, t: string) => undefined
  SetOnSelectionBlockedCallback: (this: ComboBoxOptionTarget, c: unknown) => undefined
  EnableMultiSelect: (this: ComboBoxOptionTarget, f: unknown, n: string) => undefined
  SetFont: (this: ComboBoxOptionTarget, f: unknown) => undefined
  UpdateHeight: (this: ComboBoxOptionTarget, d: unknown) => undefined
  UpdateWidth: (this: ComboBoxOptionTarget, d: unknown) => undefined
  SetPreshowDropdownCallback: (this: ComboBoxOptionTarget, c: unknown) => undefined
  SetSortsItems: (this: ComboBoxOptionTarget, s: unknown) => undefined
  SetSortOrder: (this: ComboBoxOptionTarget, o: unknown, t: unknown) => undefined
  SetSpacing: (this: ComboBoxOptionTarget, s: unknown) => undefined
  [key: string]: unknown
}

function updateMultiSelectionOptions(
  this: void,
  comboBoxObject: ComboBoxObject,
  isMultiSelectionEnabled: boolean | undefined,
  maxNumSelections: number | undefined,
  maxNumSelectionsErrorText: string | undefined,
  multiSelectionTextFormatter: unknown,
  noSelectionText: string | undefined,
  onSelectionBlockedCallback: unknown
): undefined {
  const cbo = asLsmCastLocalComboBoxOptionTarget(comboBoxObject)
  const options = cbo.GetOptions()
  const updatedOptions = asLsmCastRecordStringUnknown(comboBoxObject.updatedOptions)

  const isMultiSelectionEnabledPassedIn = isMultiSelectionEnabled

  let isMultiSel = isMultiSelectionEnabled
  if (isMultiSel === undefined) {
    isMultiSel = asLsmCastBooleanUndefined(updatedOptions.enableMultiSelect) ?? undefined
    if (isMultiSel === undefined) {
      isMultiSel =
        asLsmCastBooleanUndefined(getValueOrCallback(options.enableMultiSelect, options)) ??
        undefined
    }
    if (isMultiSel === undefined) {
      isMultiSel = asBoolean(COMBO_BOX_DEFAULTS.m_enableMultiSelect)
    }
  }

  let maxSel =
    maxNumSelections ??
    asLsmCastNumberUndefined(updatedOptions.maxNumSelections) ??
    asLsmCastNumberUndefined(getValueOrCallback(options.maxNumSelections, options)) ??
    asLsmCastNumberUndefined(COMBO_BOX_DEFAULTS.m_maxNumSelections)
  if (maxSel !== undefined && maxSel < 0) {
    maxSel = undefined
  }
  const maxSelErr =
    maxNumSelectionsErrorText ??
    asLsmCastStringUndefined(updatedOptions.maxNumSelectionsErrorText) ??
    asLsmCastStringUndefined(getValueOrCallback(options.maxNumSelectionsErrorText, options)) ??
    asString(COMBO_BOX_DEFAULTS.m_maxNumSelectionsErrorText)
  const noSelText =
    noSelectionText ??
    asLsmCastStringUndefined(updatedOptions.noSelectionText) ??
    asLsmCastStringUndefined(getValueOrCallback(options.noSelectionText, options)) ??
    asString(COMBO_BOX_DEFAULTS.noSelectionText)
  const multiSelFormatter =
    multiSelectionTextFormatter ??
    updatedOptions.multiSelectionTextFormatter ??
    getValueOrCallback(options.multiSelectionTextFormatter, options) ??
    COMBO_BOX_DEFAULTS.multiSelectionTextFormatter
  const onSelBlocked =
    onSelectionBlockedCallback ??
    updatedOptions.OnSelectionBlockedCallback ??
    options.OnSelectionBlockedCallback ??
    COMBO_BOX_DEFAULTS.onSelectionBlockedCallback

  updatedOptions.maxNumSelections = maxSel
  updatedOptions.maxNumSelectionsErrorText = maxSelErr
  updatedOptions.noSelectionText = noSelText
  updatedOptions.multiSelectionTextFormatter = multiSelFormatter
  updatedOptions.OnSelectionBlockedCallback = onSelBlocked

  if (isMultiSel === false) {
    if (isMultiSelectionEnabledPassedIn === false && comboBoxObject.isContextMenu !== true) {
      cbo.DisableMultiSelect()
    }
    return
  }

  cbo.SetMaxSelections(maxSel)
  cbo.SetMaxSelectionsErrorText(maxSelErr)
  cbo.SetOnSelectionBlockedCallback(onSelBlocked)
  cbo.EnableMultiSelect(multiSelFormatter, noSelText)
}

const LSM_OPTIONS_TO_ZO_COMBO_BOX_OPTIONS_CALLBACKS: Record<
  string,
  (this: void, comboBoxObject: ComboBoxObject, value: unknown) => undefined
> = {
  enableMultiSelect: (comboBoxObject, isMultiSelectionEnabled) => {
    updateMultiSelectionOptions(
      comboBoxObject,
      asLsmCastBooleanUndefined(isMultiSelectionEnabled),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  },
  font: (comboBoxObject, font) => {
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).SetFont(font)
  },
  maxDropdownHeight: (comboBoxObject, maxDropdownHeight) => {
    comboBoxObject.maxHeight = asLsmCastNumberUndefined(maxDropdownHeight)
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).UpdateHeight(comboBoxObject.m_dropdown)
  },
  maxDropdownWidth: (comboBoxObject, maxDropdownWidth) => {
    comboBoxObject.maxWidth = asLsmCastNumberUndefined(maxDropdownWidth)
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).UpdateWidth(comboBoxObject.m_dropdown)
  },
  minDropdownWidth: (comboBoxObject, minDropdownWidth) => {
    comboBoxObject.minWidth = asLsmCastNumberUndefined(minDropdownWidth)
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).UpdateWidth(comboBoxObject.m_dropdown)
  },
  maxNumSelections: (comboBoxObject, maxNumSelections) => {
    updateMultiSelectionOptions(
      comboBoxObject,
      undefined,
      asLsmCastNumberUndefined(maxNumSelections),
      undefined,
      undefined,
      undefined,
      undefined
    )
  },
  maxNumSelectionsErrorText: (comboBoxObject, maxNumSelectionsErrorText) => {
    updateMultiSelectionOptions(
      comboBoxObject,
      undefined,
      undefined,
      asLsmCastStringUndefined(maxNumSelectionsErrorText),
      undefined,
      undefined,
      undefined
    )
  },
  multiSelectionTextFormatter: (comboBoxObject, multiSelectionTextFormatter) => {
    updateMultiSelectionOptions(
      comboBoxObject,
      undefined,
      undefined,
      undefined,
      multiSelectionTextFormatter,
      undefined,
      undefined
    )
  },
  noSelectionText: (comboBoxObject, noSelectionText) => {
    updateMultiSelectionOptions(
      comboBoxObject,
      undefined,
      undefined,
      undefined,
      undefined,
      asLsmCastStringUndefined(noSelectionText),
      undefined
    )
  },
  OnSelectionBlockedCallback: (comboBoxObject, onSelectionBlockedCallbackFunc) => {
    updateMultiSelectionOptions(
      comboBoxObject,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      onSelectionBlockedCallbackFunc
    )
  },
  preshowDropdownFn: (comboBoxObject, preshowDropdownCallbackFunc) => {
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).SetPreshowDropdownCallback(
      preshowDropdownCallbackFunc
    )
  },
  sortEntries: (comboBoxObject, sortEntries) => {
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).SetSortsItems(sortEntries)
  },
  sortOrder: (comboBoxObject, sortOrder) => {
    const options = asLsmCastRecordStringUnknown(comboBoxObject.options)
    const updatedOptions = asLsmCastRecordStringUnknown(comboBoxObject.updatedOptions)
    if (updatedOptions.sortType !== undefined) {
      return
    }
    const sortType = getValueOrCallback(options.sortType, options) ?? comboBoxObject.m_sortType
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).SetSortOrder(sortOrder, sortType)
  },
  sortType: (comboBoxObject, sortType) => {
    const options = asLsmCastRecordStringUnknown(comboBoxObject.options)
    const updatedOptions = asLsmCastRecordStringUnknown(comboBoxObject.updatedOptions)
    if (updatedOptions.sortOrder !== undefined && updatedOptions.sortOrder !== false) {
      return
    }
    let sortOrder = getValueOrCallback(options.sortOrder, options)
    if (sortOrder === undefined) {
      sortOrder = comboBoxObject.m_sortOrder
    }
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).SetSortOrder(sortOrder, sortType)
  },
  spacing: (comboBoxObject, spacing) => {
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).SetSpacing(spacing)
  },
  visibleRowsDropdown: (comboBoxObject, visibleRows) => {
    comboBoxObject.visibleRows = asLsmCastNumberUndefined(visibleRows)
    asLsmCastLocalComboBoxOptionTarget(comboBoxObject).UpdateHeight(comboBoxObject.m_dropdown)
  },
}
COMBO_BOX_MAPPING.LSMOptionsToZO_ComboBoxOptionsCallbacks =
  LSM_OPTIONS_TO_ZO_COMBO_BOX_OPTIONS_CALLBACKS
