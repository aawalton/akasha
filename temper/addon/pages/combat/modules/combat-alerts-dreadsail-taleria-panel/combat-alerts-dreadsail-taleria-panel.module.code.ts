import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel-utils/combat-alerts-info-panel-utils.module.code.ts"
import {
  isTaleria,
  isTaleriaHM,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-dreadsail-taleria/combat-alerts-dreadsail-taleria.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const PANEL_MAELSTROM_INDEX = 3
const PANEL_WINTER_STORM_INDEX = 4
const PANEL_BEHEMOTH_INDEX = 5
const PANEL_SIREN_INDEX = 6

export const MAELSTROM_ID = 166292
const maelstromPrefix = zo_strformat("|cfff1ab<<C:1>>: ", GetAbilityName(MAELSTROM_ID))

let callLaterId: number | undefined

export function onMaelstromGainedDuration(
  this: void,
  _eventCode: number,
  _result: number,
  _isError: boolean,
  _abilityName: string,
  _abilityGraphic: number,
  _abilityActionSlotType: number,
  _sourceName: string,
  _sourceType: number,
  _targetName: string,
  _targetType: number,
  hitValue: number
): undefined {
  CRUTCH.InfoPanel.CountDownDuration(PANEL_MAELSTROM_INDEX, maelstromPrefix, hitValue)
  const handle: unknown = zo_callLater(() => {
    CRUTCH.InfoPanel.CountDownToTargetTime(
      PANEL_MAELSTROM_INDEX,
      maelstromPrefix,
      GetGameTimeMilliseconds() + 31800
    )
  }, hitValue)
  callLaterId = handle as number
}

export const WINTER_STORM_CW_ID = 175447
export const WINTER_STORM_CCW_ID = 174866
const winterStormPrefix = zo_strformat("|c00CCCC<<C:1>>: ", GetAbilityName(WINTER_STORM_CW_ID))

export function onWinterStorm(this: void): undefined {
  CRUTCH.InfoPanel.CountDownDuration(PANEL_WINTER_STORM_INDEX, winterStormPrefix, 110000)
}

export const BEHEMOTH_ID = 166928
const behemothPrefix = zo_strformat("|c66CCFF<<C:1>>: ", GetAbilityName(BEHEMOTH_ID))

export function onBehemothSummoned(this: void): undefined {
  if (isTaleriaHM()) {
    CRUTCH.InfoPanel.CountDownDuration(PANEL_BEHEMOTH_INDEX, behemothPrefix, 45000)
  } else {
    CRUTCH.InfoPanel.CountDownDuration(PANEL_BEHEMOTH_INDEX, behemothPrefix, 63000)
  }
}

export const SIREN_ID = 166929
const sirenPrefix = zo_strformat("|c9966FF<<C:1>>: ", GetAbilityName(SIREN_ID))

export function onSirenSummoned(this: void): undefined {
  CRUTCH.InfoPanel.CountDownDuration(PANEL_SIREN_INDEX, sirenPrefix, 98000)
}

export function onLureOfTheSea(this: void): undefined {
  PlaySound(SOUNDS.JUSTICE_NOW_KOS)
  PlaySound(SOUNDS.JUSTICE_NOW_KOS)
  PlaySound(SOUNDS.JUSTICE_NOW_KOS)
}

export function onPlatformFall(this: void): undefined {
  CRUTCH.InfoPanel.CountDownDuration(PANEL_WINTER_STORM_INDEX, winterStormPrefix, 60000)
  CRUTCH.InfoPanel.CountDownDuration(PANEL_SIREN_INDEX, sirenPrefix, 25300)
}

export function onCombat(this: void): undefined {
  if (isTaleria()) {
    if (CRUTCH.savedOptions.dreadsailreef.infoPanel.showMaelstrom) {
      CRUTCH.InfoPanel.CountDownDuration(PANEL_MAELSTROM_INDEX, maelstromPrefix, 12000)
    }
    if (CRUTCH.savedOptions.dreadsailreef.infoPanel.showBehemothSpawn) {
      CRUTCH.InfoPanel.CountDownDuration(PANEL_BEHEMOTH_INDEX, behemothPrefix, 5700)
    }
  }
}

export function stopTaleriaCounts(this: void): undefined {
  CRUTCH.InfoPanel.StopCount(PANEL_MAELSTROM_INDEX)
  if (callLaterId !== undefined) {
    zo_removeCallLater(callLaterId)
  }
  CRUTCH.InfoPanel.StopCount(PANEL_BEHEMOTH_INDEX)
  CRUTCH.InfoPanel.StopCount(PANEL_WINTER_STORM_INDEX)
  CRUTCH.InfoPanel.StopCount(PANEL_SIREN_INDEX)
}
