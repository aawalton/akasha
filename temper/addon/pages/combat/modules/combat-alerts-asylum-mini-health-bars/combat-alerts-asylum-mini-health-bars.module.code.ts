import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-boss-api/combat-alerts-boss-api.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchAsylumSanctorium {
    llothisId: number | undefined
    felmsId: number | undefined
    RegisterMinisBHB: (this: void) => void
    UnregisterMinisBHB: (this: void) => void
    OnLlothisDetectedBHB: (this: void) => void
    OnLlothisDormantBHB: (this: void, changeType: number) => void
    OnFelmsDetectedBHB: (this: void) => void
    OnFelmsDormantBHB: (this: void, changeType: number) => void
  }
}

const AS = CRUTCH.AsylumSanctorium
const C = CRUTCH.Constants

const MINI_HPS: Record<number, number> = {
  [26129964]: 2181284,
  [89263744]: 9314480,
}

let miniMaxHp: number

let llothisHp: number
let felmsHp: number
const REGENNING: Record<string, number | false> = { "2": false, "3": false }

function getRegenningHp(this: void, indexString: string): number {
  const elapsed = GetGameTimeSeconds() - (REGENNING[indexString] as number)
  return (miniMaxHp * elapsed) / 45
}

function spoofLlothis(this: void): undefined {
  const [, olmsMaxHp] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  miniMaxHp = MINI_HPS[olmsMaxHp] as number
  llothisHp = miniMaxHp

  CRUTCH.SpoofBoss(
    "boss2",
    "Saint Llothis the Pious",
    () => {
      if (REGENNING["2"] === undefined || REGENNING["2"] === false) {
        return $multi(llothisHp, miniMaxHp, miniMaxHp)
      }
      return $multi(getRegenningHp("2"), miniMaxHp, miniMaxHp)
    },
    C.LLOTHIS_FG,
    C.LLOTHIS_BG
  )
}

function spoofFelms(this: void): undefined {
  const [, olmsMaxHp] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  miniMaxHp = MINI_HPS[olmsMaxHp] as number
  felmsHp = miniMaxHp

  CRUTCH.SpoofBoss(
    "boss3",
    "Saint Felms the Bold",
    () => {
      if (REGENNING["3"] === undefined || REGENNING["3"] === false) {
        return $multi(felmsHp, miniMaxHp, miniMaxHp)
      }
      return $multi(getRegenningHp("3"), miniMaxHp, miniMaxHp)
    },
    C.FELMS_FG,
    C.FELMS_BG
  )
}

function unspoofMinis(this: void): undefined {
  CRUTCH.UnspoofBoss("boss2")
  CRUTCH.UnspoofBoss("boss3")
}

const onMiniDamage: CombatEventCallback = (
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  _targetName,
  _targetType,
  hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId
) => {
  if (targetUnitId === AS.llothisId) {
    llothisHp = llothisHp - hitValue
    CRUTCH.UpdateSpoofedBossHealth("boss2", llothisHp, miniMaxHp)
  } else if (targetUnitId === AS.felmsId) {
    felmsHp = felmsHp - hitValue
    CRUTCH.UpdateSpoofedBossHealth("boss3", felmsHp, miniMaxHp)
  }
}

function regenWhileDormant(this: void, indexString: string): undefined {
  REGENNING[indexString] = GetGameTimeSeconds()
  CRUTCH.SetBarColors(indexString, C.DORMANT_FG, C.DORMANT_BG)

  EVENT_MANAGER.RegisterForUpdate(`${CRUTCH.name}ASRegen${indexString}`, 1000, () => {
    CRUTCH.UpdateSpoofedBossHealth(`boss${indexString}`, getRegenningHp(indexString), miniMaxHp)
  })
}

function stopRegenning(this: void, indexString: string): undefined {
  EVENT_MANAGER.UnregisterForUpdate(`${CRUTCH.name}ASRegen${indexString}`)
  REGENNING[indexString] = false
  if (indexString === "2") {
    CRUTCH.SetBarColors(indexString, C.LLOTHIS_FG, C.LLOTHIS_BG)
  } else if (indexString === "3") {
    CRUTCH.SetBarColors(indexString, C.FELMS_FG, C.FELMS_BG)
  }
}

const DAMAGE_TYPES: Record<number, string> = {
  [ACTION_RESULT_DAMAGE]: "dmg",
  [ACTION_RESULT_CRITICAL_DAMAGE]: "dmg*",
  [ACTION_RESULT_DOT_TICK]: "tick",
  [ACTION_RESULT_DOT_TICK_CRITICAL]: "tick*",
}

AS.RegisterMinisBHB = function (this: void) {
  if (!CRUTCH.savedOptions.asylumsanctorium.showMinisHp) return

  for (const [actionResult] of pairs(DAMAGE_TYPES)) {
    const eventName = `${CRUTCH.name}ASMinis${tostring(actionResult)}`
    CRUTCH.RegisterForCombatEvent(
      eventName,
      onMiniDamage,
      actionResult,
      undefined,
      undefined,
      COMBAT_UNIT_TYPE_NONE
    )
  }
}

AS.UnregisterMinisBHB = function (this: void) {
  for (const [actionResult] of pairs(DAMAGE_TYPES)) {
    const eventName = `${CRUTCH.name}ASMinis${tostring(actionResult)}`
    CRUTCH.UnregisterForCombatEvent(eventName)
  }

  unspoofMinis()
}

AS.OnLlothisDetectedBHB = function (this: void) {
  spoofLlothis()
}

AS.OnLlothisDormantBHB = function (this: void, changeType) {
  if (changeType === EFFECT_RESULT_GAINED) {
    regenWhileDormant("2")
  } else if (changeType === EFFECT_RESULT_FADED) {
    stopRegenning("2")
    llothisHp = miniMaxHp
    CRUTCH.UpdateSpoofedBossHealth("boss2", llothisHp, miniMaxHp)
  }
}

AS.OnFelmsDetectedBHB = function (this: void) {
  spoofFelms()
}

AS.OnFelmsDormantBHB = function (this: void, changeType) {
  if (changeType === EFFECT_RESULT_GAINED) {
    regenWhileDormant("3")
  } else if (changeType === EFFECT_RESULT_FADED) {
    stopRegenning("3")
    felmsHp = miniMaxHp
    CRUTCH.UpdateSpoofedBossHealth("boss3", felmsHp, miniMaxHp)
  }
}
