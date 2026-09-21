import { initializeActions } from "akasha/temper/addon/pages/combat/modules/combat-actions-init/combat-actions-init.module.code.ts"
import {
  setInCombat,
  setInitialized,
} from "akasha/temper/addon/pages/combat/modules/combat-addon-state/combat-addon-state.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/combat/modules/combat-constants/combat-constants.module.code.ts"
import {
  initCurrentData,
  initializeChat,
  updateEvents,
} from "akasha/temper/addon/pages/combat/modules/combat-core-events/combat-core-events.module.code.ts"
import { log } from "akasha/temper/addon/pages/combat/modules/combat-core-log/combat-core-log.module.code.ts"
import {
  setPenetrationDebuffValue,
  VARIABLE_PENETRATION_DEBUFF_ABILITY_IDS,
} from "akasha/temper/addon/pages/combat/modules/combat-data-tables/combat-data-tables.module.code.ts"
import { setFightDataLog } from "akasha/temper/addon/pages/combat/modules/combat-fight-data-log/combat-fight-data-log.module.code.ts"
import { initializeLibCombat } from "akasha/temper/addon/pages/combat/modules/combat-lib-init/combat-lib-init.module.code.ts"
import { setLibCombatLog } from "akasha/temper/addon/pages/combat/modules/combat-lib-log/combat-lib-log.module.code.ts"
import { makeMenu } from "akasha/temper/addon/pages/combat/modules/combat-menu/combat-menu.module.code.ts"
import { initializeFightData } from "akasha/temper/addon/pages/combat/modules/combat-saved-fights/combat-saved-fights.module.code.ts"
import {
  getSvDefaults,
  initializeSavedVariables,
} from "akasha/temper/addon/pages/combat/modules/combat-saved-variables/combat-saved-variables.module.code.ts"
import { registerSlashCommands } from "akasha/temper/addon/pages/combat/modules/combat-slash-command/combat-slash-command.module.code.ts"
import { initializeUI } from "akasha/temper/addon/pages/combat/modules/combat-ui-window/combat-ui-window.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function initializeCore(): undefined {
  const db = initializeSavedVariables()

  setLibCombatLog((category, level, formatString, ...args) =>
    log(category, level, formatString, ...args)
  )
  setFightDataLog((level, formatString, ...args) => log("save", level, formatString, ...args))

  initializeLibCombat()

  for (const [debuffKey] of pairs(VARIABLE_PENETRATION_DEBUFF_ABILITY_IDS)) {
    setPenetrationDebuffValue(debuffKey)
  }

  if (db.chatLog.enabled) {
    zo_callLater(initializeChat, 500)
  }

  setInCombat(IsUnitInCombat("player"))

  initializeUI()

  EVENT_MANAGER.RegisterForEvent(`${ADDON_NAME}zone`, EVENT_ZONE_CHANGED, updateEvents)
  EVENT_MANAGER.RegisterForEvent(`${ADDON_NAME}group1`, EVENT_GROUP_UPDATE, updateEvents)
  EVENT_MANAGER.RegisterForEvent(`${ADDON_NAME}port`, EVENT_PLAYER_ACTIVATED, updateEvents)

  initCurrentData()

  makeMenu(getSvDefaults())

  setInitialized(true)
  initializeFightData()

  registerSlashCommands()

  initializeActions()
  return undefined
}
