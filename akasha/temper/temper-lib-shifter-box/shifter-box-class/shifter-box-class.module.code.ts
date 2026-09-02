import {
  applyCustomSettings,
  createShifterBox,
  getListBoxWidthAndArrowOffset,
  initShifterBoxControls,
  initShifterBoxHandlers,
  setListBoxDimensions,
} from "../shifter-box-create/shifter-box-create.module.code.ts"
import {
  asControl,
  asLabelControl,
  asNumberPair,
  asShifterBox,
  asString,
  asTableKey,
} from "../shifter-casts/shifter-casts.module.code.ts"
import {
  ARROW_SIZE,
  DEFAULT_LIST_SETTINGS,
} from "../shifter-constants/shifter-constants.module.code.ts"
import { getCursorTLC } from "../shifter-drag-helpers/shifter-drag-helpers.module.code.ts"
import {
  getUniqueShifterBoxEventName,
  refreshFilters,
} from "../shifter-helpers/shifter-helpers.module.code.ts"
import { ShifterBoxListProto } from "../shifter-list-class/shifter-list-class.module.code.ts"
import {
  addEntriesToList,
  addEntryToList,
  clearList,
  getEntries,
  moveEntriesToOtherList,
  moveEntryToOtherList,
  removeEntriesFromList,
  removeEntryFromList,
  selectEntries,
  selectEntry,
} from "../shifter-list-ops/shifter-list-ops.module.code.ts"
import {
  CM,
  CURSOR_STATE,
  existingShifterBoxes,
} from "../shifter-state/shifter-state.module.code.ts"
import type {
  AnchorOptions,
  ShifterBox,
  ShifterBoxClass,
} from "../shifter-types/shifter-types.module.code.ts"
import {
  assertValidShifterBoxEvent,
  errorText,
} from "../shifter-validation/shifter-validation.module.code.ts"

export const ShifterBoxProto = ZO_Object.Subclass<ShifterBoxClass>()

ShifterBoxProto.New = function (
  this: ShifterBoxClass,
  uniqueAddonName: unknown,
  uniqueShifterBoxName: unknown,
  parentControl: Control,
  customSettings?: unknown,
  anchorOptions?: AnchorOptions,
  dimensionOptions?: unknown[],
  leftListEntries?: unknown,
  rightListEntries?: unknown
): ShifterBox {
  let addonShifterBoxes = existingShifterBoxes.get(asTableKey(uniqueAddonName))
  if (addonShifterBoxes === undefined) {
    addonShifterBoxes = new LuaTable()
    existingShifterBoxes.set(asTableKey(uniqueAddonName), addonShifterBoxes)
  }
  assert(
    addonShifterBoxes.get(asTableKey(uniqueShifterBoxName)) === undefined,
    errorText(
      "ShifterBox with the unique identifier '%s' is already registered for the addon '%s'!",
      tostring(uniqueShifterBoxName),
      tostring(uniqueAddonName)
    )
  )[0]
  const obj = asShifterBox(ZO_Object.New<ShifterBox>(this))
  obj.addonName = uniqueAddonName
  obj.shifterBoxName = uniqueShifterBoxName
  obj.shifterBoxControl = createShifterBox(uniqueAddonName, uniqueShifterBoxName, parentControl)
  obj.shifterBoxSettings = applyCustomSettings(obj, customSettings)
  initShifterBoxControls(obj)
  initShifterBoxHandlers(obj)
  const leftControl = asControl(obj.shifterBoxControl.GetNamedChild("Left"))
  const rightControl = asControl(obj.shifterBoxControl.GetNamedChild("Right"))
  obj.leftList = ShifterBoxListProto.New(obj, leftControl, true)
  obj.rightList = ShifterBoxListProto.New(obj, rightControl, false)
  if (anchorOptions !== undefined) {
    obj.SetAnchor(...anchorOptions)
  }
  if (dimensionOptions !== undefined) {
    obj.SetDimensions(...asNumberPair(dimensionOptions))
  }
  if (leftListEntries !== undefined) {
    obj.AddEntriesToLeftList(leftListEntries)
  }
  if (rightListEntries !== undefined) {
    obj.AddEntriesToRightList(rightListEntries)
  }
  addonShifterBoxes.set(asTableKey(uniqueShifterBoxName), obj)
  return obj
}

ShifterBoxProto.GetControl = function (this: ShifterBox): LuaMultiReturn<[Control, ShifterBox]> {
  return $multi(this.shifterBoxControl, this)
}

