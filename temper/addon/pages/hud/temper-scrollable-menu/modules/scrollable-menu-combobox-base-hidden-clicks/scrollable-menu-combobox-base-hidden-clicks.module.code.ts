import { asLsmCastGetOwningWindowThisVoidRecordStringUnknownUnde } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-casts-1c/scrollable-menu-casts-1c.module.code.ts"
import { asLsmCastThisVoidCtrlUnknownBoolean } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import { lib } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-state/scrollable-menu-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const libUtil = lib.Util

const tos = tostring

const belongsToContextMenuCheck = asLsmCastThisVoidCtrlUnknownBoolean(
  libUtil.belongsToContextMenuCheck
)

interface HiddenClicksSearchable {
  WasTextSearchContextMenuEntryClicked: (this: void) => boolean
}

interface HiddenClicksContextMenu {
  m_dropdownObject: HiddenClicksSearchable
}

export function contextMenuClickFlags(
  this: void,
  gContextMenu: HiddenClicksContextMenu,
  dropdownObject: HiddenClicksSearchable,
  mocCtrl: Record<string, unknown> | undefined,
  isContextMenuVisible: boolean
): LuaMultiReturn<[boolean, boolean, boolean, boolean, boolean]> {
  const doDebugNow = false
  let wasTextSearchContextMenuEntryClicked = dropdownObject.WasTextSearchContextMenuEntryClicked()
  let wasFilterHeaderClicked = false
  let wasEditBoxClickedAtContextMenu = false
  let wasSliderClickedAtContextMenu = false
  let wasMultiIconClickedAtContextMenu = false
  if (isContextMenuVisible && !wasTextSearchContextMenuEntryClicked) {
    wasTextSearchContextMenuEntryClicked =
      gContextMenu.m_dropdownObject.WasTextSearchContextMenuEntryClicked()
    if (doDebugNow) {
      d(">wasTextSearchContextMenuEntryClicked: " + tos(wasTextSearchContextMenuEntryClicked))
    }
    if (!wasTextSearchContextMenuEntryClicked) {
      if (mocCtrl !== undefined) {
        if (mocCtrl.isEditBox === true) {
          wasEditBoxClickedAtContextMenu = true
          if (doDebugNow) {
            d(">wasEditBoxClickedAtContextMenu: " + tos(wasEditBoxClickedAtContextMenu))
          }
        } else if (mocCtrl.isSlider === true) {
          wasSliderClickedAtContextMenu = true
          if (doDebugNow) {
            d(">wasSliderClickedAtContextMenu: " + tos(wasSliderClickedAtContextMenu))
          }
        } else if (mocCtrl.ClearIcons) {
          if (!mocCtrl.closeOnSelect) {
            wasMultiIconClickedAtContextMenu = true
            if (doDebugNow) {
              d(">wasMultiIconClickedAtContextMenu: " + tos(wasMultiIconClickedAtContextMenu))
            }
          }
        } else {
          const owningWindowOfMocCtrl =
            asLsmCastGetOwningWindowThisVoidRecordStringUnknownUnde(mocCtrl).GetOwningWindow()
          if (owningWindowOfMocCtrl !== undefined) {
            if (owningWindowOfMocCtrl.header && belongsToContextMenuCheck(owningWindowOfMocCtrl)) {
              if (doDebugNow) {
                d(">clicked header's child control at the contextMenu")
              }
              wasFilterHeaderClicked = true
            }
          }
        }
      }
    }
  }
  return $multi(
    wasTextSearchContextMenuEntryClicked,
    wasFilterHeaderClicked,
    wasEditBoxClickedAtContextMenu,
    wasSliderClickedAtContextMenu,
    wasMultiIconClickedAtContextMenu
  )
}
