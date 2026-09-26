import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-core/combat-alerts-alerts-core.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel-utils/combat-alerts-info-panel-utils.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import {
  isHM,
  unspoofAllIcons,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-ossein-twins-health/combat-alerts-ossein-twins-health.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    DisplayDamageable: (this: void, time: number, displayFormat?: string) => void
  }
  interface CrutchOsseinCage {
    IsJynorah: (this: void) => boolean
    CleanUp: (this: void) => void
  }
}

const C = CRUTCH.Constants
const OC = CRUTCH.OsseinCage

export const PANEL_CLASH_INDEX = 3
export const PANEL_LEAP_INDEX = 5

const LEAP_IDS = [234704, 233452, 233477, 234722, 233466, 233489]

let lastLeap = 0
function countDownLeap(this: void, durationMs: number, preventOverwrite: boolean): undefined {
  const currTime = GetGameTimeMilliseconds()
  if (preventOverwrite && currTime - lastLeap < 3000) {
    lastLeap = currTime
    return
  }
  lastLeap = currTime

  if (CRUTCH.savedOptions.osseincage.panel.showLeap) {
    CRUTCH.InfoPanel.CountDownDuration(
      PANEL_LEAP_INDEX,
      "|cfff1ab" + GetAbilityName(233453) + ": ",
      durationMs
    )
  }
}

let firstLeap = true
let numClashes = 0

export function resetClashes(this: void): undefined {
  numClashes = 0
  firstLeap = true
}

function onClashBegin(this: void): undefined {
  CRUTCH.dbgOther("clash begin")
  firstLeap = false
  numClashes = numClashes + 1

  CRUTCH.InfoPanel.StopCount(PANEL_LEAP_INDEX)

  if (CRUTCH.savedOptions.osseincage.panel.showClash) {
    CRUTCH.InfoPanel.CountDownHardStop(
      PANEL_CLASH_INDEX,
      "|cff6600" + GetAbilityName(232517) + ": ",
      36500,
      true
    )
  }
}

function onClashFaded(this: void): undefined {
  CRUTCH.dbgOther("clash FADED")

  unspoofAllIcons()

  let timer = 21500
  if (isHM()) {
    timer = 12500
  }
  countDownLeap(timer, false)

  if (CRUTCH.savedOptions.general.showDamageable) {
    CRUTCH.DisplayDamageable(2.25, "Jump in ")
  }
}

function onLeap(this: void): undefined {
  let timer = 46100

  if (firstLeap) {
    firstLeap = false
    timer = 84000
  }

  countDownLeap(timer, true)
}

export function onCombatStart(this: void): undefined {
  if (!OC.IsJynorah()) {
    return
  }

  let timer = 10500
  if (isHM()) {
    timer = 5500
  }
  countDownLeap(timer, true)
}

export function registerPanelEvents(this: void): undefined {
  for (const id of LEAP_IDS) {
    CRUTCH.RegisterForCombatEvent("Leap" + id, onLeap, ACTION_RESULT_BEGIN, id)
  }

  CRUTCH.RegisterForCombatEvent("TitanicClashBegin", onClashBegin, ACTION_RESULT_BEGIN, 232375)

  CRUTCH.RegisterForCombatEvent(
    "TitanicClashFaded",
    onClashFaded,
    ACTION_RESULT_EFFECT_FADED,
    232375
  )
}

export function unregisterPanelEvents(this: void): undefined {
  for (const id of LEAP_IDS) {
    CRUTCH.UnregisterForCombatEvent("Leap" + id)
  }

  CRUTCH.UnregisterForCombatEvent("TitanicClashBegin")
  CRUTCH.UnregisterForCombatEvent("TitanicClashFaded")

  OC.CleanUp()
}

const ATROS: Record<number, number> = {}

function onRadiance(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  _unitTag: string,
  _beginTime: number,
  _endTime: number,
  _stackCount: number,
  _iconName: string,
  _buffType: string,
  _effectType: number,
  _abilityType: number,
  _statusEffectType: number,
  unitName: string,
  unitId: number,
  abilityId: number,
  sourceType: number
): undefined {
  if (changeType === EFFECT_RESULT_GAINED) {
    ATROS[unitId] = 625279

    CRUTCH.DisplayNotification(
      abilityId,
      GetAbilityName(abilityId),
      3,
      unitId,
      unitName,
      sourceType,
      unitId,
      unitName,
      sourceType,
      changeType,
      true
    )
  } else if (changeType === EFFECT_RESULT_FADED) {
    CRUTCH.DisplayNotification(
      C.ID.SEEKING_SURGE_DROPPED,
      "|cff00ffSeeking Surge dropped!|r",
      5,
      unitId,
      unitName,
      sourceType,
      unitId,
      unitName,
      sourceType,
      changeType,
      true
    )
    delete ATROS[unitId]
  }
}

export function registerHardmodeAtros(this: void): undefined {
  CRUTCH.RegisterForEffectChanged("OCColdFlameAtroSpawn", onRadiance, 234680)
  CRUTCH.RegisterForEffectChanged("OCFlameAtroSpawn", onRadiance, 234683)
}

export function unregisterHardmodeAtros(this: void): undefined {
  CRUTCH.UnregisterForEffectChanged("OCColdFlameAtroSpawn")
  CRUTCH.UnregisterForEffectChanged("OCFlameAtroSpawn")
}