ShifterBoxProto.SetAnchor = function (this: ShifterBox, ...args: AnchorOptions): undefined {
  this.shifterBoxControl.ClearAnchors()
  this.shifterBoxControl.SetAnchor(...args)
}

ShifterBoxProto.SetDimensions = function (
  this: ShifterBox,
  width: number,
  height: number
): undefined {
  assert(
    type(width) === "number" && type(height) === "number",
    errorText("width and height must be numeric values!")
  )[0]
  let heightLocal = height
  if (heightLocal < 4 * ARROW_SIZE) heightLocal = 4 * ARROW_SIZE
  const [singleListWidth, arrowOffset, arrowAllOffset] = getListBoxWidthAndArrowOffset(
    width,
    heightLocal
  )
  const leftList = this.leftList
  const rightList = this.rightList
  const leftButtonAnchorOptions: AnchorOptions = [TOPLEFT, leftList.list, TOPRIGHT, 0, arrowOffset]
  const leftButtonAllAnchorOptions: AnchorOptions = [
    TOPLEFT,
    leftList.list,
    TOPRIGHT,
    0,
    arrowAllOffset,
  ]
  const rightButtonAnchorOptions: AnchorOptions = [
    BOTTOMRIGHT,
    rightList.list,
    BOTTOMLEFT,
    -2,
    arrowOffset * -1,
  ]
  const rightButtonAllAnchorOptions: AnchorOptions = [
    BOTTOMRIGHT,
    rightList.list,
    BOTTOMLEFT,
    -2,
    arrowAllOffset * -1,
  ]
  setListBoxDimensions(
    leftList,
    singleListWidth,
    heightLocal,
    this.headerHeight,
    leftButtonAnchorOptions,
    leftButtonAllAnchorOptions
  )
  setListBoxDimensions(
    rightList,
    singleListWidth,
    heightLocal,
    this.headerHeight,
    rightButtonAnchorOptions,
    rightButtonAllAnchorOptions
  )
}

ShifterBoxProto.SetEnabled = function (this: ShifterBox, enabled: boolean): undefined {
  this.leftList.SetEntriesEnabled(enabled)
  this.rightList.SetEntriesEnabled(enabled)
}

ShifterBoxProto.SetHidden = function (this: ShifterBox, hidden: boolean): undefined {
  this.shifterBoxControl.SetHidden(hidden)
}

ShifterBoxProto.ShowCategory = function (this: ShifterBox, categoryId: unknown): undefined {
  assert(categoryId !== undefined, errorText("categoryId cannot be nil!"))[0]
  ZO_ScrollList_ShowCategory(this.leftList.list, categoryId)
  ZO_ScrollList_ShowCategory(this.rightList.list, categoryId)
  refreshFilters(this.leftList, this.rightList, false)
}

ShifterBoxProto.ShowOnlyCategory = function (this: ShifterBox, categoryId: unknown): undefined {
  const leftList = this.leftList.list
  for (const [currCategoryId] of pairs(leftList.categories)) {
    if (currCategoryId === categoryId) {
      ZO_ScrollList_ShowCategory(leftList, currCategoryId)
    } else {
      ZO_ScrollList_HideCategory(leftList, currCategoryId)
    }
  }
  const rightList = this.rightList.list
  for (const [currCategoryId] of pairs(rightList.categories)) {
    if (currCategoryId === categoryId) {
      ZO_ScrollList_ShowCategory(rightList, currCategoryId)
    } else {
      ZO_ScrollList_HideCategory(rightList, currCategoryId)
    }
  }
  refreshFilters(this.leftList, this.rightList, true)
}

ShifterBoxProto.ShowAllCategories = function (this: ShifterBox): undefined {
  const leftList = this.leftList.list
  for (const [categoryId] of pairs(leftList.categories)) {
    ZO_ScrollList_ShowCategory(leftList, categoryId)
  }
  const rightList = this.rightList.list
  for (const [categoryId] of pairs(rightList.categories)) {
    ZO_ScrollList_ShowCategory(rightList, categoryId)
  }
  refreshFilters(this.leftList, this.rightList, false)
}

ShifterBoxProto.HideCategory = function (this: ShifterBox, categoryId: unknown): undefined {
  assert(categoryId !== undefined, errorText("categoryId cannot be nil!"))[0]
  ZO_ScrollList_HideCategory(this.leftList.list, categoryId)
  ZO_ScrollList_HideCategory(this.rightList.list, categoryId)
  refreshFilters(this.leftList, this.rightList, true)
}

