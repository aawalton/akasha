import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-trials-a/declarations/combat-alerts-trials-a-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-core/combat-alerts-alerts-core.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    OnOlorimeSpears: (this: void, abilityId: number) => void
  }
}

let spearsRevealed = 0
let spearsSent = 0
let orbsDunked = 0

export function resetSpears(this: void): undefined {
  spearsRevealed = 0
  spearsSent = 0
  orbsDunked = 0
  CRUTCH.UpdateSpearsDisplay(spearsRevealed, spearsSent, orbsDunked)
}

export function onOlorimeSpears(
  this: void,
  _eventCode: number,
  result: number,
  _isError: unknown,
  _abilityName: unknown,
  _abilityGraphic: unknown,
  _abilityActionSlotType: unknown,
  sourceName: string | number,
  sourceType: number,
  targetName: string | number,
  targetType: number,
  hitValue: number,
  _powerType: unknown,
  _damageType: unknown,
  _log: unknown,
  sourceUnitId: number,
  targetUnitId: number,
  abilityId: number
): undefined {
  if (abilityId === 104019) {
    spearsRevealed = spearsRevealed + 1
    CRUTCH.UpdateSpearsDisplay(spearsRevealed, spearsSent, orbsDunked)
    if (CRUTCH.savedOptions.cloudrest.spearsSound) {
      PlaySound(SOUNDS.CHAMPION_POINTS_COMMITTED)
    }
    const label = string.format("|cFFEA00Olorime Spear!|r (%d)", spearsRevealed)
    CRUTCH.DisplayNotification(
      abilityId,
      label,
      hitValue,
      sourceUnitId,
      sourceName,
      sourceType,
      targetUnitId,
      targetName,
      targetType,
      result,
      false
    )
  } else if (abilityId === 104036) {
    spearsSent = spearsSent + 1
    if (spearsRevealed < spearsSent) spearsRevealed = spearsSent
    CRUTCH.UpdateSpearsDisplay(spearsRevealed, spearsSent, orbsDunked)
  } else if (abilityId === 104047) {
    orbsDunked = orbsDunked + 1
    CRUTCH.UpdateSpearsDisplay(spearsRevealed, spearsSent, orbsDunked)
  }
}

CRUTCH.OnOlorimeSpears = function (this: void, abilityId) {
  onOlorimeSpears(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, abilityId)
}

CRUTCH.UpdateSpearsDisplay = function (this: void, revealed, sent, dunked) {
  TemperCombatAlertsCloudrestSpear1.SetHidden(true)
  TemperCombatAlertsCloudrestSpear2.SetHidden(true)
  TemperCombatAlertsCloudrestSpear3.SetHidden(true)
  TemperCombatAlertsCloudrestCheck1.SetHidden(true)
  TemperCombatAlertsCloudrestCheck2.SetHidden(true)
  TemperCombatAlertsCloudrestCheck3.SetHidden(true)

  if (!CRUTCH.savedOptions.cloudrest.showSpears) {
    return
  }

  if (revealed === 0) {
    return
  }
  if (revealed >= 1) {
    TemperCombatAlertsCloudrestSpear1.SetHidden(false)
    if (sent >= 1) {
      TemperCombatAlertsCloudrestSpear1.SetDesaturation(1)
    } else {
      TemperCombatAlertsCloudrestSpear1.SetDesaturation(0)
    }
  }
  if (revealed >= 2) {
    TemperCombatAlertsCloudrestSpear2.SetHidden(false)
    if (sent >= 2) {
      TemperCombatAlertsCloudrestSpear2.SetDesaturation(1)
    } else {
      TemperCombatAlertsCloudrestSpear2.SetDesaturation(0)
    }
  }
  if (revealed >= 3) {
    TemperCombatAlertsCloudrestSpear3.SetHidden(false)
    if (sent >= 3) {
      TemperCombatAlertsCloudrestSpear3.SetDesaturation(1)
    } else {
      TemperCombatAlertsCloudrestSpear3.SetDesaturation(0)
    }
  }

  if (dunked >= 1) {
    TemperCombatAlertsCloudrestCheck1.SetHidden(false)
  }
  if (dunked >= 2) {
    TemperCombatAlertsCloudrestCheck2.SetHidden(false)
  }
  if (dunked >= 3) {
    TemperCombatAlertsCloudrestCheck3.SetHidden(false)
  }
}
