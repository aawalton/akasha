import { asFilterPanel } from "../map-pins-casts/map-pins-casts.module.code.ts"
import { LIBMAPPINS_GLOBAL_MAPGROUP } from "../map-pins-constants/map-pins-constants.module.code.ts"
import {
  getCurrentGamepadMapFilterPanel,
  getPinTypeIdAndString,
} from "../map-pins-helpers/map-pins-helpers.module.code.ts"
import type {
  Filter,
  GamepadFilterEntryData,
  GamepadFilterInfo,
  Lib,
} from "../map-pins-types/map-pins-types.module.code.ts"
import { isEnabled, setEnabled } from "../pin-state/pin-state.module.code.ts"

export function addPinFilter(
  lib: Lib,
  pinType: number | string,
  pinCheckboxText: string | undefined,
  separate: boolean | undefined,
  savedVars: Record<string, boolean> | undefined,
  savedVarsPveKey: string | undefined,
  savedVarsPvpKey: string | undefined,
  savedVarsImperialPvpKey: string | undefined,
  savedVarsBattlegroundKey: string | undefined
):
  | LuaMultiReturn<
      [
        pve: Control | undefined,
        pvp: Control | undefined,
        imperial: Control | undefined,
        bg: Control | undefined,
      ]
    >
  | undefined {
  const [pinTypeId, pinTypeString] = getPinTypeIdAndString(lib, pinType)
  if (pinTypeId === undefined || lib.filters[pinTypeId]) {
    return
  }

  const filter: Filter = {}
  lib.filters[pinTypeId] = filter

  if (type(savedVars) === "table" && savedVars !== undefined) {
    filter.vars = savedVars
    filter.pveKey = savedVarsPveKey ?? pinTypeString
    if (separate === true) {
      filter.pvpKey = savedVarsPvpKey ?? `${pinTypeString}_pvp`
      filter.imperialPvPKey = savedVarsImperialPvpKey ?? `${pinTypeString}_imperialPvP`
      filter.battlegroundKey = savedVarsBattlegroundKey ?? `${pinTypeString}_battleground`
    } else {
      filter.pvpKey = filter.pveKey
      filter.imperialPvPKey = filter.pveKey
      filter.battlegroundKey = filter.pveKey
    }
  }

  let label: string
  if (type(pinCheckboxText) === "string" && pinCheckboxText !== undefined) {
    label = pinCheckboxText
  } else {
    label = pinTypeString ?? ""
  }

  const addCheckbox = (panel: ResolvedFilterPanel, checkboxLabel: string): Control => {
    const checkbox = panel.checkBoxPool.AcquireObject()
    ZO_CheckButton_SetLabelText(checkbox, checkboxLabel)
    panel.AnchorControl(checkbox)

    const pinData = lib.pinManager.customPins[pinTypeId]
    const tooltipFunc = pinData?.filterTooltipCreator

    if (tooltipFunc) {
      checkbox.SetHandler("OnMouseEnter", (control: unknown): undefined => {
        const tooltipText = tooltipFunc()
        if (tooltipText !== "") {
          ZO_Tooltips_ShowTextTooltip(control as Control, LEFT, tooltipText)
        }
      })
      checkbox.SetHandler("OnMouseExit", ZO_Tooltips_HideTextTooltip)
    }

    return checkbox
  }

  filter.pve = addCheckbox(asFilterPanel(WORLD_MAP_FILTERS.pvePanel), label)
  filter.pvp = addCheckbox(asFilterPanel(WORLD_MAP_FILTERS.pvpPanel), label)
  filter.imperialPvP = addCheckbox(asFilterPanel(WORLD_MAP_FILTERS.imperialPvPPanel), label)
  filter.battleground = addCheckbox(asFilterPanel(WORLD_MAP_FILTERS.battlegroundPanel), label)

  const customPinState = isEnabled(lib, pinTypeId)
  let pveFilterState: unknown = customPinState
  let pvpFilterState: unknown = customPinState
  let imperialPvPFilterState: unknown = customPinState
  let battlegroundFilterState: unknown = customPinState

  const setupToggleWithSavedVars = (checkbox: Control, key: string | undefined): undefined => {
    ZO_CheckButton_SetToggleFunction(checkbox, (_control: Control, state: boolean): undefined => {
      const pinData = lib.pinManager.customPins[pinTypeId]

      if (filter.vars && key !== undefined) {
        filter.vars[key] = state

        if (pinData && type(pinData.compassPinTypeString) === "string") {
          filter.vars[pinData.compassPinTypeString as string] = state
        }
      }

      setEnabled(lib, pinTypeId, state)

      if (
        pinData &&
        pinData.onToggleCallback !== undefined &&
        type(pinData.onToggleCallback) === "function"
      ) {
        pinData.onToggleCallback(pinData.compassPinTypeString, state)
      }
    })
  }

  const setupToggleWithoutSavedVars = (checkbox: Control): undefined => {
    ZO_CheckButton_SetToggleFunction(checkbox, (_control: Control, state: boolean): undefined => {
      setEnabled(lib, pinTypeId, state)

      const pinData = lib.pinManager.customPins[pinTypeId]
      if (
        pinData &&
        pinData.onToggleCallback !== undefined &&
        type(pinData.onToggleCallback) === "function"
      ) {
        pinData.onToggleCallback(pinData.compassPinTypeString, state)
      }
    })
  }

  if (filter.vars !== undefined) {
    setupToggleWithSavedVars(filter.pve, filter.pveKey)
    setupToggleWithSavedVars(filter.pvp, filter.pvpKey)
    setupToggleWithSavedVars(filter.imperialPvP, filter.imperialPvPKey)
    setupToggleWithSavedVars(filter.battleground, filter.battlegroundKey)

    pveFilterState = filter.pveKey !== undefined ? filter.vars[filter.pveKey] : undefined
    pvpFilterState = filter.pvpKey !== undefined ? filter.vars[filter.pvpKey] : undefined
    imperialPvPFilterState =
      filter.imperialPvPKey !== undefined ? filter.vars[filter.imperialPvPKey] : undefined
    battlegroundFilterState =
      filter.battlegroundKey !== undefined ? filter.vars[filter.battlegroundKey] : undefined
  } else {
    setupToggleWithoutSavedVars(filter.pve)
    setupToggleWithoutSavedVars(filter.pvp)
    setupToggleWithoutSavedVars(filter.imperialPvP)
    setupToggleWithoutSavedVars(filter.battleground)
  }

  const mapFilterType = GetMapFilterType()
  if (mapFilterType === MAP_FILTER_TYPE_STANDARD) {
    setEnabled(lib, pinTypeId, pveFilterState)
  } else if (mapFilterType === MAP_FILTER_TYPE_AVA_CYRODIIL) {
    setEnabled(lib, pinTypeId, pvpFilterState)
  } else if (mapFilterType === MAP_FILTER_TYPE_AVA_IMPERIAL) {
    setEnabled(lib, pinTypeId, imperialPvPFilterState)
  } else if (mapFilterType === MAP_FILTER_TYPE_BATTLEGROUND) {
    setEnabled(lib, pinTypeId, battlegroundFilterState)
  } else if (mapFilterType === MAP_FILTER_TYPE_GLOBAL) {
    return
  }

  const gamepadToggleFunction = (data: GamepadFilterEntryData): undefined => {
    const currentPanel = getCurrentGamepadMapFilterPanel()
    if (!currentPanel || !currentPanel.list) {
      return
    }

    const pinData = lib.pinManager.customPins[data.mapPinGroup]

    data.currentValue = !data.currentValue
    const baseKey =
      lib.panelToKeyFields_Gamepad !== undefined
        ? lib.panelToKeyFields_Gamepad.get(currentPanel)
        : undefined
    if (baseKey !== undefined) {
      const keyField = `${baseKey}Key`
      const toggleFilter = lib.filters[data.mapPinGroup]
      if (toggleFilter?.vars && toggleFilter[keyField] != null) {
        toggleFilter.vars[toggleFilter[keyField] as string] = data.currentValue

        if (pinData && type(pinData.compassPinTypeString) === "string") {
          toggleFilter.vars[pinData.compassPinTypeString as string] = data.currentValue
        }
      }
    }

    currentPanel.SetPinFilter(data.mapPinGroup, data.currentValue)
    currentPanel.BuildControls()
    SCREEN_NARRATION_MANAGER.QueueParametricListEntry(currentPanel.list)

    if (
      pinData &&
      pinData.onToggleCallback !== undefined &&
      type(pinData.onToggleCallback) === "function"
    ) {
      pinData.onToggleCallback(pinData.compassPinTypeString, data.currentValue)
    }
  }

  const info: GamepadFilterInfo = {
    name: label,
    onSelect: gamepadToggleFunction,
    mapPinGroup: pinTypeId,
    showSelectButton: true,
    narrationText: (entryData: GamepadFilterEntryData, _entryControl: unknown): unknown =>
      ZO_FormatToggleNarrationText(entryData.text, entryData.currentValue),
  }

  if (lib.panelToKeyFields_Gamepad !== undefined) {
    for (const [panel] of lib.panelToKeyFields_Gamepad) {
      panel.gamepadMapFiltersInfo = panel.gamepadMapFiltersInfo ?? []
      panel.gamepadMapFiltersInfo.push(info)
    }
  }

  return $multi(filter.pve, filter.pvp, filter.imperialPvP, filter.battleground)
}

export function setPinFilterHidden(
  lib: Lib,
  pinType: number | string,
  mapGroup: string,
  hidden: boolean
): undefined {
  if (mapGroup === LIBMAPPINS_GLOBAL_MAPGROUP) {
    return
  }

  const [pinTypeId] = getPinTypeIdAndString(lib, pinType)
  const filter = pinTypeId !== undefined ? lib.filters[pinTypeId] : undefined
  if (filter) {
    const rawControl = filter[mapGroup]
    if (rawControl != null) {
      const control = rawControl as MapPinsFilterControl
      if (control.IsControlHidden() !== hidden) {
        control.SetHidden(hidden)
        const [, point, relativeTo, relativePoint, offsetX, anchorOffsetY, restrain] =
          control.GetAnchor(0)
        let offsetY: number | undefined = anchorOffsetY
        if (hidden) {
          control.oldOffsetY = anchorOffsetY
          offsetY = control.GetHeight() * -1
        } else {
          offsetY = control.oldOffsetY
        }
        control.ClearAnchors()
        control.SetAnchor(point, relativeTo, relativePoint, offsetX, offsetY, restrain)
      }
    }
  }
}