ShifterBoxProto.SelectEntryByKey = function (this: ShifterBox, key: unknown): undefined {
  selectEntry(this.leftList, key)
  selectEntry(this.rightList, key)
}

ShifterBoxProto.SelectEntriesByKey = function (this: ShifterBox, keys: unknown[]): undefined {
  selectEntries(this.leftList, keys)
  selectEntries(this.rightList, keys)
}

ShifterBoxProto.UnselectAllEntries = function (this: ShifterBox): undefined {
  this.leftList.UnselectEntries()
  this.rightList.UnselectEntries()
}

ShifterBoxProto.RemoveEntryByKey = function (this: ShifterBox, key: unknown): undefined {
  removeEntryFromList(this.leftList, key)
  removeEntryFromList(this.rightList, key)
}

ShifterBoxProto.RemoveEntriesByKey = function (this: ShifterBox, keys: unknown[]): undefined {
  removeEntriesFromList(this.leftList, keys)
  removeEntriesFromList(this.rightList, keys)
}

ShifterBoxProto.RegisterCallback = function (
  this: ShifterBox,
  shifterBoxEvent: number,
  callbackFunction
): undefined {
  assertValidShifterBoxEvent(shifterBoxEvent)
  assert(
    type(callbackFunction) === "function",
    errorText(
      "Invalid callbackFunction parameter of type '%s' provided! Must be of type 'function'.",
      type(callbackFunction)
    )
  )[0]
  const callbackIdentifier = getUniqueShifterBoxEventName(this, shifterBoxEvent)
  CM.RegisterCallback(callbackIdentifier, callbackFunction)
}

ShifterBoxProto.UnregisterCallback = function (
  this: ShifterBox,
  shifterBoxEvent: number,
  callbackFunction
): undefined {
  assertValidShifterBoxEvent(shifterBoxEvent)
  const callbackIdentifier = getUniqueShifterBoxEventName(this, shifterBoxEvent)
  CM.RegisterCallback(callbackIdentifier, callbackFunction)
}

ShifterBoxProto.GetLeftListEntries = function (
  this: ShifterBox,
  withCategoryId?: boolean
): LuaTable<AnyNotNil, unknown> {
  return getEntries(this.leftList, false, withCategoryId)
}

ShifterBoxProto.GetLeftListEntriesFull = function (
  this: ShifterBox,
  withCategoryId?: boolean
): LuaTable<AnyNotNil, unknown> {
  return getEntries(this.leftList, true, withCategoryId)
}

ShifterBoxProto.AddEntryToLeftList = function (
  this: ShifterBox,
  key: unknown,
  value: unknown,
  replace?: boolean,
  categoryId?: unknown
): undefined {
  addEntryToList(this.leftList, key, value, replace, this.rightList, categoryId)
}

ShifterBoxProto.AddEntriesToLeftList = function (
  this: ShifterBox,
  entries: unknown,
  replace?: boolean,
  categoryId?: unknown
): undefined {
  addEntriesToList(this.leftList, entries, replace, this.rightList, categoryId)
}

ShifterBoxProto.MoveEntryToLeftList = function (this: ShifterBox, key: unknown): undefined {
  moveEntryToOtherList(this.rightList, key, this.leftList, this)
}

ShifterBoxProto.MoveEntriesToLeftList = function (this: ShifterBox, keys: unknown[]): undefined {
  moveEntriesToOtherList(this.rightList, keys, this.leftList, this)
}

ShifterBoxProto.MoveAllEntriesToLeftList = function (this: ShifterBox): undefined {
  const keyset: unknown[] = []
  for (const entry of this.rightList.list.data) {
    keyset.push(entry.data.key)
  }
  moveEntriesToOtherList(this.rightList, keyset, this.leftList, this)
}

ShifterBoxProto.ClearLeftList = function (this: ShifterBox): undefined {
  clearList(this.leftList)
}

ShifterBoxProto.GetRightListEntries = function (
  this: ShifterBox,
  withCategoryId?: boolean
): LuaTable<AnyNotNil, unknown> {
  return getEntries(this.rightList, false, withCategoryId)
}

ShifterBoxProto.GetRightListEntriesFull = function (
  this: ShifterBox,
  withCategoryId?: boolean
): LuaTable<AnyNotNil, unknown> {
  return getEntries(this.rightList, true, withCategoryId)
}

ShifterBoxProto.AddEntryToRightList = function (
  this: ShifterBox,
  key: unknown,
  value: unknown,
  replace?: boolean,
  categoryId?: unknown
): undefined {
  addEntryToList(this.rightList, key, value, replace, this.leftList, categoryId)
}

