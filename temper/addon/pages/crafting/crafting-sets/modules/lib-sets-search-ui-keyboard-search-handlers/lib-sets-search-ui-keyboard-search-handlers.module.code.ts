import { asGlobalTable } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-casts/lib-sets-casts.module.code.ts"
import { asLibSetsSearchUIKeyboardObjectOpt } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-search-ui-casts/lib-sets-search-ui-casts.module.code.ts"
import { getKeyboardSearchUIClass } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-search-ui-keyboard-class/lib-sets-search-ui-keyboard-class.module.code.ts"
import {
  getKeyboardSearchUI,
  setKeyboardSearchUI,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-search-ui-searchui-globals/lib-sets-search-ui-searchui-globals.module.code.ts"
import { libSetsSearchUISharedBringWindowToTop } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-search-ui-shared-xml-handlers/lib-sets-search-ui-shared-xml-handlers.module.code.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/lib-sets-search-ui-shapes/lib-sets-search-ui-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-fonts/eso-fonts.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const globalTable = asGlobalTable(globalThis)

let currentWidth: number | undefined
let currentHeight: number | undefined
let updateListColumnWithCounter = 0

export function libSetsSearchUIKeyboardTopLevelOnResize(
  this: void,
  selfControl: SearchUIControl,
  resizeStart: boolean,
  forceResizeNow?: boolean
): undefined {
  ZO_Tooltips_HideTextTooltip()
  libSetsSearchUISharedBringWindowToTop()
  const libSetsSearchUIKeyboardObject = asLibSetsSearchUIKeyboardObjectOpt(selfControl._object)
  if (libSetsSearchUIKeyboardObject === undefined) {
    return
  }
  if (resizeStart) {
    const [w, h] = selfControl.GetDimensions()
    currentWidth = w
    currentHeight = h
    libSetsSearchUIKeyboardObject.resultsList.updateListColumnWith = undefined
  } else {
    const [newWidth, newHeight] = selfControl.GetDimensions()
    if (
      forceResizeNow === true ||
      (currentWidth !== undefined && currentWidth !== newWidth) ||
      (newHeight !== undefined && newHeight !== currentHeight)
    ) {
      libSetsSearchUIKeyboardObject.SaveSearchUIPositionAndSize(selfControl)
      libSetsSearchUIKeyboardObject.SetMultiSelectDropdownDimensionConstraints()
      updateListColumnWithCounter += 1
      libSetsSearchUIKeyboardObject.resultsList.updateListColumnWith = updateListColumnWithCounter

      ZO_ScrollList_Commit(libSetsSearchUIKeyboardObject.resultsListControl)
    }
    currentWidth = undefined
    currentHeight = undefined
  }
}

function libSetsSearchUIKeyboardTopLevelOnMove(
  this: void,
  selfControl: SearchUIControl,
  moveStart: boolean
): undefined {
  ZO_Tooltips_HideTextTooltip()
  libSetsSearchUISharedBringWindowToTop()
  const libSetsSearchUIKeyboardObject = asLibSetsSearchUIKeyboardObjectOpt(selfControl._object)
  if (!moveStart && libSetsSearchUIKeyboardObject !== undefined) {
    libSetsSearchUIKeyboardObject.SaveSearchUIPositionAndSize(selfControl)
  }
}

export function libSetsSearchUIKeyboardTopLevelOnInitialized(
  this: void,
  selfControl: SearchUIControl
): undefined {
  if (getKeyboardSearchUI() !== undefined) {
    return
  }
  setKeyboardSearchUI(getKeyboardSearchUIClass().New(selfControl))
}

globalTable.LibSets_SearchUI_Keyboard_TopLevel_OnResize = libSetsSearchUIKeyboardTopLevelOnResize
globalTable.LibSets_SearchUI_Keyboard_TopLevel_OnMove = libSetsSearchUIKeyboardTopLevelOnMove
globalTable.LibSets_SearchUI_Keyboard_TopLevel_OnInitialized =
  libSetsSearchUIKeyboardTopLevelOnInitialized
