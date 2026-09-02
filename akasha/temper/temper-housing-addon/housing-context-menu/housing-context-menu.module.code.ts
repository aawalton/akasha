import "@akasha/temper-eso-types/eso-addon-screen"
import "@akasha/temper-eso-types/eso-chat"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-lib-custom-menu/custom-menu-declarations"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"

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
  if (portToFriend.hacks.contextMenuHackUpdated === undefined) {
    portToFriend.hacks.contextMenuHackUpdated = true
  } else {
    portToFriend.AdjustContextMenus()
    EVENT_MANAGER.UnregisterForUpdate(portToFriend.hacks.callbackName)
  }
}
portToFriend.ContextMenuHackOnUpdate = contextMenuHackOnUpdate

function sendNameToPTF(this: void, name: string): undefined {
  asHouseEditboxPanel(portToFriend.controls.house).editbox.SetText(name)
  portToFriend.OpenWindow()
}
portToFriend.SendNameToPTF = sendNameToPTF

function adjustContextMenus(this: void): undefined {
  const chatSystem = asChatSystemWithContextMenu(CHAT_SYSTEM)
  const showPlayerContextMenu = chatSystem.ShowPlayerContextMenu
  chatSystem.ShowPlayerContextMenu = function (
    this: ChatSystemWithContextMenu,
    displayName: string,
    rawName: string
  ): undefined {
    showPlayerContextMenu.call(this, displayName, rawName)
    AddCustomMenuItem(portToFriend.constants.CONTEXT_MENU_SEND ?? "", () => {
      portToFriend.SendNameToPTF(displayName)
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
      AddCustomMenuItem(portToFriend.constants.CONTEXT_MENU_SEND ?? "", () => {
        portToFriend.SendNameToPTF(data.displayName)
      })
      this.ShowMenu(control)
    }
  }
}
portToFriend.AdjustContextMenus = adjustContextMenus
