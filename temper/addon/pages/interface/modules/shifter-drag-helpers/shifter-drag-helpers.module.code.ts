import {
  asCursorTLC,
  asLabelControl,
  asShifterScrollList,
} from "akasha/temper/addon/pages/interface/modules/shifter-casts/shifter-casts.module.code.ts"
import {
  CURSOR_TLC_NAME,
  DEFAULT_LIST_SETTINGS,
  EVENT_HANDLER_NAMESPACE,
  GLOBAL_MOUSE_DOWN,
  GLOBAL_MOUSE_UP,
  MOUSECURSOR_DONOTCATRE,
} from "akasha/temper/addon/pages/interface/modules/shifter-constants/shifter-constants.module.code.ts"
import { getOtherSideShifterBoxListControl } from "akasha/temper/addon/pages/interface/modules/shifter-list-ops/shifter-list-ops.module.code.ts"
import {
  CURSOR_STATE,
  EM,
  WM,
} from "akasha/temper/addon/pages/interface/modules/shifter-state/shifter-state.module.code.ts"
import type {
  DragData,
  ShifterBox,
  ShifterBoxList,
  ShifterScrollList,
} from "akasha/temper/addon/pages/interface/modules/shifter-types/shifter-types.module.code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"

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
  const shifterBoxRowHeight = otherList.rowHeight ?? DEFAULT_LIST_SETTINGS.rowHeight
  const shifterBoxScrollArea = shifterBoxRowHeight * 1.5
  let scrollValue: number | undefined
  if (offsetY < 0 || (offsetY >= 0 && offsetY <= shifterBoxScrollArea)) {
    scrollValue = shifterBoxRowHeight * 2 * -1
  } else if (offsetY <= contentsHeight && offsetY >= contentsHeight - shifterBoxScrollArea) {
    scrollValue = shifterBoxRowHeight * 2
  }
  if (scrollValue === undefined || scrollValue === 0) return
  ZO_ScrollList_ScrollRelative(otherList, scrollValue, undefined, true)
}