ShifterBoxProto.AddEntriesToRightList = function (
  this: ShifterBox,
  entries: unknown,
  replace?: boolean,
  categoryId?: unknown
): undefined {
  addEntriesToList(this.rightList, entries, replace, this.leftList, categoryId)
}

ShifterBoxProto.MoveEntryToRightList = function (this: ShifterBox, key: unknown): undefined {
  moveEntryToOtherList(this.leftList, key, this.rightList, this)
}

ShifterBoxProto.MoveEntriesToRightList = function (this: ShifterBox, keys: unknown[]): undefined {
  moveEntriesToOtherList(this.leftList, keys, this.rightList, this)
}

ShifterBoxProto.MoveAllEntriesToRightList = function (this: ShifterBox): undefined {
  const keyset: unknown[] = []
  for (const entry of this.leftList.list.data) {
    keyset.push(entry.data.key)
  }
  moveEntriesToOtherList(this.leftList, keyset, this.rightList, this)
}

ShifterBoxProto.ClearRightList = function (this: ShifterBox): undefined {
  clearList(this.rightList)
}

ShifterBoxProto.UpdateCursorTLC = function (
  this: ShifterBox,
  isHidden: boolean,
  _draggedControl?: Control
): undefined {
  if (CURSOR_STATE.tlc === undefined) getCursorTLC()
  const cursorTlc = CURSOR_STATE.tlc
  if (cursorTlc === undefined) return
  const label = asLabelControl(cursorTlc.label)
  cursorTlc.ClearAnchors()
  label.ClearAnchors()
  const draggedData = this.currentDragData
  if (!isHidden && draggedData !== undefined) {
    const minLabelHeight = DEFAULT_LIST_SETTINGS.rowHeight
    const maxLabelWidth = 400
    const maxLabelHeight = 80

    cursorTlc.shifterBox = this
    cursorTlc.SetResizeToFitDescendents(true)

    const draggedControlText = draggedData._draggedText
    const draggedAdditionalText = draggedData._draggedAdditionalText
    const draggedAdditionalTextIsGiven =
      draggedAdditionalText !== undefined && draggedAdditionalText !== ""
    let textForLabel: unknown = draggedControlText
    let textWidth = GetStringWidthScaledPixels(ZoFontGame, asString(draggedControlText), 1) + 2
    const textWidthAdditionalText = draggedAdditionalTextIsGiven
      ? GetStringWidthScaledPixels(ZoFontGame, asString(draggedAdditionalText), 1) + 2
      : 0
    if (draggedAdditionalTextIsGiven && textWidthAdditionalText > 0) {
      if (textWidthAdditionalText > textWidth) {
        textWidth = textWidthAdditionalText
      }
      textForLabel = `${asString(draggedControlText)}\n${asString(draggedAdditionalText)}`
    }
    const textHeight = draggedAdditionalTextIsGiven ? 2 * minLabelHeight : minLabelHeight

    label.SetText(asString(textForLabel))
    label.SetWidth(textWidth)
    label.SetHeight(textHeight)
    cursorTlc.SetWidth(textWidth)
    cursorTlc.SetHeight(textHeight)

    let [width, height] = label.GetDimensions()
    if (width > maxLabelWidth) width = maxLabelWidth
    if (height > maxLabelHeight) height = maxLabelHeight

    cursorTlc.SetDimensionConstraints(width, height, maxLabelWidth, maxLabelHeight)
    cursorTlc.SetDrawTier(DT_HIGH)
    cursorTlc.SetDrawLayer(DL_OVERLAY)
    cursorTlc.SetDrawLevel(5)
    cursorTlc.SetAlpha(0.8)

    const offsetX = draggedData._isFromLeftList === true ? 10 : 35
    cursorTlc.SetAnchor(LEFT, GuiMouse, RIGHT, offsetX, 0)
    label.SetAnchor(TOPLEFT, cursorTlc, TOPLEFT, 0, 0)
    label.SetAnchor(BOTTOMRIGHT, cursorTlc, BOTTOMRIGHT, 0, 0)
  } else {
    cursorTlc.shifterBox = undefined
    cursorTlc.SetDimensions(0, 0)
    label.SetText("")
    cursorTlc.SetDrawTier(DT_LOW)
    cursorTlc.SetDrawLayer(DL_BACKGROUND)
    cursorTlc.SetDrawLevel(0)
    cursorTlc.SetAlpha(0)
  }
  cursorTlc.SetHidden(isHidden)
  cursorTlc.SetMouseEnabled(false)
}
