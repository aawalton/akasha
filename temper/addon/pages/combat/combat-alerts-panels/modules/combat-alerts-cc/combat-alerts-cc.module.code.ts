import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-panels/modules/combat-alerts-cc-ui/combat-alerts-cc-ui.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const C = CRUTCH.Constants

const MECHANIC_FLAGS: Record<number, string> = {
  [COMBAT_MECHANIC_FLAGS_DAEDRIC]: "DAEDRIC",
  [COMBAT_MECHANIC_FLAGS_HEALTH]: "HEALTH",
  [COMBAT_MECHANIC_FLAGS_MAGICKA]: "MAGICKA",
  [COMBAT_MECHANIC_FLAGS_MOUNT_STAMINA]: "MOUNT_STAMINA",
  [COMBAT_MECHANIC_FLAGS_STAMINA]: "STAMINA",
  [COMBAT_MECHANIC_FLAGS_ULTIMATE]: "ULTIMATE",
  [COMBAT_MECHANIC_FLAGS_WEREWOLF]: "WEREWOLF",
}

const HARD = "hard"
const IMMOB = "immobilize"
const SOFT = "soft"

interface CCOption {
  display: string
  type: string
}

const CC_OPTIONS: Record<number, CCOption> = {
  [ACTION_RESULT_DISORIENTED]: { display: "DISORIENTED", type: HARD },
  [ACTION_RESULT_LEVITATED]: { display: "LEVITATED", type: HARD },

  [ACTION_RESULT_CHARMED]: { display: "CHARMED", type: HARD },
  [ACTION_RESULT_FEARED]: { display: "FEARED", type: HARD },
  [ACTION_RESULT_STUNNED]: { display: "STUNNED", type: HARD },

  [ACTION_RESULT_SILENCED]: { display: "SILENCED", type: SOFT },
  [ACTION_RESULT_KNOCKBACK]: { display: "KNOCKBACK", type: SOFT },
  [ACTION_RESULT_ROOTED]: { display: "ROOTED", type: IMMOB },
  [ACTION_RESULT_SNARED]: { display: "SNARED", type: SOFT },
  [ACTION_RESULT_STAGGERED]: { display: "STAGGERED", type: SOFT },
}

interface CCTypeOption {
  color: string
  showVisual: boolean
  sound?: string
}

const TYPE_OPTIONS: Record<string, CCTypeOption> = {
  [HARD]: { color: "FF0000", showVisual: true, sound: SOUNDS.DEATH_RECAP_KILLING_BLOW_SHOWN },
  [IMMOB]: { color: "FF5500", showVisual: false },
  [SOFT]: { color: "FFAA00", showVisual: false },
}

const SUPPRESS = 1
const SILENT = 2
const EFFECT_ONLY = 3
const IGNORE = 4
const CC_ABILITY_DATA: Record<number, number> = {
  [166794]: IGNORE,
  [95456]: EFFECT_ONLY,
  [218509]: IGNORE,

  [194570]: SUPPRESS,
  [194571]: SUPPRESS,
  [202803]: SUPPRESS,
  [203101]: SUPPRESS,
  [203125]: SUPPRESS,
  [211431]: SUPPRESS,
  [211433]: SUPPRESS,

  [75747]: SUPPRESS,
  [261608]: SUPPRESS,
  [261624]: SUPPRESS,
}

function isInPvP(this: void): boolean {
  return IsUnitPvPFlagged("player")
}

interface RecentCC {
  result: number
  time: number
}

const RECENT_CCS: Record<number, RecentCC> = {}

function doCC(
  this: void,
  abilityId: number,
  ccResult: number,
  hitValue: number,
  sourceName: string
): undefined {
  CRUTCH.OnHardCCed(abilityId, ccResult, hitValue, sourceName)

  const typeOptions = TYPE_OPTIONS[HARD] as CCTypeOption
  const abilityData = CC_ABILITY_DATA[abilityId]
  const sound = typeOptions.sound
  if (sound !== undefined && abilityData !== SILENT && CRUTCH.savedOptions.cc.playSound) {
    for (let i = 1; i <= CRUTCH.savedOptions.cc.hardVolume; i++) {
      PlaySound(sound)
    }
  }
}

