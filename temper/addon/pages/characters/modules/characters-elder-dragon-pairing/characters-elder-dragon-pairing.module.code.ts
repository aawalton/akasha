import { ADDON_NAME } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-addon-constants/completion-addon-constants.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-04/eso-enums-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"

const ELDER_DRAGON_RANKS: ReadonlySet<number> = new Set([29460, 44951])

const POLL_MS = 100

const POLL_UPDATE = ADDON_NAME + "_ElderDragonPoll"

let healthLast: number | undefined

let healthPrior: number | undefined

let recoveryLast: number | undefined

let polling = false

export function healthBefore(): number | undefined {
  return healthPrior
}

function elderDragonHeld(): boolean {
  const lines = GetNumSkillLines(SKILL_TYPE_CLASS)
  for (let lineIndex = 1; lineIndex <= lines; lineIndex++) {
    const abilities = GetNumSkillAbilities(SKILL_TYPE_CLASS, lineIndex)
    for (let skillIndex = 1; skillIndex <= abilities; skillIndex++) {
      if (!IsSkillAbilityPurchased(SKILL_TYPE_CLASS, lineIndex, skillIndex)) continue
      const abilityId = GetSkillAbilityId(SKILL_TYPE_CLASS, lineIndex, skillIndex, false)
      if (ELDER_DRAGON_RANKS.has(abilityId)) return true
    }
  }
  return false
}

function stopPolling(): undefined {
  EVENT_MANAGER.UnregisterForUpdate(POLL_UPDATE)
  polling = false
  recoveryLast = undefined
}

function startPolling(keep: (this: void) => undefined): undefined {
  if (polling) return
  polling = true
  EVENT_MANAGER.RegisterForUpdate(POLL_UPDATE, POLL_MS, function (this: void): undefined {
    const [current, maximum] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_HEALTH)
    if (current >= maximum) {
      stopPolling()
      return
    }
    const recovery = GetPlayerStat(STAT_HEALTH_REGEN_COMBAT, STAT_BONUS_OPTION_APPLY_BONUS)
    const changed = recoveryLast !== undefined && recovery !== recoveryLast
    recoveryLast = recovery
    if (changed) keep()
  })
}

export function registerElderDragonPairing(keep: (this: void) => undefined): undefined {
  const name = ADDON_NAME + "_ElderDragonHealth"
  EVENT_MANAGER.RegisterForEvent(
    name,
    EVENT_POWER_UPDATE,
    function (
      this: void,
      _event: number,
      _unitTag: string,
      _powerIndex: number,
      powerType: number,
      value: number,
      maximum: number
    ): undefined {
      if (powerType !== COMBAT_MECHANIC_FLAGS_HEALTH) return
      if (value === healthLast) return
      healthPrior = healthLast
      healthLast = value
      if (value < maximum && !polling && elderDragonHeld()) startPolling(keep)
    }
  )
  EVENT_MANAGER.AddFilterForEvent(name, EVENT_POWER_UPDATE, REGISTER_FILTER_UNIT_TAG, "player")
}
