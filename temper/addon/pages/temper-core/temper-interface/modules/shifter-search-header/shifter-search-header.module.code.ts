import { asControl } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/shifter-casts/shifter-casts.module.code.ts"
import { refreshFilters } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/shifter-helpers/shifter-helpers.module.code.ts"
import type {
  ShifterBox,
  ShifterBoxList,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/shifter-types/shifter-types.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-custom-menu/menu-decl/menu-decl.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function onSearchHeaderEditBoxReturnKey(
  shifterBox: ShifterBox | undefined,
  listObj: ShifterBoxList | undefined,
  editBoxCtrl: EditControl | undefined
): undefined {
  if (shifterBox === undefined || listObj === undefined || editBoxCtrl === undefined) return
  if (listObj.searchStr === undefined) return
  refreshFilters(listObj, undefined, false)
}

export function onSearchHeaderEditBoxTextChanged(
  shifterBox: ShifterBox | undefined,
  listObj: ShifterBoxList | undefined,
  editBoxCtrl: EditControl | undefined,
  _textData?: unknown
): undefined {
  if (shifterBox === undefined || listObj === undefined || editBoxCtrl === undefined) return
  const searchStr = editBoxCtrl.GetText()
  listObj.searchStr = searchStr
}

function toggleSearchHeaderUI(
  _shifterBox: ShifterBox,
  listObj: ShifterBoxList,
  _searchButtonCtrl: Control
): undefined {
  const currentState = listObj.isSearchHeaderUIShown
  const newState = !currentState
  const searchHeaderUIControl = listObj.searchHeaderUI
  searchHeaderUIControl.SetHidden(!newState)

  const sortHeaderGroup = listObj.sortHeaderGroup
  asControl(sortHeaderGroup.headerContainer.GetNamedChild("Arrow")).SetHidden(newState)
  asControl(sortHeaderGroup.headerContainer.GetNamedChild("Value")).SetHidden(newState)

  listObj.isSearchHeaderUIShown = newState
  if (newState === true) {
    listObj.searchHeaderUIEditBox.TakeFocus()
    listObj.searchHeaderUIEditBox.SelectAll()
  }
}

export function onSearchHeaderButtonClicked(
  shifterBox: ShifterBox | undefined,
  listObj: ShifterBoxList | undefined,
  buttonCtrl: Control | undefined
): undefined {
  if (shifterBox === undefined || listObj === undefined || buttonCtrl === undefined) return
  listObj.searchStr = undefined
  toggleSearchHeaderUI(shifterBox, listObj, buttonCtrl)
}
