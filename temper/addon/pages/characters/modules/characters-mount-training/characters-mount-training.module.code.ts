import { currentCharacterEntry } from "akasha/temper/addon/pages/characters/modules/characters-current-entry/characters-current-entry.module.code.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"

export function collectMountTraining(this: void): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return
  const [inv, maxInv, sta, maxSta, spd, maxSpd] = GetRidingStats()
  charEntry.mountTraining = {
    speed: spd,
    maxSpeed: maxSpd,
    stamina: sta,
    maxStamina: maxSta,
    carryCapacity: inv,
    maxCarryCapacity: maxInv,
  }
}
