import {
  asCursorTLC,
  asLabelControl,
  asShifterScrollList,
} from "../shifter-casts/shifter-casts.module.code.ts"
import {
  CURSOR_TLC_NAME,
  DEFAULT_LIST_SETTINGS,
  EVENT_HANDLER_NAMESPACE,
  GLOBAL_MOUSE_DOWN,
  GLOBAL_MOUSE_UP,
  MOUSECURSOR_DONOTCATRE,
} from "../shifter-constants/shifter-constants.module.code.ts"
import { getOtherSideShifterBoxListControl } from "../shifter-list-ops/shifter-list-ops.module.code.ts"
import { CURSOR_STATE, EM, WM } from "../shifter-state/shifter-state.module.code.ts"
import type {
  DragData,
  ShifterBox,
  ShifterBoxList,
  ShifterScrollList,
} from "../shifter-types/shifter-types.module.code.ts"

export function setMouseCursor(cursorName: number): undefined {
  WM.SetMouseCursor(cursorName)
}

export function getCursorTLC(): undefined {
  let tlc = CURSOR_STATE.tlc
  if (tlc === undefined) {
    tlc = asCursorTLC(WM.GetControlByName(CURSOR_TLC_NAME))
    CURSOR_STATE.tlc = tlc
  }
  if (tlc === undefined) return
  tlc.label = tlc.label ?? asLabelControl(GetControl(tlc, "Label"))
  tlc.ClearAnchors()
  tlc.SetDimensions(0, 0)
}

export function getDraggedDataAndTarget(
  shifterBox: ShifterBox
): LuaMultiReturn<
  [DragData | undefined, ShifterBoxList | undefined, ShifterScrollList | undefined]
> {
  const dragData = shifterBox.currentDragData
  const sourceListControl = dragData?._sourceListControl
  const otherSideShifterBox =
    sourceListControl === undefined
      ? undefined
      : getOtherSideShifterBoxListControl(sourceListControl)
  return $multi(dragData, sourceListControl, otherSideShifterBox)
}

export function clearDragging(shifterBox: ShifterBox): undefined {
  shifterBox.currentDragData = undefined
  shifterBox.draggingUpdateTime = undefined
  shifterBox.draggingMouseButtonPressed = undefined
}

export function disableOnUpdateHandler(shifterBox: ShifterBox): undefined {
  EM.UnregisterForEvent(EVENT_HANDLER_NAMESPACE + GLOBAL_MOUSE_DOWN, EVENT_GLOBAL_MOUSE_DOWN)
  EM.UnregisterForEvent(EVENT_HANDLER_NAMESPACE + GLOBAL_MOUSE_UP, EVENT_GLOBAL_MOUSE_UP)
  shifterBox.shifterBoxControl.SetHandler("OnUpdate", undefined)

  shifterBox.UpdateCursorTLC(true, undefined)
}

export function abortDragging(shifterBox: ShifterBox): undefined {
  disableOnUpdateHandler(shifterBox)
  clearDragging(shifterBox)
}

export function checkIfDraggedAndDisableUpdateHandler(_lamPanel?: unknown): undefined {
  if (CURSOR_STATE.tlc === undefined) getCursorTLC()
  const tlc = CURSOR_STATE.tlc
  if (tlc === undefined) return
  const shifterBox = tlc.shifterBox
  if (shifterBox === undefined || shifterBox.currentDragData === undefined) return
  abortDragging(shifterBox)
  setMouseCursor(MOUSECURSOR_DONOTCATRE)
}

export function resetDragData(shifterBox: ShifterBox): undefined {
  abortDragging(shifterBox)
  setMouseCursor(MOUSECURSOR_DONOTCATRE)
}

export function autoScroll(shifterBox: ShifterBox): undefined {
  const [dragData, sourceListControl, otherSideShifterBoxList] = getDraggedDataAndTarget(shifterBox)
  if (
    dragData === undefined ||
    sourceListControl === undefined ||
    otherSideShifterBoxList === undefined
  ) {
    resetDragData(shifterBox)
  }
  const otherList = asShifterScrollList(otherSideShifterBoxList)
  const contents = otherList.contents
  const numContentChildren = contents !== undefined ? contents.GetNumChildren() : 0
  const contentsHeight = contents.GetHeight()
  if (contents === undefined || numContentChildren === 0) return
  const controlBelowMouse = moc()
  if (
    controlBelowMouse === undefined ||
    controlBelowMouse.GetParent === undefined ||
    controlBelowMouse.GetParent() !== contents
  ) {
    return
  }
  const [, , , , , offsetY] = controlBelowMouse.GetAnchor(0)
  const libShifterBoxRowHeight = otherList.rowHeight ?? DEFAULT_LIST_SETTINGS.rowHeight
  const libShifterBoxScrollArea = libShifterBoxRowHeight * 1.5
  let scrollValue: number | undefined
  if (offsetY < 0 || (offsetY >= 0 && offsetY <= libShifterBoxScrollArea)) {
    scrollValue = libShifterBoxRowHeight * 2 * -1
  } else if (offsetY <= contentsHeight && offsetY >= contentsHeight - libShifterBoxScrollArea) {
    scrollValue = libShifterBoxRowHeight * 2
  }
  if (scrollValue === undefined || scrollValue === 0) return
  ZO_ScrollList_ScrollRelative(otherList, scrollValue, undefined, true)
}
