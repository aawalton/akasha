import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-utils/combat-alerts-utils.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-event-utils/combat-alerts-event-utils.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-style/combat-alerts-style.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-global-events/combat-alerts-global-events.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-commands/combat-alerts-commands.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-entry/combat-alerts-alerts-entry.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-entry/combat-alerts-drawing-entry.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-bosshealthbar-entry/combat-alerts-bosshealthbar-entry.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-panels/modules/entry/combat-alerts-panels-entry.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/entry/combat-alerts-settings-entry.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-trials-a-entry/combat-alerts-trials-a-entry.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-trials-b-entry/combat-alerts-trials-b-entry.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-trials-c-entry/combat-alerts-trials-c-entry.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-trials-d-entry/combat-alerts-trials-d-entry.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-arenas-entry/combat-alerts-arenas-entry.module.code.ts"

import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { initializeAlerts } from "akasha/temper/addon/pages/combat/modules/combat-alerts-main/combat-alerts-main.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/combat/modules/combat-constants/combat-constants.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"

globalThis.TemperCombatAlerts = CRUTCH

registerAddonInit(ADDON_NAME, initializeAlerts, CRUTCH.name)
