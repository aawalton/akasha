import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-utils/combat-alerts-utils.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-event-utils/combat-alerts-event-utils.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-style/combat-alerts-style.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-global-events/combat-alerts-global-events.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-commands/combat-alerts-commands.module.code.ts"

import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { initializeAlerts } from "akasha/temper/addon/pages/combat/modules/combat-alerts-main/combat-alerts-main.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/combat/modules/combat-constants/combat-constants.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"

globalThis.TemperCombatAlerts = CRUTCH

registerAddonInit(ADDON_NAME, initializeAlerts, CRUTCH.name)
