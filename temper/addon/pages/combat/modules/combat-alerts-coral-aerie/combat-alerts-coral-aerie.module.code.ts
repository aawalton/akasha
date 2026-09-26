import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    DisplayDamageable: (this: void, time: number, displayFormat?: string) => void
  }
}

const GRYPHON_CHECKER_IDS: Record<number, string> = {
  [158700]: "Ofallo",
  [158715]: "Iliata",
  [158716]: "Mafremare",
  [163184]: "Ofallo",
  [163185]: "Iliata",
  [163188]: "Mafremare",
  [163597]: "Kargaeda",
}

const onGryphon: CombatEventCallback = function (
  this: void,
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
  _hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  _targetUnitId,
  abilityId
) {
  CRUTCH.DisplayDamageable(9.2, tostring(GRYPHON_CHECKER_IDS[abilityId]) + " in ")
}

function registerCoralAerie(this: void): undefined {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Coral Aerie")

  if (CRUTCH.savedOptions.general.showDamageable) {
    for (const [abilityId] of pairs(GRYPHON_CHECKER_IDS)) {
      CRUTCH.RegisterForCombatEvent(
        "Gryphon" + abilityId,
        onGryphon,
        ACTION_RESULT_EFFECT_GAINED,
        abilityId
      )
    }
  }
}

function unregisterCoralAerie(this: void): undefined {
  for (const [abilityId] of pairs(GRYPHON_CHECKER_IDS)) {
    CRUTCH.UnregisterForCombatEvent("Gryphon" + abilityId)
  }

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Coral Aerie")
}

registerZone(1301, registerCoralAerie, unregisterCoralAerie)
