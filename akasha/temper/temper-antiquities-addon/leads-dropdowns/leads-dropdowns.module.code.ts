import { DROPDOWN_DATA } from "../leads-constants/leads-constants.module.code.ts"
import { getDropdownChoice } from "../leads-saved-variables/leads-saved-variables.module.code.ts"
import { STRINGS } from "../leads-ui-strings/leads-ui-strings.module.code.ts"
import { getUnitList } from "../leads-unit-list/leads-unit-list.module.code.ts"

type DropdownName = "Major" | "Zone" | "SetType"

interface DropdownContainerControl extends Control {
  comboBox?: ComboBox
}

function getChoices(dropdownName: DropdownName): string[] {
  if (dropdownName === "Major") {
    return DROPDOWN_DATA.ChoicesMajor
  }
  if (dropdownName === "Zone") {
    return DROPDOWN_DATA.ChoicesZone
  }
  return DROPDOWN_DATA.ChoicesSetType
}

function getChoicesTooltips(dropdownName: DropdownName): string[] {
  if (dropdownName === "Major") {
    return DROPDOWN_DATA.TooltipsMajor
  }
  if (dropdownName === "Zone") {
    return DROPDOWN_DATA.TooltipsZone
  }
  return DROPDOWN_DATA.TooltipsSetType
}

function hideTooltip(this: void, _control?: Control): undefined {
  ClearTooltip(InformationTooltip)
}

function showTooltip(this: void, control: ZoMenuItemControl): undefined {
  InitializeTooltip(InformationTooltip, control, TOPRIGHT, -10, 0, TOPLEFT)
  SetTooltipText(InformationTooltip, control.tooltip ?? "")
  InformationTooltipTopLevel.BringWindowToTop()
}

function setupTooltips(comboBox: ComboBox, choicesTooltips: string[]): undefined {
  const originalShow = comboBox.ShowDropdownInternal
  comboBox.ShowDropdownInternal = function (this: ComboBox) {
    originalShow.call(this)
    const entries = ZO_Menu.items
    for (let index = 0; index < entries.length; index++) {
      const entry = entries[index]
      if (entry === undefined) {
        continue
      }
      const itemControl = entry.item
      itemControl.tooltip = choicesTooltips[index]
      if (itemControl.tooltip !== undefined) {
        entry.onMouseEnter = itemControl.GetHandler("OnMouseEnter")
        entry.onMouseExit = itemControl.GetHandler("OnMouseExit")
        ZO_PreHookHandler(itemControl, "OnMouseEnter", showTooltip)
        ZO_PreHookHandler(itemControl, "OnMouseExit", hideTooltip)
      }
    }
  }

  const originalHide = comboBox.HideDropdownInternal
  comboBox.HideDropdownInternal = function (this: ComboBox) {
    const entries = ZO_Menu.items
    for (const entry of entries) {
      const itemControl = entry.item
      itemControl.SetHandler("OnMouseEnter", entry.onMouseEnter)
      itemControl.SetHandler("OnMouseExit", entry.onMouseExit)
      itemControl.tooltip = undefined
    }
    hideTooltip()
    originalHide.call(this)
  }
}

function onItemSelect(
  this: void,
  comboBox: ComboBox,
  choiceText: string,
  _entry: ComboBoxItem
): undefined {
  const [dropdownName] = string.gsub(tostring(comboBox.m_name), "TemperLeads_Dropdown", "")
  getDropdownChoice()[dropdownName] = choiceText
  hideTooltip()
  const sound = SOUNDS.POSITIVE_CLICK
  if (sound !== undefined) {
    PlaySound(sound)
  }
  getUnitList().RefreshData()
}

export function createInventoryDropdown(dropdownName: DropdownName): undefined {
  const controlName = string.format("%s%s", "TemperLeads_Dropdown", dropdownName)
  const control = WINDOW_MANAGER.GetControlByName<DropdownContainerControl>(controlName)
  if (control === undefined) {
    throw new Error(string.format("TemperLeads dropdown control missing: %s", controlName))
  }
  const validChoices = getChoices(dropdownName)
  const choicesTooltips = getChoicesTooltips(dropdownName)

  const comboBox = control.comboBox ?? ZO_ComboBox_ObjectFromContainer(control)
  control.comboBox = comboBox
  comboBox.SetHeight(800)
  comboBox.SetSortsItems(false)

  let choice = validChoices[0]
  const stored = getDropdownChoice()[dropdownName]
  if (stored !== undefined) {
    choice = stored
  } else {
    getDropdownChoice()[dropdownName] = choice
  }
  let foundStoredSelected = false
  for (const validChoice of validChoices) {
    const entry = comboBox.CreateItemEntry(validChoice, onItemSelect)
    comboBox.AddItem(entry)
    if (validChoice === choice) {
      foundStoredSelected = true
      comboBox.SetSelectedItem(validChoice)
    }
  }
  if (!foundStoredSelected) {
    const firstChoice = validChoices[0]
    if (firstChoice !== undefined) {
      comboBox.SetSelectedItem(firstChoice)
      getDropdownChoice()[dropdownName] = firstChoice
    }
  }
  setupTooltips(comboBox, choicesTooltips)
}

export function setupDropdown(this: void, _control: Control): undefined {}

export function dropdownShowTooltip(
  this: void,
  control: Control,
  dropdownName: string,
  _reAnchor: boolean
): undefined {
  InitializeTooltip(InformationTooltip, control, BOTTOM, 0, 0, 0)
  InformationTooltip.SetHidden(false)
  InformationTooltip.ClearLines()
  const tooltips: Record<string, string | undefined> = STRINGS.DropdownTooltips
  const text = tooltips[dropdownName]
  if (text !== undefined) {
    InformationTooltip.AddLine(text)
  }
}

export function dropdownHideTooltip(this: void, _control: Control): undefined {
  InformationTooltip.ClearLines()
  InformationTooltip.SetHidden(true)
}
