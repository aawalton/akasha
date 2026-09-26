import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-core/combat-alerts-alerts-core.module.code.ts"
import {
  disableTempestIconsIfEnabled,
  enableTempestIconsIfDisabled,
  resetLucentIcons,
  tryEnablingCavotIcon,
  tryEnablingMirrorIcons,
  tryEnablingTempestIcons,
} from "akasha/temper/addon/pages/combat/combat-alerts-trials-c/modules/combat-alerts-lucent-icons/combat-alerts-lucent-icons.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

const C = CRUTCH.Constants

const CONVEYANCE_UNIQUE_NAME = "CrutchAlertsLCArcaneConveyance"

let conveyanceDisplaying1: string | undefined
let conveyanceDisplaying2: string | undefined

function addArcaneConveyanceToPlayer(this: void, unitTag: string): undefined {
  if (conveyanceDisplaying1 === unitTag || conveyanceDisplaying2 === unitTag) {
    return
  }

  const iconPath = "esoui/art/trials/vitalitydepletion.dds"

  CRUTCH.dbgSpam(
    string.format("Setting |t100%%:100%%:%s|t for %s", iconPath, GetUnitDisplayName(unitTag))
  )
  CRUTCH.SetAttachedIconForUnit(
    unitTag,
    CONVEYANCE_UNIQUE_NAME,
    C.PRIORITY.MECHANIC_1_PRIORITY,
    iconPath,
    150,
    [1, 0, 1, 1]
  )

  if (conveyanceDisplaying1 === undefined) {
    conveyanceDisplaying1 = unitTag
  } else {
    conveyanceDisplaying2 = unitTag
    CRUTCH.SetLineColor(1, 0, 1, 1, 1, CRUTCH.savedOptions.debugLineDistance)
    CRUTCH.DrawLineBetweenPlayers(conveyanceDisplaying1, unitTag)
  }
}

function removeArcaneConveyance(this: void): undefined {
  CRUTCH.RemoveLine()
  CRUTCH.RemoveAttachedIconForUnit(conveyanceDisplaying1 as string, CONVEYANCE_UNIQUE_NAME)
  CRUTCH.RemoveAttachedIconForUnit(conveyanceDisplaying2 as string, CONVEYANCE_UNIQUE_NAME)
  conveyanceDisplaying1 = undefined
  conveyanceDisplaying2 = undefined
}

let tethered: Record<string, boolean> = {}

function onArcaneConveyanceInitial(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string
): undefined {
  if (changeType === EFFECT_RESULT_GAINED) {
    addArcaneConveyanceToPlayer(unitTag)
  } else if (changeType === EFFECT_RESULT_FADED) {
    if (tethered[unitTag] === true) {
      return
    }

    removeArcaneConveyance()
  }
}

function onArcaneConveyanceTether(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string
): undefined {
  if (changeType === EFFECT_RESULT_GAINED) {
    tethered[unitTag] = true
    addArcaneConveyanceToPlayer(unitTag)
  } else if (changeType === EFFECT_RESULT_FADED) {
    delete tethered[unitTag]
    removeArcaneConveyance()
  }
}

