import {
  asEsoHandler,
  asLamComboBox,
  asLamControl,
  asUnknownArray,
  asZoComboBoxItem,
} from "akasha/temper/addon/pages/hud/temper-addon-menu/modules/addon-menu-casts/addon-menu-casts.module.code.ts"
import type {
  DropdownData,
  LamControl,
  Valued,
} from "akasha/temper/addon/pages/hud/temper-addon-menu/modules/addon-menu-types/addon-menu-types.module.code.ts"
import {
  getDefaultValue,
  requestRefreshIfNeeded,
} from "akasha/temper/addon/pages/hud/temper-addon-menu/modules/addon-menu-util/addon-menu-util.module.code.ts"
import { setupTooltips } from "akasha/temper/addon/pages/hud/temper-addon-menu/modules/addon-menu-widget-dropdown-tooltips/addon-menu-widget-dropdown-tooltips.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-addon-menu/addon-menu-eso-combobox/addon-menu-eso-combobox.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-addon-menu/addon-menu-eso-controls/addon-menu-eso-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"

export const SORT_BY_VALUE: Record<string, unknown> = { value: {} }

export const SORT_BY_VALUE_NUMERIC: Record<string, unknown> = { value: { isNumeric: true } }

export const SORT_TYPES: Record<string, Record<string, unknown>> = {
  name: ZO_SORT_BY_NAME,
  numeric: ZO_SORT_BY_NAME_NUMERIC,
  value: SORT_BY_VALUE,
  numericvalue: SORT_BY_VALUE_NUMERIC,
}

export const SORT_ORDERS: Record<string, boolean> = {
  up: ZO_SORT_ORDER_UP,
  down: ZO_SORT_ORDER_DOWN,
}

export function getDropdown(this: void, control: LamControl): LamComboBox {
  const dropdown = control.dropdown
  if (dropdown === undefined) {
    assert(false, "[LAM2]Dropdown - missing combobox object")[0]
  }
  return asLamComboBox(dropdown)
}

export function updateMultiSelectSelected(
  this: void,
  control: LamControl,
  data: DropdownData,
  values: unknown[]
): undefined {
  assert(
    values !== undefined,
    string.format("[LAM2]Dropdown - Values for multiSelect %q are missing", control.GetName())
  )[0]

  const dropdown = getDropdown(control)
  dropdown.m_selectedItemData = []
  dropdown.m_multiSelectItemData = []

  const usesChoicesValues = data.choicesValues !== undefined

  for (const toCompare of values) {
    dropdown.SetSelectedItemByEval((entry: ZoComboBoxItem) => {
      if (usesChoicesValues) {
        return entry.value === toCompare
      }
      return entry.name === toCompare
    }, true)
  }
  dropdown.RefreshSelectedItemText()
}

export function callMultiSelectSetFunc(
  this: void,
  control: LamControl,
  data: DropdownData,
  values: unknown[] | undefined
): undefined {
  let resolved = values
  if (resolved === undefined) {
    resolved = []
    const usesChoicesValues = data.choicesValues !== undefined
    const selected = getDropdown(control).GetSelectedItemData()
    const selectedList =
      selected === undefined ? [] : Array.isArray(selected) ? selected : [selected]
    for (const entry of selectedList) {
      if (usesChoicesValues) {
        resolved[resolved.length] = entry.value
      } else {
        resolved[resolved.length] = entry.name
      }
    }
  }
  data.setFunc(resolved)
}

export function dropdownCallback(this: void, ...args: unknown[]): undefined {
  const choiceText = args[1]
  const choice = asZoComboBoxItem(args[2])
  let updateValue = choice.value
  if (updateValue === undefined) {
    updateValue = choiceText
  }
  const choiceControl = asLamControl(choice.control)
  const updateFn = choiceControl.UpdateValue
  if (updateFn !== undefined) {
    updateFn.call(choiceControl, false, updateValue)
  }
}

