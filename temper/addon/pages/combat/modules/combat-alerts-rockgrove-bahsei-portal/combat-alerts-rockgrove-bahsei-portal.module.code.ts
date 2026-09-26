import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-trials-c-declarations/combat-alerts-trials-c-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-trials-b-reach/combat-alerts-trials-b-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-rockgrove-curse/combat-alerts-rockgrove-curse.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchRockgrove {
    RegisterBahseiPortal: (this: void) => void
    UnregisterBahseiPortal: (this: void) => void
  }
}

const RG = CRUTCH.Rockgrove
const C = CRUTCH.Constants

let nextPortal = 1

const effectResults = C.EFFECT_RESULTS

const GROUP_BITTER_MARROW: Record<string, boolean> = {}

function updatePlayersInPortal(this: void): undefined {
  if (!CRUTCH.savedOptions.rockgrove.panel.showNumInPortal) return
  let count = 0
  let names = ""
  for (const [unitTag, hasMarrow] of pairs(GROUP_BITTER_MARROW)) {
    if (hasMarrow === true) {
      count = count + 1
      names = string.format("%s%s ", names, GetUnitDisplayName(unitTag))
    }
  }
  CRUTCH.InfoPanel.SetLine(
    RG.PANEL_PORTAL_COUNT_INDEX,
    "|c9999ff" + count + " in portal " + nextPortal
  )
  CRUTCH.InfoPanel.SetLine(RG.PANEL_PORTAL_PLAYERS_INDEX, "|c9999ff" + names, 0.4)
}

function onBitterMarrowChanged(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string,
  _beginTime: number,
  _endTime: number,
  stackCount: number
): undefined {
  CRUTCH.dbgOther(
    string.format(
      "|c8C00FF%s(%s): %d %s|r",
      GetUnitDisplayName(unitTag),
      unitTag,
      stackCount,
      effectResults[changeType]
    )
  )

  let changed = false
  if (changeType === EFFECT_RESULT_GAINED) {
    GROUP_BITTER_MARROW[unitTag] = true
    changed = true
  } else if (changeType === EFFECT_RESULT_FADED) {
    GROUP_BITTER_MARROW[unitTag] = false
    changed = true
  }

  if (changed) {
    if (AreUnitsEqual("player", unitTag)) {
      CRUTCH.Drawing.EvaluateAllSuppression()
      RG.linesHidden = GROUP_BITTER_MARROW[unitTag] as boolean
    } else {
      CRUTCH.Drawing.EvaluateSuppressionFor(unitTag)
    }

    updatePlayersInPortal()
  }
}

function isInBahseiPortal(this: void, unitTag?: string): boolean {
  const tag = unitTag ?? CRUTCH.playerGroupTag

  if (GROUP_BITTER_MARROW[tag] === true) return true

  return false
}

const PORTAL_SUPPRESSION_FILTER = "CrutchAlertsBahseiPortal"
function bahseiPortalFilter(this: void, unitTag: string): boolean {
  return isInBahseiPortal(unitTag) === isInBahseiPortal(CRUTCH.playerGroupTag)
}

function onPortalSummoned(
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
  _targetUnitId: number,
  abilityId: number
): undefined {
  CRUTCH.InfoPanel.StopCount(RG.PANEL_PORTAL_TIMER_INDEX)
  updatePlayersInPortal()

  if (CRUTCH.savedOptions.rockgrove.panel.showPortalDirection) {
    const display = CRUTCH.format[abilityId]
    if (display !== undefined && typeof display !== "number") {
      CRUTCH.InfoPanel.SetLine(RG.PANEL_PORTAL_DIRECTION_INDEX, "|c9999ff" + display.text)
    }
  }
}

const SPOOFED_ABILITIES: Record<number, boolean> = {}

function spoofIcon(this: void, abilityId: number): undefined {
  EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "BahseiIconChange" + abilityId)
  SPOOFED_ABILITIES[abilityId] = true
  CRUTCH.SetAbilityOverlay(abilityId)
  CRUTCH.dbgOther("Changing " + GetAbilityName(abilityId))
}

function unspoofAllIcons(this: void): undefined {
  for (const [abilityId] of pairs(SPOOFED_ABILITIES)) {
    EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "BahseiIconChange" + abilityId)
    CRUTCH.RemoveAbilityOverlay(abilityId)
  }
}

function maybeChangeIconLater(this: void, abilityId: number, msUntilPortal: number): undefined {
  if (CRUTCH.savedOptions.rockgrove.abilitiesToReplace[abilityId] !== true) return

  const delay =
    msUntilPortal +
    CRUTCH.savedOptions.rockgrove.portalTimeMargin -
    (GetAbilityDuration(abilityId) as number)
  CRUTCH.dbgOther("Will change " + GetAbilityName(abilityId) + " icon in " + delay + "ms")
  EVENT_MANAGER.RegisterForUpdate(
    CRUTCH.name + "BahseiIconChange" + abilityId,
    delay,
    function (this: void) {
      spoofIcon(abilityId)
    }
  )
}

function isMyPortal(this: void, portal: number): boolean {
  const myPortal = CRUTCH.savedOptions.rockgrove.portalNumber
  if (myPortal === 0) return false

  return myPortal === portal
}

