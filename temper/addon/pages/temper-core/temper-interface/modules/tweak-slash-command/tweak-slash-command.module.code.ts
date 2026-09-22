import { reloadUI } from "akasha/temper/addon/shared/modules/reload-ui/reload-ui.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"

export function slashCommands(this: void): undefined {
  const leaveGroup = (): undefined => {
    if (IsUnitGrouped("player")) {
      GroupLeave()
    }
  }
  SLASH_COMMANDS["/gl"] = leaveGroup
  SLASH_COMMANDS["/groupleave"] = leaveGroup
  SLASH_COMMANDS["/ungroup"] = leaveGroup

  SLASH_COMMANDS["/rl"] = reloadUI
  SLASH_COMMANDS["/rlui"] = reloadUI
  SLASH_COMMANDS["/reload"] = reloadUI

  const logoutNow = (): undefined => {
    Logout()
  }
  SLASH_COMMANDS["/lo"] = logoutNow

  const quitNow = (): undefined => {
    Quit()
  }
  SLASH_COMMANDS["/q"] = quitNow

  SLASH_COMMANDS["/esc"] = (): undefined => {
    ZO_SceneManager_ToggleGameMenuBinding()
  }
}