export function setSelectedFromChoices(
  this: void,
  control: LamControl,
  dropdown: LamComboBox,
  value: unknown
): undefined {
  const choicesTable = control.choices
  let selected: unknown
  if (choicesTable !== undefined && (typeof value === "string" || typeof value === "number")) {
    selected = choicesTable[value]
  } else {
    selected = undefined
  }
  if (selected === undefined || typeof selected === "string" || typeof selected === "number") {
    dropdown.SetSelectedItem(selected)
  }
}

export function grabSortingInfo(this: void, sortInfo: string): string[] {
  const t: string[] = []
  let i = 0
  for (const [info] of string.gmatch(sortInfo, "([^%-]+)")) {
    if (info !== undefined) {
      t[i] = info
    }
    i = i + 1
  }
  return t
}

export function updateChoices(
  this: void,
  control: LamControl,
  dropdownData: DropdownData,
  choices?: string[],
  choicesValues?: unknown[],
  choicesTooltips?: Valued<string | number>[]
): undefined {
  const dropdown = getDropdown(control)
  dropdown.ClearItems()
  const choicesTable = control.choices
  if (choicesTable !== undefined) {
    ZO_ClearTable(choicesTable)
  }

  const resolvedChoices = choices ?? dropdownData.choices
  const resolvedValues = choicesValues ?? dropdownData.choicesValues
  const resolvedTooltips = choicesTooltips ?? dropdownData.choicesTooltips

  if (resolvedValues) {
    assert(
      resolvedChoices.length === resolvedValues.length,
      "choices and choicesValues need to have the same size"
    )[0]
  }

  if (resolvedTooltips) {
    assert(
      resolvedChoices.length === resolvedTooltips.length,
      "choices and choicesTooltips need to have the same size"
    )[0]
    setupTooltips(dropdown)
  }

  for (let i = 0; i < resolvedChoices.length; i++) {
    const choice = resolvedChoices[i]
    if (choice === undefined) {
      continue
    }
    const entry = dropdown.CreateItemEntry(choice, asEsoHandler(dropdownCallback))
    entry.control = control
    if (resolvedValues) {
      entry.value = resolvedValues[i]
    }
    if (resolvedTooltips) {
      entry.tooltip = resolvedTooltips[i]
    }
    let entryValue = entry.value
    if (entryValue === undefined) {
      entryValue = entry.name
    }
    if (
      choicesTable !== undefined &&
      (typeof entryValue === "string" || typeof entryValue === "number")
    ) {
      choicesTable[entryValue] = entry.name
    }

    dropdown.AddItem(
      entry,
      dropdownData.sort !== undefined ? undefined : ZO_COMBOBOX_SUPRESS_UPDATE
    )
  }
}

export function updateValue(
  this: void,
  control: LamControl,
  data: DropdownData,
  forceDefault?: boolean,
  value?: unknown
): undefined {
  const dropdown = getDropdown(control)
  const isMultiSelectionEnabled = control.isMultiSelectionEnabled === true
  if (forceDefault === true) {
    const defaultValue = getDefaultValue<unknown>(data.default)
    if (isMultiSelectionEnabled) {
      const tableValue = asUnknownArray(defaultValue ?? [])
      data.setFunc(tableValue)
      updateMultiSelectSelected(control, data, tableValue)
    } else {
      data.setFunc(defaultValue)
      setSelectedFromChoices(control, dropdown, defaultValue)
    }
  } else if (value !== undefined) {
    if (isMultiSelectionEnabled) {
      const tableValue = Array.isArray(value) ? value : undefined
      callMultiSelectSetFunc(control, data, tableValue)
    } else {
      data.setFunc(value)
    }
    requestRefreshIfNeeded(control)
  } else if (isMultiSelectionEnabled) {
    const values = asUnknownArray(data.getFunc() ?? [])
    updateMultiSelectSelected(control, data, values)
  } else {
    const got = data.getFunc()
    setSelectedFromChoices(control, dropdown, got)
  }
}
