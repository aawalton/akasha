import { registerEngineEvents } from "akasha/temper/addon/pages/combat/modules/combat-action-events/combat-action-events.module.code.ts"
import { registerViews } from "akasha/temper/addon/pages/combat/modules/combat-action-views-init/combat-action-views-init.module.code.ts"
import { initSavedVariables } from "akasha/temper/addon/pages/combat/modules/combat-actions-saved-variables/combat-actions-saved-variables.module.code.ts"

export function initializeActions(): undefined {
  initSavedVariables()
  registerViews()
  registerEngineEvents()
  return undefined
}
