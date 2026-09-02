import "@akasha/temper-combat-addon/combat-controls-title"
import "@akasha/temper-combat-addon/combat-controls-report"
import "@akasha/temper-combat-addon/combat-controls-panels"
import "@akasha/temper-combat-addon/combat-string-ids"
import "@akasha/temper-combat-addon/combat-string-ids-report"
import "@akasha/temper-combat-addon/combat-string-ids-menus"
import "@akasha/temper-combat-addon/combat-menu-string-ids"
import "@akasha/temper-combat-addon/combat-public-api"
import "@akasha/temper-combat-addon/combat-ui-context-menus"
import "@akasha/temper-combat-addon/combat-ui-selection"
import "@akasha/temper-combat-addon/combat-ui-tooltips"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { ADDON_NAME } from "@akasha/temper-combat-addon/combat-constants"
import { setCombatLogStringFormatter } from "@akasha/temper-combat-addon/combat-core-events"
import { initializeCore } from "@akasha/temper-combat-addon/combat-core-init"
import { resetFight } from "@akasha/temper-combat-addon/combat-lib-fight"
import { getCombatLogString } from "@akasha/temper-combat-addon/combat-lib-log-strings"
import { registerStrings } from "@akasha/temper-combat-addon/combat-strings"

registerStrings()

setCombatLogStringFormatter(getCombatLogString)

TemperCombat.ResetFight = resetFight

function initialize(this: void): undefined {
  initializeCore()
}

registerAddonInit(ADDON_NAME, initialize)
