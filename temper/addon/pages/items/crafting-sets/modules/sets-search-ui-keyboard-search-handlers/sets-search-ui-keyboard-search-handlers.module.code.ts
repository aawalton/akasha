import { asGlobalTable } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { asSetsSearchUIKeyboardObjectOpt } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-search-ui-casts/sets-search-ui-casts.module.code.ts"
import { getKeyboardSearchUIClass } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-search-ui-keyboard-class/sets-search-ui-keyboard-class.module.code.ts"
import {
  getKeyboardSearchUI,
  setKeyboardSearchUI,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-search-ui-searchui-globals/sets-search-ui-searchui-globals.module.code.ts"
import { setsSearchUISharedBringWindowToTop } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-search-ui-shared-xml-handlers/sets-search-ui-shared-xml-handlers.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes/sets-search-ui-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-fonts/eso-fonts.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const globalTable = asGlobalTable(globalThis)

let currentWidth: number | undefined
let currentHeight: number | undefined
let updateListColumnWithCounter = 0

export function setsSearchUIKeyboardTopLevelOnResize(
  this: void,
  selfControl: SearchUIControl,
  resizeStart: boolean,
  forceResizeNow?: boolean
): undefined {
  ZO_Tooltips_HideTextTooltip()
  setsSearchUISharedBringWindowToTop()
  const setsSearchUIKeyboardObject = asSetsSearchUIKeyboardObjectOpt(selfControl._object)
  if (setsSearchUIKeyboardObject === undefined) {
    return
  }
  if (resizeStart) {
    const [w, h] = selfControl.GetDimensions()
    currentWidth = w
    currentHeight = h
    setsSearchUIKeyboardObject.resultsList.updateListColumnWith = undefined
  } else {
    const [newWidth, newHeight] = selfControl.GetDimensions()
    if (
      forceResizeNow === true ||
      (currentWidth !== undefined && currentWidth !== newWidth) ||
      (newHeight !== undefined && newHeight !== currentHeight)
    ) {
      setsSearchUIKeyboardObject.SaveSearchUIPositionAndSize(selfControl)
      setsSearchUIKeyboardObject.SetMultiSelectDropdownDimensionConstraints()
      updateListColumnWithCounter += 1
      setsSearchUIKeyboardObject.resultsList.updateListColumnWith = updateListColumnWithCounter

      ZO_ScrollList_Commit(setsSearchUIKeyboardObject.resultsListControl)
    }
    currentWidth = undefined
    currentHeight = undefined
  }
}

function setsSearchUIKeyboardTopLevelOnMove(
  this: void,
  selfControl: SearchUIControl,
  moveStart: boolean
): undefined {
  ZO_Tooltips_HideTextTooltip()
  setsSearchUISharedBringWindowToTop()
  const setsSearchUIKeyboardObject = asSetsSearchUIKeyboardObjectOpt(selfControl._object)
  if (!moveStart && setsSearchUIKeyboardObject !== undefined) {
    setsSearchUIKeyboardObject.SaveSearchUIPositionAndSize(selfControl)
  }
}

export function setsSearchUIKeyboardTopLevelOnInitialized(
  this: void,
  selfControl: SearchUIControl
): undefined {
  if (getKeyboardSearchUI() !== undefined) {
    return
  }
  setKeyboardSearchUI(getKeyboardSearchUIClass().New(selfControl))
}

globalTable.LibSets_SearchUI_Keyboard_TopLevel_OnResize = setsSearchUIKeyboardTopLevelOnResize
globalTable.LibSets_SearchUI_Keyboard_TopLevel_OnMove = setsSearchUIKeyboardTopLevelOnMove
globalTable.LibSets_SearchUI_Keyboard_TopLevel_OnInitialized =
  setsSearchUIKeyboardTopLevelOnInitialized