const onCombatEvent: CombatEventCallback = function (
  this: void,
  _eventCode,
  result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  sourceName,
  sourceType,
  _targetName,
  _targetType,
  hitValue,
  powerType,
  _damageType,
  _log,
  _sourceUnitId,
  _targetUnitId,
  abilityId
) {
  const options = CC_OPTIONS[result]
  if (options === undefined) return

  const abilityData = CC_ABILITY_DATA[abilityId]
  if (abilityData === IGNORE) return

  const typeOptions = TYPE_OPTIONS[options.type] as CCTypeOption

  if (options.display !== undefined) {
    const typeColor = typeOptions.color
    let textColor = ""
    if (sourceType === COMBAT_UNIT_TYPE_PLAYER) {
      return
    } else if (sourceType === COMBAT_UNIT_TYPE_GROUP) {
      textColor = "|cFF00FF"
    }
    CRUTCH.dbgSpam(
      string.format(
        "cc |c%s%s|r %s%s (%d) %d from %s (%s) - %s",
        typeColor,
        options.display,
        textColor,
        GetAbilityName(abilityId),
        abilityId,
        hitValue,
        sourceName,
        C.UNIT_TYPES[sourceType] ?? "???",
        MECHANIC_FLAGS[powerType] ?? "???"
      )
    )
  }

  if (CRUTCH.savedOptions.cc.combatOnly && !IsUnitInCombat("player")) return

  if (abilityData === SUPPRESS) return

  if (sourceType !== COMBAT_UNIT_TYPE_NONE) {
    if (isInPvP() && sourceType === COMBAT_UNIT_TYPE_OTHER) {
      CRUTCH.dbgSpam("|cFFAA00cced in pvp by other")
    } else {
      CRUTCH.dbgSpam("unit type: " + sourceType)
      return
    }
  }

  if (options.type === HARD) {
    RECENT_CCS[abilityId] = {
      result: result,
      time: GetGameTimeMilliseconds(),
    }
  }
}

const onEffectGainedDuration: CombatEventCallback = function (
  this: void,
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  sourceName,
  _sourceType,
  _targetName,
  _targetType,
  hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  _targetUnitId,
  abilityId
) {
  const cc = RECENT_CCS[abilityId]
  let ccResult: number
  if (CC_ABILITY_DATA[abilityId] === EFFECT_ONLY) {
    ccResult = ACTION_RESULT_STUNNED
  } else if (cc === undefined) {
    return
  } else {
    if (GetGameTimeMilliseconds() - cc.time > 100) {
      delete RECENT_CCS[abilityId]
      CRUTCH.dbgOther(
        string.format(
          "|cFF0000CC effect duration %s (%d) received %dms after initial?!",
          GetAbilityName(abilityId),
          abilityId,
          GetGameTimeMilliseconds() - cc.time
        )
      )
      return
    }
    ccResult = cc.result
  }

  doCC(abilityId, ccResult, hitValue, sourceName)
}

function onStunnedChanged(this: void, _eventCode: number, playerStunned: boolean): undefined {
  if (playerStunned) {
    CRUTCH.OnStunned()
  } else {
    CRUTCH.OnNotStunned()
  }
}

CRUTCH.InitializeCC = function (this: void) {
  EVENT_MANAGER.RegisterForEvent(CRUTCH.name + "CC", EVENT_COMBAT_EVENT, onCombatEvent)
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "CC",
    EVENT_COMBAT_EVENT,
    REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE,
    COMBAT_UNIT_TYPE_PLAYER
  )

  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "CCDuration",
    EVENT_COMBAT_EVENT,
    onEffectGainedDuration
  )
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "CCDuration",
    EVENT_COMBAT_EVENT,
    REGISTER_FILTER_COMBAT_RESULT,
    ACTION_RESULT_EFFECT_GAINED_DURATION
  )
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "CCDuration",
    EVENT_COMBAT_EVENT,
    REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE,
    COMBAT_UNIT_TYPE_PLAYER
  )

  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "CCStunnedChanged",
    EVENT_PLAYER_STUNNED_STATE_CHANGED,
    onStunnedChanged
  )

  CRUTCH.InitializeCCUI()
}
