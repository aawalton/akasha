import {
  asComboBoxBaseClass,
  asControl,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastNumberUndefined,
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined,
  asLsmCastRecordStringUnknownUndefined2,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastStringUndefined } from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import { asLsmCastThisVoidData1UnknownData2UnknownSortKeyUnknown } from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastThisVoidTUnknownBoolean,
  asLsmRowControl,
  asLsmSortButtonControl,
  asString,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { getValueOrCallback } from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const zostrlow = zo_strlower

const zo_isTableEmpty = asLsmCastThisVoidTUnknownBoolean(ZO_IsTableEmpty)
const zo_tableOrderingFunction =
  asLsmCastThisVoidData1UnknownData2UnknownSortKeyUnknown(ZO_TableOrderingFunction)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const comboBox_base = asComboBoxBaseClass(classes.comboboxBaseClass)

function defaultFilterFunc(
  this: void,
  item: Record<string, unknown>,
  filterString: string
): boolean {
  const name = asString(item.label || item.name)
  const [filterStringClean] = string.gsub(filterString, "([^%w])", "%%%1")
  const [foundStart] = string.find(zostrlow(name), filterStringClean)
  return foundStart !== undefined
}

const DEFAULT_SORT_KEY = "name"
const defaultSortKeys = ZO_SORT_BY_NAME
const defaultSortOrder = ZO_SORT_ORDER_UP
function defaultSortFunc(
  this: void,
  item1: Record<string, unknown> | undefined,
  item2: Record<string, unknown> | undefined,
  comboBoxObject: ComboBoxBase | undefined
): unknown {
  if (!comboBoxObject || !item1 || !item2) {
    return
  }
  let sortOrder = comboBoxObject.m_sortOrder
  if (sortOrder === undefined) {
    sortOrder = defaultSortOrder
  }
  return zo_tableOrderingFunction(
    item1,
    item2,
    comboBoxObject.m_LSMsortKey || DEFAULT_SORT_KEY,
    comboBoxObject.m_sortType || defaultSortKeys,
    sortOrder
  )
}

comboBox_base.SetSortData = function (this: ComboBoxBase): undefined {
  const [startSortKey, startSortOrder, startSortKeys, , isCustomSortEnabled] = this.GetSortData()
  if (isCustomSortEnabled === true) {
    this.m_LSMsortKey = startSortKey
    this.m_sortOrder = startSortOrder
    this.m_sortType = startSortKeys
  } else {
    this.m_LSMsortKey = undefined
  }
}

comboBox_base.GetCustomSortButtonData = function (this: ComboBoxBase): undefined {
  this.m_LSMsortButtonData = undefined
  const [, , , , isCustomSortEnabled, customSortButtonsData] = this.GetSortData()
  if (!isCustomSortEnabled) {
    return
  }

  const sortButtonsData = asLsmCastRecordStringUnknownUndefined(customSortButtonsData)
  if (!zo_isTableEmpty(sortButtonsData)) {
    if (!zo_isTableEmpty(sortButtonsData?.up) || !zo_isTableEmpty(sortButtonsData?.down)) {
      this.m_LSMsortButtonData = customSortButtonsData
    }
  }
}

