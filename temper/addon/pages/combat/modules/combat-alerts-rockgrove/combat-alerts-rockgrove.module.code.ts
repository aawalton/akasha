import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-trials-b-reach/combat-alerts-trials-b-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-rockgrove-oaxiltso/combat-alerts-rockgrove-oaxiltso.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-rockgrove-bahsei-portal/combat-alerts-rockgrove-bahsei-portal.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import {
  clearCurseExplosions,
  onDeathTouch,
  onDeathTouchLines,
  removePlayerCurseLines,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-rockgrove-curse/combat-alerts-rockgrove-curse.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    RegisterRockgrove: (this: void) => void
    UnregisterRockgrove: (this: void) => void
  }
}

const RG = CRUTCH.Rockgrove

function onKissOfDeath(
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
  _hitValue: number,
  _powerType: number,
  _damageType: number,
  _log: boolean,
  _sourceUnitId: number,
  targetUnitId: number
): undefined {
  const unitTag = CRUTCH.groupIdToTag[targetUnitId] as string
  CRUTCH.msg(zo_strformat("Kiss of Death |cFF00FF<<1>>", GetUnitDisplayName(unitTag)))
}

let numBleeds = 0
function onBleeding(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string,
  beginTime: number,
  endTime: number
): undefined {
  const atName = GetUnitDisplayName(unitTag)
  const tagId = CRUTCH.GetGroupTagNumber(unitTag)
  const fakeSourceUnitId = 8880080 + tagId + numBleeds

  if (changeType !== EFFECT_RESULT_GAINED) {
    return
  }

  numBleeds = numBleeds + 1

  if (
    CRUTCH.savedOptions.rockgrove.showBleeding === "ALWAYS" ||
    atName === GetUnitDisplayName("player") ||
    GetSelectedLFGRole() === LFG_ROLE_HEAL
  ) {
    const label = zo_strformat("|cfff1ab<<C:1>>|cAAAAAA on <<2>>|r", GetAbilityName(153179), atName)
    CRUTCH.DisplayNotification(
      153179,
      label,
      (endTime - beginTime) * 1000,
      fakeSourceUnitId,
      0,
      0,
      0,
      0,
      0,
      0,
      false
    )
  }
}

function onCursedGround(this: void): undefined {
  CRUTCH.InfoPanel.CountDownDuration(
    RG.PANEL_CURSED_GROUND_INDEX,
    string.format("|c8ef5f5%s: ", GetAbilityName(152475)),
    27200
  )
}

function onScythe(this: void): undefined {
  CRUTCH.InfoPanel.CountDownDuration(
    RG.PANEL_SCYTHE_INDEX,
    string.format("|c64c200%s: ", GetAbilityName(150067)),
    15000
  )
}

function onEnteredCombat(this: void): undefined {
  const [, maxHp] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  if (maxHp !== 123882576 && maxHp !== 65201356 && maxHp !== 21812840) {
    return
  }

  if (CRUTCH.savedOptions.rockgrove.panel.showCursedGround) {
    CRUTCH.InfoPanel.CountDownDuration(
      RG.PANEL_CURSED_GROUND_INDEX,
      string.format("|c8ef5f5%s: ", GetAbilityName(152475)),
      11400
    )
  }
  if (CRUTCH.savedOptions.rockgrove.panel.showScythe) {
    CRUTCH.InfoPanel.CountDownDuration(
      RG.PANEL_SCYTHE_INDEX,
      string.format("|c64c200%s: ", GetAbilityName(150067)),
      15000
    )
  }
}

function cleanUp(this: void): undefined {
  CRUTCH.InfoPanel.StopCount(RG.PANEL_CURSED_GROUND_INDEX)
  CRUTCH.InfoPanel.StopCount(RG.PANEL_SCYTHE_INDEX)
  numBleeds = 0
  clearCurseExplosions()
}

CRUTCH.RegisterRockgrove = function (this: void) {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Rockgrove")

  CRUTCH.RegisterEnteredGroupCombatListener("RockgroveEnteredCombat", onEnteredCombat)
  CRUTCH.RegisterExitedGroupCombatListener("RockgroveExitedCombat", cleanUp)

  RG.RegisterOax()
  RG.RegisterBahseiPortal()

  if (CRUTCH.savedOptions.general.showRaidDiag) {
    CRUTCH.RegisterForCombatEvent("KissOfDeath", onKissOfDeath, undefined, 152654)
  }

  if (CRUTCH.savedOptions.rockgrove.showBleeding !== "NEVER") {
    CRUTCH.RegisterForEffectChanged("Bleeding", onBleeding, 153179, "group")
  }

  if (CRUTCH.savedOptions.rockgrove.showCurseIcons) {
    CRUTCH.RegisterForEffectChanged("DeathTouch", onDeathTouch, 150078, "group")
  }

  CRUTCH.RegisterForEffectChanged("DeathTouchLines", onDeathTouchLines, 150078, "group")

  if (CRUTCH.savedOptions.rockgrove.panel.showCursedGround) {
    CRUTCH.RegisterForCombatEvent("CursedGround", onCursedGround, ACTION_RESULT_BEGIN, 152475)
  }

  if (CRUTCH.savedOptions.rockgrove.panel.showScythe) {
    CRUTCH.RegisterForCombatEvent("Scythe", onScythe, ACTION_RESULT_BEGIN, 150067)
  }
}

CRUTCH.UnregisterRockgrove = function (this: void) {
  removePlayerCurseLines()

  CRUTCH.UnregisterEnteredGroupCombatListener("RockgroveEnteredCombat")
  CRUTCH.UnregisterExitedGroupCombatListener("RockgroveExitedCombat")

  cleanUp()

  RG.UnregisterOax()
  RG.UnregisterBahseiPortal()

  CRUTCH.UnregisterForCombatEvent("KissOfDeath")
  CRUTCH.UnregisterForEffectChanged("Bleeding")
  CRUTCH.UnregisterForEffectChanged("DeathTouch")
  CRUTCH.UnregisterForEffectChanged("DeathTouchLines")
  CRUTCH.UnregisterForCombatEvent("CursedGround")
  CRUTCH.UnregisterForCombatEvent("Scythe")

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Rockgrove")
}

registerZone(1263, CRUTCH.RegisterRockgrove, CRUTCH.UnregisterRockgrove)
