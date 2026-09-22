import "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/custom-menu-public-api/custom-menu-public-api.module.code.ts"

import { CUSTOM_MENU_GLOBAL } from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/custom-menu-constants/custom-menu-constants.module.code.ts"
import {
  hookAddSlotAction,
  hookClearMenu,
  hookContextMenu,
  hookMenuEnter,
  hookShowMenu,
  hookShowPlayerContextMenu,
  hookSocialListContextMenu,
} from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/custom-menu-hooks/custom-menu-hooks.module.code.ts"
import { LIB } from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/custom-menu-lib/custom-menu-lib.module.code.ts"
import { createSubmenu } from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/submenu-window/submenu-window.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-custom-menu/menu-decl/menu-decl.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const identifier = `${CUSTOM_MENU_GLOBAL}${GetTimeStamp()}`

function onAddonLoaded(this: void, _eventCode: number, name: string): undefined {
  if (string.find(name, "^ZO_")[0] !== undefined) {
    return
  }
  EVENT_MANAGER.UnregisterForEvent(identifier, EVENT_ADD_ON_LOADED)

  LIB.submenu = createSubmenu("TemperCustomMenuSubmenu")
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

EVENT_MANAGER.UnregisterForEvent(CUSTOM_MENU_GLOBAL, EVENT_ADD_ON_LOADED)
EVENT_MANAGER.RegisterForEvent(identifier, EVENT_ADD_ON_LOADED, onAddonLoaded)