function onPortalEnded(this: void): undefined {
  nextPortal = nextPortal === 1 ? 2 : 1

  CRUTCH.InfoPanel.RemoveLine(RG.PANEL_PORTAL_COUNT_INDEX)
  CRUTCH.InfoPanel.RemoveLine(RG.PANEL_PORTAL_PLAYERS_INDEX)
  CRUTCH.InfoPanel.RemoveLine(RG.PANEL_PORTAL_DIRECTION_INDEX)

  if (CRUTCH.savedOptions.rockgrove.panel.showTimeToPortal) {
    CRUTCH.InfoPanel.CountDownDuration(
      RG.PANEL_PORTAL_TIMER_INDEX,
      "|c9999ffPortal " + nextPortal + ": ",
      50000
    )
  }

  unspoofAllIcons()

  if (!isMyPortal(nextPortal)) return

  for (let i = 3; i <= 8; i++) {
    maybeChangeIconLater(GetSlotBoundId(i, HOTBAR_CATEGORY_PRIMARY), 50000)
    maybeChangeIconLater(GetSlotBoundId(i, HOTBAR_CATEGORY_BACKUP), 50000)
  }
}

function onEnteredCombat(this: void): undefined {
  const [, maxHp] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  if (maxHp !== 123882576) {
    return
  }

  if (CRUTCH.savedOptions.rockgrove.panel.showTimeToPortal) {
    CRUTCH.InfoPanel.CountDownDuration(RG.PANEL_PORTAL_TIMER_INDEX, "|c9999ffPortal 1: ", 20000)
  }

  if (!isMyPortal(1)) return

  for (let i = 3; i <= 8; i++) {
    maybeChangeIconLater(GetSlotBoundId(i, HOTBAR_CATEGORY_PRIMARY), 20000)
    maybeChangeIconLater(GetSlotBoundId(i, HOTBAR_CATEGORY_BACKUP), 20000)
  }
}

function cleanUp(this: void): undefined {
  nextPortal = 1
  unspoofAllIcons()
  ZO_ClearTable(GROUP_BITTER_MARROW)
  RG.linesHidden = false
  CRUTCH.InfoPanel.StopCount(RG.PANEL_PORTAL_TIMER_INDEX)
  CRUTCH.InfoPanel.RemoveLine(RG.PANEL_PORTAL_COUNT_INDEX)
  CRUTCH.InfoPanel.RemoveLine(RG.PANEL_PORTAL_PLAYERS_INDEX)
  CRUTCH.InfoPanel.RemoveLine(RG.PANEL_PORTAL_DIRECTION_INDEX)
}

type OsiUnitErrorCheck = (this: void, unitTag: string, allowSelf?: boolean) => number

let origOSIUnitErrorCheck: OsiUnitErrorCheck | undefined

RG.RegisterBahseiPortal = function (this: void) {
  CRUTCH.RegisterEnteredGroupCombatListener("RockgroveBahseiPortalEnteredCombat", onEnteredCombat)

  CRUTCH.RegisterExitedGroupCombatListener("RockgroveBahseiPortalExitedCombat", cleanUp)

  CRUTCH.RegisterForEffectChanged("BitterMarrowEffect", onBitterMarrowChanged, 153423, "group")

  CRUTCH.RegisterForCombatEvent("Clockwise", onPortalSummoned, ACTION_RESULT_EFFECT_GAINED, 153517)
  CRUTCH.RegisterForCombatEvent(
    "CounterClockwise",
    onPortalSummoned,
    ACTION_RESULT_EFFECT_GAINED,
    153518
  )
  CRUTCH.RegisterForCombatEvent("PortalExplode", onPortalEnded, ACTION_RESULT_EFFECT_GAINED, 153662)

  if (OSI !== undefined && OSI.UnitErrorCheck !== undefined) {
    CRUTCH.dbgOther("|c88FFFF[CT]|r Overriding OSI.UnitErrorCheck")
    origOSIUnitErrorCheck = OSI.UnitErrorCheck
    OSI.UnitErrorCheck = function (this: void, unitTag: string, allowSelf?: boolean): number {
      const check = origOSIUnitErrorCheck as OsiUnitErrorCheck
      const errorCode = check(unitTag, allowSelf)
      if (errorCode !== 0) {
        return errorCode
      }
      if (isInBahseiPortal(CRUTCH.playerGroupTag) === isInBahseiPortal(unitTag)) {
        return 0
      } else {
        return 8
      }
    }
  }

  CRUTCH.Drawing.RegisterSuppressionFilter(PORTAL_SUPPRESSION_FILTER, bahseiPortalFilter)
}

RG.UnregisterBahseiPortal = function (this: void) {
  CRUTCH.UnregisterEnteredGroupCombatListener("RockgroveBahseiPortalEnteredCombat")

  CRUTCH.UnregisterExitedGroupCombatListener("RockgroveBahseiPortalExitedCombat")
  cleanUp()

  CRUTCH.UnregisterForEffectChanged("BitterMarrowEffect")
  CRUTCH.UnregisterForCombatEvent("Clockwise")
  CRUTCH.UnregisterForCombatEvent("CounterClockwise")
  CRUTCH.UnregisterForCombatEvent("PortalExplode")

  if (OSI !== undefined && origOSIUnitErrorCheck !== undefined) {
    CRUTCH.dbgOther("|c88FFFF[CT]|r Restoring OSI.UnitErrorCheck")
    OSI.UnitErrorCheck = origOSIUnitErrorCheck
  }

  CRUTCH.Drawing.UnregisterSuppressionFilter(PORTAL_SUPPRESSION_FILTER)
}