function onWeakeningCharge(
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
  const fakeSourceUnitId = 8880090 + tagId

  if (changeType === EFFECT_RESULT_GAINED) {
    if (CRUTCH.savedOptions.general.showRaidDiag) {
      CRUTCH.msg(zo_strformat("<<1>> got weakening charge", atName))
    }

    if (
      CRUTCH.savedOptions.lucentcitadel.showWeakeningCharge === "ALWAYS" ||
      GetSelectedLFGRole() === LFG_ROLE_TANK
    ) {
      const label = zo_strformat("|ca361ff<<C:1>>: <<2>>|r", GetAbilityName(222613), atName)
      CRUTCH.DisplayNotification(
        222613,
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
  } else if (changeType === EFFECT_RESULT_FADED) {
    if (CRUTCH.savedOptions.general.showRaidDiag) {
      CRUTCH.msg(zo_strformat("<<1>> is no longer weakened", atName))
    }

    CRUTCH.Interrupted(fakeSourceUnitId)
  }
}

function registerLucentCitadel(this: void): undefined {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Lucent Citadel")

  CRUTCH.RegisterExitedGroupCombatListener(
    "CrutchLucentCitadelExitedCombat",
    removeArcaneConveyance
  )

  const showCavot = CRUTCH.savedOptions.lucentcitadel.showCavotIcon
  const showOrphic = CRUTCH.savedOptions.lucentcitadel.showOrphicIcons
  const showTempest = CRUTCH.savedOptions.lucentcitadel.showTempestIcons

  if (showCavot) {
    tryEnablingCavotIcon()
  }

  if (showOrphic) {
    tryEnablingMirrorIcons()
  }

  if (showTempest) {
    tryEnablingTempestIcons()

    EVENT_MANAGER.RegisterForEvent(`${CRUTCH.name}LCTrialStarted`, EVENT_RAID_TRIAL_STARTED, () => {
      enableTempestIconsIfDisabled()
    })
    EVENT_MANAGER.RegisterForEvent(
      `${CRUTCH.name}LCScoreUpdate`,
      EVENT_RAID_TRIAL_SCORE_UPDATE,
      (_eventCode: number, scoreUpdateReason: number) => {
        if (scoreUpdateReason === RAID_POINT_REASON_KILL_BANNERMEN) {
          disableTempestIconsIfEnabled()
          EVENT_MANAGER.UnregisterForEvent(
            `${CRUTCH.name}LCScoreUpdate`,
            EVENT_RAID_TRIAL_SCORE_UPDATE
          )
        }
      }
    )
  }

  if (showCavot || showOrphic || showTempest) {
    CRUTCH.RegisterBossChangedListener("CrutchLucentCitadel", () => {
      if (showCavot) {
        tryEnablingCavotIcon()
      }
      if (showOrphic) {
        tryEnablingMirrorIcons()
      }
      if (showTempest) {
        tryEnablingTempestIcons()
      }
    })
  }

  if (CRUTCH.savedOptions.lucentcitadel.showArcaneConveyance) {
    CRUTCH.RegisterForEffectChanged(
      "ArcaneConveyanceInitial1",
      onArcaneConveyanceInitial,
      223028,
      "group"
    )
    CRUTCH.RegisterForEffectChanged(
      "ArcaneConveyanceInitial2",
      onArcaneConveyanceInitial,
      223029,
      "group"
    )
    CRUTCH.RegisterForEffectChanged(
      "ArcaneConveyanceTether",
      onArcaneConveyanceTether,
      223060,
      "group"
    )
  }

  if (CRUTCH.savedOptions.lucentcitadel.showWeakeningCharge !== "NEVER") {
    CRUTCH.RegisterForEffectChanged("WeakeningCharge", onWeakeningCharge, 222613, "group")
  }
}

function unregisterLucentCitadel(this: void): undefined {
  CRUTCH.UnregisterBossChangedListener("CrutchLucentCitadel")
  CRUTCH.UnregisterExitedGroupCombatListener("CrutchLucentCitadelExitedCombat")

  CRUTCH.UnregisterForEffectChanged("ArcaneConveyanceInitial1")
  CRUTCH.UnregisterForEffectChanged("ArcaneConveyanceInitial2")
  CRUTCH.UnregisterForEffectChanged("ArcaneConveyanceTether")
  CRUTCH.UnregisterForEffectChanged("WeakeningCharge")
  EVENT_MANAGER.UnregisterForEvent(`${CRUTCH.name}LCTrialStarted`, EVENT_RAID_TRIAL_STARTED)
  EVENT_MANAGER.UnregisterForEvent(`${CRUTCH.name}LCScoreUpdate`, EVENT_RAID_TRIAL_SCORE_UPDATE)

  resetLucentIcons()

  tethered = {}

  removeArcaneConveyance()

  CRUTCH.RemoveAllAttachedIcons(CONVEYANCE_UNIQUE_NAME)

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Lucent Citadel")
}

registerZone(1478, registerLucentCitadel, unregisterLucentCitadel)
