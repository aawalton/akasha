import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-core/combat-alerts-alerts-core.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

const onMagBombFaded: CombatEventCallback = (
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
) => {
  CRUTCH.dbgSpam("magicka bomb faded")
  CRUTCH.InterruptAbility(abilityId)
}

function registerSanctumOphidia(this: void): undefined {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Sanctum Ophidia")

  CRUTCH.RegisterForCombatEvent(
    "MagBomb",
    onMagBombFaded,
    ACTION_RESULT_EFFECT_FADED,
    56782,
    undefined,
    COMBAT_UNIT_TYPE_PLAYER
  )
}

function unregisterSanctumOphidia(this: void): undefined {
  CRUTCH.UnregisterForCombatEvent("MagBomb")

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Sanctum Ophidia")
}

registerZone(639, registerSanctumOphidia, unregisterSanctumOphidia)