comboBox_base.ApplyCustomSortButtonData = function (
  this: ComboBoxBase,
  buttonControl: Control,
  buttonData: Record<string, unknown>,
  sortContainer: Control,
  _headerControl: Control
): boolean {
  let sortButtonWasUpdated = false
  const buttonCtrl = asLsmSortButtonControl(buttonControl)
  const buttonTextures = asLsmCastRecordStringUnknownUndefined2(
    getValueOrCallback(buttonData.texture, buttonData)
  )
  if (!zo_isTableEmpty(buttonTextures)) {
    const buttonTextureNormal =
      asLsmCastStringUndefined(getValueOrCallback(buttonTextures?.normal, buttonTextures)) ??
      undefined
    if (buttonTextureNormal != null && buttonTextureNormal !== "") {
      buttonCtrl.SetNormalTexture(buttonTextureNormal)
      sortButtonWasUpdated = true
    }
    const buttonTexturePressed =
      asLsmCastStringUndefined(getValueOrCallback(buttonTextures?.pressed, buttonTextures)) ??
      undefined
    if (buttonTexturePressed != null && buttonTextureNormal !== "") {
      buttonCtrl.SetPressedTexture(buttonTexturePressed)
      sortButtonWasUpdated = true
    }
    const buttonTextureOver =
      asLsmCastStringUndefined(getValueOrCallback(buttonTextures?.over, buttonTextures)) ??
      undefined
    if (buttonTextureOver != null && buttonTextureOver !== "") {
      buttonCtrl.SetMouseOverTexture(buttonTextureOver)
      sortButtonWasUpdated = true
    }
    const buttonTextureDisabled =
      asLsmCastStringUndefined(getValueOrCallback(buttonTextures?.disabled, buttonTextures)) ??
      undefined
    if (buttonTextureDisabled != null && buttonTextureDisabled !== "") {
      buttonCtrl.SetDisabledTexture(buttonTextureDisabled)
      sortButtonWasUpdated = true
    }
  }

  const buttonDimensions = asLsmCastRecordStringUnknownUndefined2(
    getValueOrCallback(buttonData.dimensions, buttonData)
  )
  if (!zo_isTableEmpty(buttonDimensions)) {
    if (buttonDimensions?.x) {
      const x =
        asLsmCastNumberUndefined(getValueOrCallback(buttonDimensions.x, buttonDimensions)) ?? 0
      buttonCtrl.SetWidth(x)
      sortButtonWasUpdated = true
    }
    if (buttonDimensions?.y) {
      const y =
        asLsmCastNumberUndefined(getValueOrCallback(buttonDimensions.y, buttonDimensions)) ?? 0
      buttonCtrl.SetHeight(y)
      sortButtonWasUpdated = true
    }
  }

  const buttonAnchor = asLsmCastRecordStringUnknownUndefined2(
    getValueOrCallback(buttonData.anchor, buttonData)
  )
  if (!zo_isTableEmpty(buttonAnchor)) {
    const pointOnMe =
      asLsmCastNumberUndefined(getValueOrCallback(buttonAnchor?.pointOnMe, buttonAnchor)) ??
      undefined
    const target = getValueOrCallback(buttonAnchor?.target, buttonAnchor) || undefined
    const pointOnTarget =
      asLsmCastNumberUndefined(getValueOrCallback(buttonAnchor?.pointOnTarget, buttonAnchor)) ??
      undefined
    const offsetX =
      asLsmCastNumberUndefined(getValueOrCallback(buttonAnchor?.offsetX, buttonAnchor)) ?? 0
    const offsetY =
      asLsmCastNumberUndefined(getValueOrCallback(buttonAnchor?.offsetY, buttonAnchor)) ?? 0
    if (pointOnMe !== undefined && pointOnTarget !== undefined) {
      buttonCtrl.ClearAnchors()
      buttonCtrl.SetAnchor(pointOnMe, target, pointOnTarget, offsetX, offsetY)
      sortButtonWasUpdated = true
    }
  }

  if (sortButtonWasUpdated === true) {
    const buttonWidth = buttonCtrl.GetWidth()
    const sortContainerCtrl = asLsmSortButtonControl(sortContainer)
    const sortContainerWidth = sortContainerCtrl.GetWidth()
    if (sortContainerWidth < buttonWidth) {
      sortContainerCtrl.SetDimensions(buttonWidth, "100%")
    }
  }
  return sortButtonWasUpdated
}

