import "akasha/temper/addon/type/temper-hud-global/temper-hud-global.type-declaration.d.ts"

import { ADDON_NAME } from "akasha/temper/addon/pages/world/modules/world-names/world-names.module.code.ts"
import {
  toggleAutoQuest,
  toggleAutoQuestDebug,
} from "akasha/temper/addon/pages/world/quests/modules/quests-auto-quest/quests-auto-quest.module.code.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function registerSlashCommands(): undefined {
  SLASH_COMMANDS["/temperautoquest"] = toggleAutoQuest
  SLASH_COMMANDS["/temperautoquestdebug"] = toggleAutoQuestDebug

  globalThis.Temper?.registerCommand({
    name: "/temperautoquest",
    description: "Toggle auto-quest on/off",
    addon: ADDON_NAME,
  })
  globalThis.Temper?.registerCommand({
    name: "/temperautoquestdebug",
    description: "Toggle auto-quest debug logging",
    addon: ADDON_NAME,
  })
}
