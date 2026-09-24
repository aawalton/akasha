import "akasha/temper/eso/type/eso-addon-screen/eso-addon-screen.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-custom-menu/menu-decl/menu-decl.type-declaration.d.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/housing-declarations/housing-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

interface HouseEditbox {
  SetText: (this: HouseEditbox, text: string) => void
}
interface HouseEditboxPanel {
  editbox: HouseEditbox
}
function asHouseEditboxPanel(value: unknown): HouseEditboxPanel {
  return value as HouseEditboxPanel
}

interface ChatSystemWithContextMenu {
  ShowPlayerContextMenu: (
    this: ChatSystemWithContextMenu,
    displayName: string,
    rawName: string
  ) => void
}
function asChatSystemWithContextMenu(value: unknown): ChatSystemWithContextMenu {
  return value as ChatSystemWithContextMenu
}

interface GuildRosterRowData {
  displayName: string
}

interface GuildRosterKeyboard {
  GuildRosterRow_OnMouseUp: (
    this: GuildRosterKeyboard,
    control: Control,
    button: number,
    upInside: boolean
  ) => void
  ShowMenu: (this: GuildRosterKeyboard, control: Control) => void
}
function asGuildRosterRowData(value: unknown): GuildRosterRowData | undefined {
  return value as GuildRosterRowData | undefined
}

function asGuildRosterKeyboard(value: unknown): GuildRosterKeyboard {
  return value as GuildRosterKeyboard
}

function contextMenuHackOnUpdate(this: void): undefined {
  if (houseTravel.hacks.contextMenuHackUpdated === undefined) {
    houseTravel.hacks.contextMenuHackUpdated = true
  } else {
    houseTravel.AdjustContextMenus()
    EVENT_MANAGER.UnregisterForUpdate(houseTravel.hacks.callbackName)
  }
}
houseTravel.ContextMenuHackOnUpdate = contextMenuHackOnUpdate

function sendNameToLibrary(this: void, name: string): undefined {
  asHouseEditboxPanel(houseTravel.controls.house).editbox.SetText(name)
  houseTravel.OpenWindow()
}
houseTravel.SendNameToLibrary = sendNameToLibrary

function adjustContextMenus(this: void): undefined {
  const chatSystem = asChatSystemWithContextMenu(CHAT_SYSTEM)
  const showPlayerContextMenu = chatSystem.ShowPlayerContextMenu
  chatSystem.ShowPlayerContextMenu = function (
    this: ChatSystemWithContextMenu,
    displayName: string,
    rawName: string
  ): undefined {
    showPlayerContextMenu.call(this, displayName, rawName)
    AddCustomMenuItem(houseTravel.constants.CONTEXT_MENU_SEND ?? "", () => {
      houseTravel.SendNameToLibrary(displayName)
    })
    if (ZO_Menu_GetNumMenuItems() > 0) {
      ShowMenu()
    }
  }

  const guildRoster = asGuildRosterKeyboard(GUILD_ROSTER_KEYBOARD)
  const guildRosterRowOnMouseUp = guildRoster.GuildRosterRow_OnMouseUp
  guildRoster.GuildRosterRow_OnMouseUp = function (
    this: GuildRosterKeyboard,
    control: Control,
    button: number,
    upInside: boolean
  ): undefined {
    const data = asGuildRosterRowData(ZO_ScrollList_GetData(control))
    guildRosterRowOnMouseUp.call(this, control, button, upInside)

    if (button !== MOUSE_BUTTON_INDEX_RIGHT) {
      return
    }

    if (data !== undefined) {
      AddCustomMenuItem(houseTravel.constants.CONTEXT_MENU_SEND ?? "", () => {
        houseTravel.SendNameToLibrary(data.displayName)
      })
      this.ShowMenu(control)
    }
  }
}
houseTravel.AdjustContextMenus = adjustContextMenus
