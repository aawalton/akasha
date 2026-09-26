import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-core/combat-alerts-alerts-core.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-ossein-carrion/combat-alerts-ossein-carrion.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-ossein-twins/combat-alerts-ossein-twins.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    AddChainToPlayer: (this: void, unitTag: string) => void
    RegisterOsseinCage: (this: void) => void
    UnregisterOsseinCage: (this: void) => void
  }
}

const C = CRUTCH.Constants

function onStricken(
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
  const fakeSourceUnitId = 8880100 + tagId

  if (changeType === EFFECT_RESULT_GAINED) {
    if (CRUTCH.savedOptions.general.showRaidDiag) {
      CRUTCH.msg(zo_strformat("<<1>> got Stricken", atName))
    }

    if (
      CRUTCH.savedOptions.osseincage.showStricken === "ALWAYS" ||
      GetSelectedLFGRole() === LFG_ROLE_TANK
    ) {
      const label = zo_strformat("|ca361ff<<C:1>>: <<2>>|r", GetAbilityName(235594), atName)
      CRUTCH.DisplayNotification(
        235594,
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
      CRUTCH.msg(zo_strformat("<<1>> is no longer Stricken", atName))
    }

    CRUTCH.Interrupted(fakeSourceUnitId)
  }
}

const CHAIN_UNIQUE_NAME = "CrutchAlertsOCChain"
let chainsDisplaying1: string | undefined
let chainsDisplaying2: string | undefined

const UNSAFE = 20
const SUS = 25
const SAFE = 30
let prevInThreshold = UNSAFE

function changeLineColor(this: void, distance: number): undefined {
  if (distance <= UNSAFE) {
    if (prevInThreshold === UNSAFE) {
      return
    }
    prevInThreshold = UNSAFE
    CRUTCH.SetLineColor(1, 0, 0, 0.5, 0.5, CRUTCH.savedOptions.debugLineDistance)
  } else if (distance <= SUS) {
    if (prevInThreshold === SUS) {
      return
    }
    prevInThreshold = SUS
    CRUTCH.SetLineColor(1, 1, 0, 0.4, 0.4, CRUTCH.savedOptions.debugLineDistance)
  } else {
    if (prevInThreshold === SAFE) {
      return
    }
    prevInThreshold = SAFE
    CRUTCH.SetLineColor(0, 1, 0, 0.3, 0.3, CRUTCH.savedOptions.debugLineDistance)
  }
}

function addChainToPlayer(this: void, unitTag: string): undefined {
  if (chainsDisplaying1 === unitTag || chainsDisplaying2 === unitTag) {
    return
  }

  const iconPath = "esoui/art/trials/vitalitydepletion.dds"

  CRUTCH.dbgSpam(
    string.format("Setting |t100%%:100%%:%s|t for %s", iconPath, GetUnitDisplayName(unitTag))
  )
  CRUTCH.SetAttachedIconForUnit(
    unitTag,
    CHAIN_UNIQUE_NAME,
    C.PRIORITY.MECHANIC_1_PRIORITY,
    iconPath,
    100,
    [1, 0, 1, 1]
  )

  if (chainsDisplaying1 === undefined) {
    chainsDisplaying1 = unitTag
  } else {
    chainsDisplaying2 = unitTag
    prevInThreshold = UNSAFE
    CRUTCH.SetLineColor(1, 0, 0, 0.4, 0.4, CRUTCH.savedOptions.debugLineDistance)
    CRUTCH.DrawLineBetweenPlayers(chainsDisplaying1, unitTag, changeLineColor)
  }
}
CRUTCH.AddChainToPlayer = addChainToPlayer

function removeChain(this: void): undefined {
  CRUTCH.RemoveLine()
  if (chainsDisplaying1 !== undefined) {
    CRUTCH.RemoveAttachedIconForUnit(chainsDisplaying1, CHAIN_UNIQUE_NAME)
  }
  if (chainsDisplaying2 !== undefined) {
    CRUTCH.RemoveAttachedIconForUnit(chainsDisplaying2, CHAIN_UNIQUE_NAME)
  }
  chainsDisplaying1 = undefined
  chainsDisplaying2 = undefined
}

const TETHERED: Record<string, boolean> = {}

function onChainsInitial(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string
): undefined {
  if (changeType === EFFECT_RESULT_GAINED) {
    addChainToPlayer(unitTag)
  } else if (changeType === EFFECT_RESULT_FADED) {
    if (TETHERED[unitTag] !== undefined) {
      return
    }

    removeChain()
  }
}

function onChainsTether(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string
): undefined {
  if (changeType === EFFECT_RESULT_GAINED) {
    TETHERED[unitTag] = true
    addChainToPlayer(unitTag)
  } else if (changeType === EFFECT_RESULT_FADED) {
    delete TETHERED[unitTag]
    removeChain()
  }
}

CRUTCH.RegisterOsseinCage = function (this: void) {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Ossein Cage")

  CRUTCH.OsseinCage.RegisterCarrion()
  CRUTCH.OsseinCage.RegisterOCZoneTwins()

  if (CRUTCH.savedOptions.osseincage.showStricken !== "NEVER") {
    CRUTCH.RegisterForEffectChanged("Stricken", onStricken, 235594, "group")
  }

  if (CRUTCH.savedOptions.osseincage.showChains) {
    CRUTCH.RegisterForEffectChanged("ChainsInitial1", onChainsInitial, 232773, "group")
    CRUTCH.RegisterForEffectChanged("ChainsInitial2", onChainsInitial, 232775, "group")
    CRUTCH.RegisterForEffectChanged("ChainsTether1", onChainsTether, 232779, "group")
    CRUTCH.RegisterForEffectChanged("ChainsTether2", onChainsTether, 232780, "group")
  }
}

CRUTCH.UnregisterOsseinCage = function (this: void) {
  CRUTCH.OsseinCage.UnregisterCarrion()
  CRUTCH.OsseinCage.UnregisterOCZoneTwins()

  CRUTCH.UnregisterForEffectChanged("Stricken")
  CRUTCH.UnregisterForEffectChanged("ChainsInitial1")
  CRUTCH.UnregisterForEffectChanged("ChainsInitial2")
  CRUTCH.UnregisterForEffectChanged("ChainsTether1")
  CRUTCH.UnregisterForEffectChanged("ChainsTether2")

  CRUTCH.RemoveAllAttachedIcons(CHAIN_UNIQUE_NAME)

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Ossein Cage")
}

registerZone(1548, CRUTCH.RegisterOsseinCage, CRUTCH.UnregisterOsseinCage)
