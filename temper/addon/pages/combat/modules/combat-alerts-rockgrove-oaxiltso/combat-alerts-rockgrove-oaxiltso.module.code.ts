import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-trials-b-reach/combat-alerts-trials-b-reach.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchRockgrove {
    RegisterOax: (this: void) => void
    UnregisterOax: (this: void) => void
  }
}

const C = CRUTCH.Constants

const EXIT_LEFT_POOL = { x: 91973, y: 35751, z: 81764 }

const SLUDGE_UNIQUE_NAME = "CrutchAlertsRGSludge"

function onSludgeIcon(this: void, changeType: number, unitTag: string): undefined {
  if (changeType === EFFECT_RESULT_GAINED) {
    CRUTCH.SetAttachedIconForUnit(
      unitTag,
      SLUDGE_UNIQUE_NAME,
      C.PRIORITY.MECHANIC_1_PRIORITY,
      "TemperCombat/assets/poop.dds",
      undefined,
      [0.6, 1, 0.6]
    )
  } else if (changeType === EFFECT_RESULT_FADED) {
    CRUTCH.RemoveAttachedIconForUnit(unitTag, SLUDGE_UNIQUE_NAME)
  }
}

let sludgeTag1: string | undefined
let lastSludge = 0

function onNoxiousSludgeGained(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string
): undefined {
  if (CRUTCH.savedOptions.rockgrove.showSludgeIcons) {
    onSludgeIcon(changeType, unitTag)
  }

  if (changeType !== EFFECT_RESULT_GAINED) return
  CRUTCH.dbgSpam(
    string.format("|c00FF00Noxious Sludge: %s (%s)|r", GetUnitDisplayName(unitTag), unitTag)
  )

  if (!CRUTCH.savedOptions.rockgrove.sludgeSides) return

  const currSeconds = GetGameTimeSeconds()
  if (currSeconds - lastSludge > 10) {
    sludgeTag1 = undefined
    lastSludge = currSeconds
  }

  if (sludgeTag1 === undefined) {
    sludgeTag1 = unitTag
    return
  } else if (sludgeTag1 === unitTag) {
    return
  }

  let leftPlayer = sludgeTag1
  let rightPlayer = unitTag
  const [, p1x, p1y, p1z] = GetUnitWorldPosition(sludgeTag1)
  const [, p2x, p2y, p2z] = GetUnitWorldPosition(unitTag)

  const p1Dist = CRUTCH.GetSquaredDistance(
    p1x,
    p1y,
    p1z,
    EXIT_LEFT_POOL.x,
    EXIT_LEFT_POOL.y,
    EXIT_LEFT_POOL.z
  )
  const p2Dist = CRUTCH.GetSquaredDistance(
    p2x,
    p2y,
    p2z,
    EXIT_LEFT_POOL.x,
    EXIT_LEFT_POOL.y,
    EXIT_LEFT_POOL.z
  )
  if (p1Dist < p2Dist) {
    leftPlayer = sludgeTag1
    rightPlayer = unitTag
  } else {
    leftPlayer = unitTag
    rightPlayer = sludgeTag1
  }
  CRUTCH.dbgOther(GetUnitDisplayName(leftPlayer) + "< >" + GetUnitDisplayName(rightPlayer))
  const label = string.format(
    "|c00FF00%s |c00d60b|t100%%:100%%:Esoui/Art/Buttons/large_leftarrow_up.dds:inheritcolor|t |c00FF00Noxious Sludge|r |c00d60b|t100%%:100%%:Esoui/Art/Buttons/large_rightarrow_up.dds:inheritcolor|t |c00FF00%s|r",
    GetUnitDisplayName(leftPlayer),
    GetUnitDisplayName(rightPlayer)
  )
  CRUTCH.DisplayNotification(157860, label, 5000, 0, 0, 0, 0, 0, 0, 0, true)
}

const PANEL_SLUDGE_INDEX = 3
const PANEL_BLITZ_INDEX = 5

function isOax(this: void): boolean {
  const [, powerMax] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  if (powerMax === 125745480 || powerMax === 62872740 || powerMax === 19086236) {
    return true
  }
  return false
}

function onBlitz(this: void): undefined {
  CRUTCH.InfoPanel.CountDownDuration(
    PANEL_BLITZ_INDEX,
    "|cfff1ab" + GetAbilityName(149414) + ": ",
    36000
  )
}

function onSludge(this: void): undefined {
  CRUTCH.InfoPanel.CountDownDuration(
    PANEL_SLUDGE_INDEX,
    "|c64c200" + GetAbilityName(149190) + ": ",
    27000
  )
}

function onEnteredCombat(this: void): undefined {
  if (isOax()) {
    if (CRUTCH.savedOptions.rockgrove.panel.showSludge) {
      CRUTCH.InfoPanel.CountDownDuration(
        PANEL_SLUDGE_INDEX,
        "|c64c200" + GetAbilityName(149190) + ": ",
        20000
      )
    }
    if (CRUTCH.savedOptions.rockgrove.panel.showBlitz) {
      CRUTCH.InfoPanel.CountDownDuration(
        PANEL_BLITZ_INDEX,
        "|cfff1ab" + GetAbilityName(149414) + ": ",
        15000
      )
    }
  }
}

function cleanUp(this: void): undefined {
  CRUTCH.InfoPanel.StopCount(PANEL_BLITZ_INDEX)
  CRUTCH.InfoPanel.StopCount(PANEL_SLUDGE_INDEX)
}

CRUTCH.Rockgrove.RegisterOax = function (this: void) {
  CRUTCH.RegisterForEffectChanged("NoxiousSludge", onNoxiousSludgeGained, 157860, "group")

  if (CRUTCH.savedOptions.rockgrove.panel.showBlitz) {
    CRUTCH.RegisterForCombatEvent("Blitz", onBlitz, ACTION_RESULT_BEGIN, 149414)
  }

  if (CRUTCH.savedOptions.rockgrove.panel.showSludge) {
    CRUTCH.RegisterForCombatEvent("NoxiousSludgeBegin", onSludge, ACTION_RESULT_BEGIN, 149190)
  }

  CRUTCH.RegisterEnteredGroupCombatListener("CrutchRockgroveOaxEnteredCombat", onEnteredCombat)

  CRUTCH.RegisterExitedGroupCombatListener("CrutchRockgroveOaxExitedCombat", cleanUp)
}

CRUTCH.Rockgrove.UnregisterOax = function (this: void) {
  CRUTCH.RemoveAllAttachedIcons(SLUDGE_UNIQUE_NAME)

  CRUTCH.UnregisterForCombatEvent("NoxiousSludge")
  CRUTCH.UnregisterForCombatEvent("Blitz")
  CRUTCH.UnregisterForCombatEvent("NoxiousSludgeBegin")
  CRUTCH.UnregisterExitedGroupCombatListener("CrutchRockgroveOaxEnteredCombat")
  CRUTCH.UnregisterExitedGroupCombatListener("CrutchRockgroveOaxExitedCombat")

  cleanUp()
}
