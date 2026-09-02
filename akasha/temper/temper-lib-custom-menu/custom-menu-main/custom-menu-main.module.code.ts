import "../custom-menu-public-api/custom-menu-public-api.module.code.ts"

import { ADDON_NAME } from "../custom-menu-constants/custom-menu-constants.module.code.ts"
import {
  hookAddSlotAction,
  hookClearMenu,
  hookContextMenu,
  hookMenuEnter,
  hookShowMenu,
  hookShowPlayerContextMenu,
  hookSocialListContextMenu,
} from "../custom-menu-hooks/custom-menu-hooks.module.code.ts"
import { LIB } from "../custom-menu-lib/custom-menu-lib.module.code.ts"
import { createSubmenu } from "../submenu-window/submenu-window.module.code.ts"

const identifier = `${ADDON_NAME}${GetTimeStamp()}`

function onAddonLoaded(this: void, _eventCode: number, name: string): undefined {
  if (string.find(name, "^ZO_")[0] !== undefined) {
    return
  }
  EVENT_MANAGER.UnregisterForEvent(identifier, EVENT_ADD_ON_LOADED)

  LIB.submenu = createSubmenu("LibCustomMenuSubmenu")
  hookClearMenu()
  hookShowMenu()
  hookMenuEnter()
  hookAddSlotAction()
  hookContextMenu()

  if (ZO_IsConsoleUI()) {
    return
  }
  hookShowPlayerContextMenu()
  hookSocialListContextMenu(
    LIB.friendsListContextMenuRegistry,
    FRIENDS_LIST,
    "FriendsListRow_OnMouseUp",
    "ZO_ScrollList_GetData"
  )
  hookSocialListContextMenu(
    LIB.ignoreListContextMenuRegistry,
    IGNORE_LIST,
    "IgnoreListPanelRow_OnMouseUp",
    "ZO_ScrollList_GetData"
  )
  hookSocialListContextMenu(
    LIB.groupListContextMenuRegistry,
    GROUP_LIST,
    "GroupListRow_OnMouseUp",
    "ZO_ScrollList_GetData"
  )

  function hookLater(this: void): undefined {
    hookSocialListContextMenu(
      LIB.guildRosterContextMenuRegistry,
      GUILD_ROSTER_KEYBOARD,
      "GuildRosterRow_OnMouseUp",
      "GetPlayerGuildMemberIndex"
    )
  }
  EVENT_MANAGER.RegisterForEvent(
    identifier,
    EVENT_PLAYER_ACTIVATED,
    function (this: void): undefined {
      EVENT_MANAGER.UnregisterForEvent(identifier, EVENT_PLAYER_ACTIVATED)
      zo_callLater(hookLater, 200)
    }
  )
}

EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_ADD_ON_LOADED)
EVENT_MANAGER.RegisterForEvent(identifier, EVENT_ADD_ON_LOADED, onAddonLoaded)
