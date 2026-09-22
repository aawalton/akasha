import {
  asControl,
  asLamComboBox,
  asLamFactory,
  asSortKeyTable,
  asUpdateChoicesFn,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-casts/addon-menu-casts.module.code.ts"
import { WIDGET_VERSION } from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-constants/addon-menu-constants.module.code.ts"
import {
  registerWidget,
  TEMPER_ADDON_MENU_CREATE_CONTROL,
  wm,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-state/addon-menu-state.module.code.ts"
import type {
  DropdownData,
  LamControl,
  Valued,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-types/addon-menu-types.module.code.ts"
import {
  createLabelAndContainerControl,
  getDefaultValue,
  registerForRefreshIfNeeded,
  registerForReloadIfNeeded,
  updateWarning,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-util/addon-menu-util.module.code.ts"
import {
  callMultiSelectSetFunc,
  getDropdown,
  grabSortingInfo,
  SORT_BY_VALUE,
  SORT_ORDERS,
  SORT_TYPES,
  updateChoices,
  updateValue,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-widget-dropdown-choices/addon-menu-widget-dropdown-choices.module.code.ts"
import { setDropdownHeight } from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-widget-dropdown-scroll/addon-menu-widget-dropdown-scroll.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-addon-menu/addon-menu-eso-window/addon-menu-eso-window.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-addon-menu/addon-menu-string-ids/addon-menu-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-addon-screen/eso-addon-screen.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings-2/eso-lib-sets-strings-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-options-menu/eso-options-menu.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

function updateDisabled(this: LamControl): undefined {
  const data = this.data
  let disable: boolean | undefined
  if (typeof data.disabled === "function") {
    disable = data.disabled()
  } else {
    disable = data.disabled
  }

  getDropdown(this).SetEnabled(disable !== true)
  const label = this.label
  if (label !== undefined) {
    if (disable === true) {
      const [r, g, b, a] = ZO_DEFAULT_DISABLED_COLOR.UnpackRGBA()
      label.SetColor(r, g, b, a)
    } else {
      const [r, g, b, a] = ZO_DEFAULT_ENABLED_COLOR.UnpackRGBA()
      label.SetColor(r, g, b, a)
    }
  }
}

function onMultiSelectComboBoxMouseUp(
  this: void,
  control: LamControl,
  data: DropdownData,
  ...args: unknown[]
): undefined {
  const combobox = asControl(args[0])
  const button = args[1]
  const upInside = args[2]
  if (button === MOUSE_BUTTON_INDEX_RIGHT && upInside === true) {
    ClearMenu()
    const lDropdown = asLamComboBox(ZO_ComboBox_ObjectFromContainer(combobox))

    AddMenuItem(GetString(SI_ITEMFILTERTYPE0), () => {
      lDropdown.m_multiSelectItemData = []
      const maxSelections = lDropdown.m_maxNumSelections
      const sortedItems = lDropdown.m_sortedItems
      for (let index = 0; index < sortedItems.length; index++) {
        const luaIndex = index + 1
        if (maxSelections === undefined || maxSelections === 0 || maxSelections >= luaIndex) {
          lDropdown.SetSelected(luaIndex, true)
        }
      }
      lDropdown.RefreshSelectedItemText()
      callMultiSelectSetFunc(control, data, undefined)
    })
    AddMenuItem(GetString(SI_KEEPRESOURCETYPE0), () => {
      lDropdown.ClearAllSelections()
      callMultiSelectSetFunc(control, data, undefined)
    })
    ShowMenu(combobox)
  }
}

function createDropdown(
  this: void,
  parent: LamControl,
  dropdownData: DropdownData,
  controlName?: string
): LamControl {
  const control = createLabelAndContainerControl(parent, dropdownData, controlName)
  control.choices = {}

  let countControl: { comboboxCount?: number } = parent
  let name = parent.GetName()
  if (name === "") {
    countControl = TEMPER_ADDON_MENU_CREATE_CONTROL
    name = "LAM"
  }
  const comboboxCount = (countControl.comboboxCount ?? 0) + 1
  countControl.comboboxCount = comboboxCount
  const container = control.container
  const combobox = wm.CreateControlFromVirtual(
    zo_strjoin("", name, "Combobox", comboboxCount),
    container,
    "ZO_ComboBox"
  )
  control.combobox = combobox

  combobox.SetAnchor(TOPLEFT)
  if (container !== undefined) {
    const [cw, ch] = container.GetDimensions()
    combobox.SetDimensions(cw, ch)
  }
  combobox.SetHandler("OnMouseEnter", () => {
    ZO_Options_OnMouseEnter(asControl(control))
  })
  combobox.SetHandler("OnMouseExit", () => {
    ZO_Options_OnMouseExit(asControl(control))
  })
  const dropdown = asLamComboBox(ZO_ComboBox_ObjectFromContainer(combobox))
  control.dropdown = dropdown
  dropdown.SetSortsItems(false)
  dropdown.m_containerWidth = combobox.GetWidth()

  const isMultiSelectionEnabled = getDefaultValue<boolean | undefined>(dropdownData.multiSelect)
  control.isMultiSelectionEnabled = isMultiSelectionEnabled

  if (isMultiSelectionEnabled === true) {
    combobox.SetHandler(
      "OnMouseUp",
      (...mouseArgs: unknown[]) => {
        onMultiSelectComboBoxMouseUp(control, dropdownData, ...mouseArgs)
      },
      "LAM2DropdownWidgetOnMouseUp"
    )

    const multiSelectionTextFormatter =
      getDefaultValue<string | number | undefined>(dropdownData.multiSelectTextFormatter) ??
      GetString(SI_COMBO_BOX_DEFAULT_MULTISELECTION_TEXT_FORMATTER)
    const multiSelectionNoSelectionText =
      getDefaultValue<string | number | undefined>(dropdownData.multiSelectNoSelectionText) ??
      GetString(SI_COMBO_BOX_DEFAULT_NO_SELECTION_TEXT)
    dropdown.EnableMultiSelect(multiSelectionTextFormatter, multiSelectionNoSelectionText)

    const maxSelections = getDefaultValue<number | undefined>(dropdownData.multiSelectMaxSelections)
    if (typeof maxSelections === "number") {
      dropdown.SetMaxSelections(maxSelections)
    }
  } else {
    dropdown.DisableMultiSelect()
  }

  ZO_PreHook(dropdown, "UpdateItems", (...phArgs: unknown[]) => {
    const self = asLamComboBox(phArgs[0])
    assert(
      self.m_sortsItems !== true,
      "built-in dropdown sorting was reactivated, sorting is handled by LAM"
    )[0]
    const sortType = control.m_sortType
    const sortOrder = control.m_sortOrder
    if (sortOrder !== undefined && sortType !== undefined && typeof sortType === "object") {
      const sortKeys = asSortKeyTable(sortType)
      const [sortKey] = next(sortKeys)
      const sortFunc = (item1: unknown, item2: unknown): boolean =>
        ZO_TableOrderingFunction(item1, item2, tostring(sortKey), sortKeys, sortOrder === true)
      table.sort(self.m_sortedItems, sortFunc)
    }
    return undefined
  })

  if (dropdownData.sort !== undefined) {
    const sortInfo = grabSortingInfo(dropdownData.sort)
    control.m_sortType = SORT_TYPES[sortInfo[0] ?? ""]
    control.m_sortOrder = SORT_ORDERS[sortInfo[1] ?? ""]
  } else if (dropdownData.choicesValues) {
    control.m_sortType = SORT_BY_VALUE
    control.m_sortOrder = ZO_SORT_ORDER_UP
  }

  if (dropdownData.warning !== undefined || dropdownData.requiresReload === true) {
    const warning = wm.CreateControlFromVirtual<TextureControl>(
      "",
      control,
      "ZO_Options_WarningIcon"
    )
    control.warning = warning
    warning.SetAnchor(RIGHT, combobox, LEFT, -5, 0)
    control.UpdateWarning = function (this: LamControl): undefined {
      updateWarning(this)
    }
    control.UpdateWarning.call(control)
  }

  control.SetDropdownHeight = setDropdownHeight
  control.AdjustDimensions = (): undefined => {}
  control.UpdateChoices = asUpdateChoicesFn(function (
    this: LamControl,
    choices?: string[],
    choicesValues?: unknown[],
    choicesTooltips?: Valued<string | number>[]
  ): undefined {
    updateChoices(this, dropdownData, choices, choicesValues, choicesTooltips)
  })
  control.UpdateChoices.call(control, dropdownData.choices, dropdownData.choicesValues)
  control.UpdateValue = function (
    this: LamControl,
    forceDefault?: boolean,
    value?: unknown
  ): undefined {
    updateValue(this, dropdownData, forceDefault, value)
  }
  control.UpdateValue.call(control)
  if (dropdownData.disabled !== undefined) {
    control.UpdateDisabled = updateDisabled
    control.UpdateDisabled.call(control)
  }

  registerForRefreshIfNeeded(control)
  registerForReloadIfNeeded(control)

  return control
}

if (registerWidget("dropdown", WIDGET_VERSION.dropdown)) {
  TEMPER_ADDON_MENU_CREATE_CONTROL.dropdown = asLamFactory(createDropdown)
}
