import {
  asBackdropControl,
  asButtonControl,
  asControl,
  asLabelControl,
  asShifterBoxSettings,
  asString,
  asStringRecord,
  asTableKey,
} from "../shifter-casts/shifter-casts.module.code.ts"
import {
  ARROW_SIZE,
  DEFAULT_SETTINGS,
  HEADER_HEIGHT,
  LIST_SPACING,
  POSSIBLE_CUSTOM_SETTINGS,
} from "../shifter-constants/shifter-constants.module.code.ts"
import {
  defaultSearchFunc,
  getDeepClonedTable,
  getShallowClonedTable,
  refreshFilter,
} from "../shifter-helpers/shifter-helpers.module.code.ts"
import { moveEntryFromTo } from "../shifter-list-ops/shifter-list-ops.module.code.ts"
import { lib, validationTypeToFunc } from "../shifter-state/shifter-state.module.code.ts"
import type {
  AnchorOptions,
  ShifterBox,
  ShifterBoxList,
  ShifterBoxSettings,
} from "../shifter-types/shifter-types.module.code.ts"

export function createShifterBox(
  uniqueAddonName: unknown,
  uniqueShifterBoxName: unknown,
  parentControl: Control
): Control {
  const shifterBoxName = table.concat([
    asString(uniqueAddonName),
    "_",
    asString(uniqueShifterBoxName),
  ])
  return CreateControlFromVirtual(shifterBoxName, parentControl, "ShifterBoxTemplate")
}

export function applyCustomSettings(obj: ShifterBox, customSettings: unknown): ShifterBoxSettings {
  if (lib.doDebug) {
    LSB_Debug = LSB_Debug ?? new LuaTable()
    const boxKey = asTableKey(obj.shifterBoxName)
    let debugEntry = LSB_Debug.get(boxKey)
    if (debugEntry === undefined) {
      debugEntry = {}
      LSB_Debug.set(boxKey, debugEntry)
    }
    debugEntry.addonName = obj.addonName
    debugEntry.shifterBoxName = obj.shifterBoxName
    debugEntry.customSettings = ZO_ShallowTableCopy(customSettings)
  }

  const defSettingsForCustomSettings = asShifterBoxSettings(getDeepClonedTable(DEFAULT_SETTINGS))
  if (!ZO_IsTableEmpty(asStringRecord(customSettings))) {
    for (const [customSettingsSection, customSettingsSectionData] of pairs(
      POSSIBLE_CUSTOM_SETTINGS
    )) {
      for (const [, validationData] of ipairs(customSettingsSectionData)) {
        if (validationData.validationType !== undefined) {
          const validationFunc = validationTypeToFunc.get(validationData.validationType)
          if (type(validationFunc) === "function" && validationFunc !== undefined) {
            if (lib.doDebug) {
              d(
                `>validating ShifterBox section '${tostring(customSettingsSection)}' setting: ${tostring(validationData.name)}`
              )
            }
            if (customSettingsSection === "head") {
              validationFunc(
                asStringRecord(customSettings),
                validationData.name,
                asStringRecord(defSettingsForCustomSettings)
              )
            } else if (customSettingsSection === "leftList") {
              validationFunc(
                asStringRecord(asStringRecord(customSettings).leftList),
                validationData.name,
                asStringRecord(defSettingsForCustomSettings.leftList)
              )
            } else if (customSettingsSection === "rightList") {
              validationFunc(
                asStringRecord(asStringRecord(customSettings).rightList),
                validationData.name,
                asStringRecord(defSettingsForCustomSettings.rightList)
              )
            }
          }
        }
      }
    }
  }
  defSettingsForCustomSettings.search.searchFunc =
    defSettingsForCustomSettings.search.searchFunc ?? defaultSearchFunc

  return defSettingsForCustomSettings
}

export function initShifterBoxControls(obj: ShifterBox): undefined {
  const control = obj.shifterBoxControl
  const shifterBoxSettings = obj.shifterBoxSettings
  const leftControl = asControl(control.GetNamedChild("Left"))
  const rightControl = asControl(control.GetNamedChild("Right"))
  const fromLeftButtonControl = asButtonControl(leftControl.GetNamedChild("Button"))
  const fromRightButtonControl = asButtonControl(rightControl.GetNamedChild("Button"))
  const rightListControl = asControl(rightControl.GetNamedChild("List"))
  const leftListControl = asControl(leftControl.GetNamedChild("List"))

  if (lib.doDebug) {
    LSB_Debug = LSB_Debug ?? new LuaTable()
    const boxKey = asTableKey(obj.shifterBoxName)
    let debugEntry = LSB_Debug.get(boxKey)
    if (debugEntry === undefined) {
      debugEntry = {}
      LSB_Debug.set(boxKey, debugEntry)
    }
    debugEntry.addonName = obj.addonName
    debugEntry.shifterBoxName = obj.shifterBoxName
    debugEntry.shifterBoxSettings = ZO_ShallowTableCopy(shifterBoxSettings)
  }

  const initListFrames = (parentListControl: Control): undefined => {
    const listFrameControl = asBackdropControl(parentListControl.GetNamedChild("Frame"))
    listFrameControl.SetCenterColor(0, 0, 0, 1)
    listFrameControl.SetEdgeTexture(undefined, 1, 1, 1)
  }

  const initHeaders = (
    objVar: ShifterBox,
    leftListTitle: string,
    rightListTitle: string
  ): undefined => {
    if (leftListTitle !== undefined || rightListTitle !== undefined) {
      objVar.headerHeight = HEADER_HEIGHT
      const leftHeaders = asControl(leftControl.GetNamedChild("Headers"))
      const leftHeadersTitle = asLabelControl(
        asControl(leftHeaders.GetNamedChild("Value")).GetNamedChild("Name")
      )
      leftHeaders.SetHeight(objVar.headerHeight)
      leftHeaders.SetHidden(false)
      leftHeadersTitle.SetText(leftListTitle ?? "")

      const rightHeaders = asControl(rightControl.GetNamedChild("Headers"))
      const rightHeadersTitle = asLabelControl(
        asControl(rightHeaders.GetNamedChild("Value")).GetNamedChild("Name")
      )
      rightHeaders.SetHeight(objVar.headerHeight)
      rightHeaders.SetHidden(false)
      rightHeadersTitle.SetText(rightListTitle ?? "")
    } else {
      objVar.headerHeight = 0
    }
  }

  const leftListSettings = shifterBoxSettings.leftList
  const rightListSettings = shifterBoxSettings.rightList
  initHeaders(obj, leftListSettings.title, rightListSettings.title)

  initListFrames(leftListControl)
  initListFrames(rightListControl)

  fromLeftButtonControl.SetState(BSTATE_DISABLED, true)
  fromRightButtonControl.SetState(BSTATE_DISABLED, true)
}

