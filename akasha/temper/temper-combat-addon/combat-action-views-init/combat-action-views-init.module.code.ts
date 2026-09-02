import { registerBar } from "@akasha/temper-combat-addon/combat-action-bar"
import { registerPatch } from "@akasha/temper-combat-addon/combat-action-bar-patch"
import { registerVampireStage } from "@akasha/temper-combat-addon/combat-action-vampire-view"

export function registerViews(this: void): undefined {
  registerBar()
  registerPatch()
  registerVampireStage()
  return undefined
}