comboBox_base.ApplyCustomSortButtonsData = function (
  this: ComboBoxBase,
  headerControl: Control,
  control: Control
): boolean {
  let wasAnyCustomSortButtonDataUsed = false

  this.GetCustomSortButtonData()

  const customSortButtonData = asLsmCastRecordStringUnknownUndefined(this.m_LSMsortButtonData)
  if (zo_isTableEmpty(customSortButtonData)) {
    return false
  }
  const controlCtrl = asLsmRowControl(control)
  const sortUpButtonData = asLsmCastRecordStringUnknownUndefined(customSortButtonData?.up)
  if (!zo_isTableEmpty(sortUpButtonData)) {
    const upButtonControl = controlCtrl.GetNamedChild("SortUp")
    if (upButtonControl !== undefined) {
      wasAnyCustomSortButtonDataUsed = this.ApplyCustomSortButtonData(
        asControl(upButtonControl),
        asLsmCastRecordStringUnknown(sortUpButtonData),
        control,
        headerControl
      )
    }
  }
  const sortDownButtonData = asLsmCastRecordStringUnknownUndefined(customSortButtonData?.down)
  if (!zo_isTableEmpty(sortDownButtonData)) {
    const downButtonControl = controlCtrl.GetNamedChild("SortDown")
    if (downButtonControl !== undefined) {
      const wasCustomSortDownButtonDataUsed = this.ApplyCustomSortButtonData(
        asControl(downButtonControl),
        asLsmCastRecordStringUnknown(sortDownButtonData),
        control,
        headerControl
      )
      wasAnyCustomSortButtonDataUsed =
        wasAnyCustomSortButtonDataUsed || wasCustomSortDownButtonDataUsed
    }
  }
  return wasAnyCustomSortButtonDataUsed
}

comboBox_base.GetFilterFunction = function (this: ComboBoxBase): unknown {
  const options = asLsmCastRecordStringUnknownUndefined(this.GetOptions())
  const filterFunction = options?.customFilterFunc || defaultFilterFunc
  return filterFunction
}

comboBox_base.GetSortData = function (
  this: ComboBoxBase
): LuaMultiReturn<[unknown, unknown, unknown, unknown, unknown, unknown]> {
  const isCustomSortEnabled = this.IsSortEnabled()
  let sortKey: unknown
  let sortOrder: unknown
  let sortKeys: unknown
  let sortFunction: unknown
  let customSortButtonsData: Record<string, unknown> | undefined

  sortKey = DEFAULT_SORT_KEY
  sortOrder = defaultSortOrder
  sortKeys = defaultSortKeys
  sortFunction = defaultSortFunc

  if (isCustomSortEnabled === true) {
    const options = asLsmCastRecordStringUnknownUndefined(this.GetOptions())

    sortOrder = (options && getValueOrCallback(options.sortOrder, options)) || undefined
    if (sortOrder === undefined) {
      sortOrder = defaultSortOrder
    }
    sortKeys = (options && getValueOrCallback(options.sortType, options)) || undefined
    if (sortKeys === undefined) {
      sortKeys = defaultSortKeys
    }
    sortKey = (options && getValueOrCallback(options.customSortKey, options)) || undefined
    if (sortKey === undefined) {
      sortKey = DEFAULT_SORT_KEY
    }
    sortFunction = options?.customSortFunc || undefined
    if (sortFunction === undefined) {
      sortFunction = defaultSortFunc
    }

    const customSortUpButtonData =
      (options && getValueOrCallback(options.customSortUpButton, options)) || undefined
    if (!zo_isTableEmpty(customSortUpButtonData)) {
      customSortButtonsData = customSortButtonsData || {}
      customSortButtonsData.up = customSortUpButtonData
    }
    const customSortDownButtonData =
      (options && getValueOrCallback(options.customSortDownButton, options)) || undefined
    if (!zo_isTableEmpty(customSortDownButtonData)) {
      customSortButtonsData = customSortButtonsData || {}
      customSortButtonsData.down = customSortDownButtonData
    }
  }
  return $multi(
    sortKey,
    sortOrder,
    sortKeys,
    sortFunction,
    isCustomSortEnabled,
    customSortButtonsData
  )
}

comboBox_base.IsFilterEnabled = function (this: ComboBoxBase): unknown {
  return undefined
}

comboBox_base.IsSortEnabled = function (this: ComboBoxBase): unknown {
  return undefined
}
