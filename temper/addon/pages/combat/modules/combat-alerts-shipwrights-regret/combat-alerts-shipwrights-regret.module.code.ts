import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-core/combat-alerts-alerts-core.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

let firstBombTarget: string | undefined
const BOMB_UNIQUE_NAME = "CrutchAlertsSRBomb"

const onSecondSoulBomb: CombatEventCallback = function (
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
  targetUnitId
) {
  const secondBombTarget = CRUTCH.groupIdToTag[targetUnitId]
  if (secondBombTarget === undefined) return
  CRUTCH.dbgOther(
    string.format(
      "Bomb 2 %d %s %s",
      targetUnitId,
      secondBombTarget,
      GetUnitDisplayName(secondBombTarget)
    )
  )
  if (firstBombTarget === undefined) {
    firstBombTarget = secondBombTarget
    zo_callLater(function (this: void) {
      firstBombTarget = undefined
    }, 2000)
    return
  }

  let first = GetUnitDisplayName(firstBombTarget)
  let second = GetUnitDisplayName(secondBombTarget)
  if (first > second) {
    const temp = first
    first = second
    second = temp
  }

  const nameToTag: Record<string, string> = {}

  let third: string | undefined
  let fourth: string | undefined
  for (let i = 1; i <= GetGroupSize(); i++) {
    const tag = GetGroupUnitTagByIndex(i)
    if (tag !== undefined) {
      const name = GetUnitDisplayName(tag)
      nameToTag[name] = tag
      if (name !== first && name !== second) {
        if (third === undefined) {
          third = name
        } else {
          fourth = name
        }
      }
    }
  }
  if (third === undefined || fourth === undefined) return

  if (third > fourth) {
    const temp = third
    third = fourth
    fourth = temp
  }

  if (CRUTCH.savedOptions.general.showRaidDiag) {
    CRUTCH.msg(
      string.format("Suggested stacks: |c00FF00%s -> %s ; %s -> %s", third, first, fourth, second)
    )
  }
  const stacks: Record<string, string> = {
    [first]: third,
    [second]: fourth,
    [third]: first,
    [fourth]: second,
  }
  const toStack = stacks[GetUnitDisplayName("player")]
  if (toStack === undefined) return

  const unitTag = nameToTag[toStack]
  if (unitTag === undefined) return

  CRUTCH.SetAttachedIconForUnit(
    unitTag,
    BOMB_UNIQUE_NAME,
    CRUTCH.Constants.PRIORITY.MECHANIC_1_PRIORITY,
    "TemperCombat/assets/poop.dds"
  )
  zo_callLater(function (this: void) {
    CRUTCH.RemoveAttachedIconForUnit(unitTag, BOMB_UNIQUE_NAME)
  }, 5000)

  CRUTCH.DisplayNotification(
    168314,
    string.format("|cAAAAAASuggested stack: |cff00ff%s|r", toStack),
    5000,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    false
  )
}

function registerShipwrightsRegret(this: void): undefined {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Shipwright's Regret")

  if (CRUTCH.savedOptions.shipwrightsRegret.showBombStacks) {
    CRUTCH.RegisterForCombatEvent(
      "SoulBomb2",
      onSecondSoulBomb,
      ACTION_RESULT_EFFECT_GAINED,
      168314
    )
  }
}

function unregisterShipwrightsRegret(this: void): undefined {
  CRUTCH.UnregisterForCombatEvent("SoulBomb2")

  CRUTCH.RemoveAllAttachedIcons(BOMB_UNIQUE_NAME)

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Shipwright's Regret")
}

registerZone(1302, registerShipwrightsRegret, unregisterShipwrightsRegret)