export function initShifterBoxHandlers(obj: ShifterBox): undefined {
  const control = obj.shifterBoxControl

  const leftControl = asControl(control.GetNamedChild("Left"))
  const fromLeftButtonControl = asControl(leftControl.GetNamedChild("Button"))
  const fromLeftAllButtonControl = asControl(leftControl.GetNamedChild("AllButton"))
  const rightControl = asControl(control.GetNamedChild("Right"))
  const fromRightButtonControl = asControl(rightControl.GetNamedChild("Button"))
  const fromRightAllButtonControl = asControl(rightControl.GetNamedChild("AllButton"))

  const toLeftButtonClicked = (...args: unknown[]): boolean => {
    const buttonControl = asButtonControl(args[0])
    const leftList = obj.leftList
    const rightList = obj.rightList
    const rightListSelectedData = getShallowClonedTable(rightList.list.selectedMultiData)
    let retVar = true
    if (rightListSelectedData !== undefined) {
      for (const [, data] of pairs(rightListSelectedData)) {
        const retVarLoop = moveEntryFromTo(rightList, leftList, data.key, obj)
        if (!retVarLoop) {
          retVar = false
        }
      }
    }
    refreshFilter(leftList, false)
    refreshFilter(rightList, true)
    buttonControl.SetState(BSTATE_DISABLED, true)
    return retVar
  }
  const toLeftAllButtonClicked = (..._args: unknown[]): undefined => {
    obj.MoveAllEntriesToLeftList()
  }

  const toRightButtonClicked = (...args: unknown[]): boolean => {
    const buttonControl = asButtonControl(args[0])
    const leftList = obj.leftList
    const rightList = obj.rightList
    const leftListSelectedData = getShallowClonedTable(leftList.list.selectedMultiData)
    let retVar = true
    if (leftListSelectedData !== undefined) {
      for (const [, data] of pairs(leftListSelectedData)) {
        const retVarLoop = moveEntryFromTo(leftList, rightList, data.key, obj)
        if (!retVarLoop) {
          retVar = false
        }
      }
    }
    refreshFilter(leftList, true)
    refreshFilter(rightList, false)
    buttonControl.SetState(BSTATE_DISABLED, true)
    return retVar
  }
  const toRightAllButtonClicked = (..._args: unknown[]): undefined => {
    obj.MoveAllEntriesToRightList()
  }

  fromLeftButtonControl.SetHandler("OnClicked", toRightButtonClicked)
  fromLeftAllButtonControl.SetHandler("OnClicked", toRightAllButtonClicked)
  fromRightButtonControl.SetHandler("OnClicked", toLeftButtonClicked)
  fromRightAllButtonControl.SetHandler("OnClicked", toLeftAllButtonClicked)
}

export function getListBoxWidthAndArrowOffset(
  width: number,
  height: number
): LuaMultiReturn<[number, number, number]> {
  let widthLocal = width
  if (widthLocal < 3 * LIST_SPACING) widthLocal = 3 * LIST_SPACING
  const singleListWidth = (widthLocal - LIST_SPACING) / 2
  const freeHeight = height - 4 * ARROW_SIZE
  const arrowOffset = ARROW_SIZE + (freeHeight / 5) * 2
  const arrowAllOffset = freeHeight / 5
  return $multi(singleListWidth, arrowOffset, arrowAllOffset)
}

export function setListBoxDimensions(
  list: ShifterBoxList,
  singleListWidth: number,
  height: number,
  headerHeight: number,
  buttonAnchorOptions: AnchorOptions,
  buttonAllAnchorOptions: AnchorOptions
): undefined {
  const buttonControl = asControl(list.control.GetNamedChild("Button"))
  buttonControl.ClearAnchors()
  buttonControl.SetAnchor(...buttonAnchorOptions)
  const buttonAllControl = asControl(list.control.GetNamedChild("AllButton"))
  buttonAllControl.ClearAnchors()
  buttonAllControl.SetAnchor(...buttonAllAnchorOptions)
  list.SetCustomDimensions(singleListWidth, height, headerHeight)
  list.Refresh()
}
