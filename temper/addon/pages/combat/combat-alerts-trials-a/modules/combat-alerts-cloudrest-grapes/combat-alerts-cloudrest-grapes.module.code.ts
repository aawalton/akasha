import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel/combat-alerts-info-panel.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel-utils/combat-alerts-info-panel-utils.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchCloudrest {
    TestGrapes: (this: void, active: number, faceplanted: number, dead: number) => void
    RegisterGrapes: (this: void) => void
    UnregisterGrapes: (this: void) => void
  }
}

const CR = CRUTCH.Cloudrest
const IP = CRUTCH.InfoPanel

const PANEL_GRAPE_TIMER_INDEX = 5
const PANEL_GRAPE_DISPLAY_INDEX = 6

const grapePrefix = zo_strformat("|c9447ff<<C:1>>: ", GetAbilityName(105375))
const grapeSummonPrefix = zo_strformat("|c9447ff<<C:1>>: ", GetAbilityName(105291))

let numActive = 0
let numFaceplanted = 0
let numDead = 0

const GRAPES: Record<number, boolean> = {}

function updateDisplay(this: void): undefined {
  let text = ""

  for (let i = 1; i <= numDead; i++) {
    text = `${text}|c888888|t100%:100%:/esoui/art/buttons/gamepad/ps5/nav_ps5_x.dds:inheritcolor|t|r`
  }
  for (let i = 1; i <= numFaceplanted; i++) {
    text = `${text}|c945E00|t100%:100%:/esoui/art/buttons/gamepad/ps5/nav_ps5_triangle.dds:inheritcolor|t|r`
  }
  for (let i = 1; i <= numActive; i++) {
    text = `${text}|cFF00FF|t100%:100%:/esoui/art/buttons/gamepad/ps5/nav_ps5_circle.dds:inheritcolor|t|r`
  }

  if (text === "") {
    IP.StopCount(PANEL_GRAPE_DISPLAY_INDEX)
  } else {
    IP.SetLine(PANEL_GRAPE_DISPLAY_INDEX, text)
  }
}

function clearGrapes(this: void): undefined {
  EVENT_MANAGER.UnregisterForUpdate("CrutchClearGrapes")
  CRUTCH.dbgOther("clearing grapes now")
  numActive = 0
  numFaceplanted = 0
  numDead = 0
  updateDisplay()
}

let nextGrapeTarget = 0
function clearGrapesLater(this: void): undefined {
  CRUTCH.dbgOther("clearing grapes later (panel now)")
  IP.StopCount(PANEL_GRAPE_TIMER_INDEX)
  IP.CountDownToTargetTime(PANEL_GRAPE_TIMER_INDEX, grapeSummonPrefix, nextGrapeTarget)
  EVENT_MANAGER.RegisterForUpdate("CrutchClearGrapes", 5000, clearGrapes)
}

CR.TestGrapes = function (this: void, active, faceplanted, dead) {
  numActive = active
  numFaceplanted = faceplanted
  numDead = dead
  updateDisplay()
  IP.CountDownDuration(PANEL_GRAPE_TIMER_INDEX, grapePrefix, 22000)
}

function onGrapesSummoned(this: void): undefined {
  numActive = 3
  numFaceplanted = 0
  numDead = 0
  updateDisplay()

  IP.CountDownDuration(PANEL_GRAPE_TIMER_INDEX, grapePrefix, 22000)
  nextGrapeTarget = GetGameTimeMilliseconds() + 33000
}

const onGrapeDied: CombatEventCallback = (
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
) => {
  if (GRAPES[targetUnitId] !== true) return
  CRUTCH.dbgOther(`grape died ${targetUnitId}`)

  delete GRAPES[targetUnitId]

  numActive = numActive - 1
  numDead = numDead + 1

  updateDisplay()

  if (numActive === 0) {
    clearGrapesLater()
  }
}

const onFaceplanted: CombatEventCallback = (
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
) => {
  if (GRAPES[targetUnitId] !== true) return
  CRUTCH.dbgOther(`faceplanted ${targetUnitId}`)

  delete GRAPES[targetUnitId]

  numActive = numActive - 1
  numFaceplanted = numFaceplanted + 1

  updateDisplay()

  if (numActive === 0) {
    clearGrapesLater()
  }
}

const onGrapeActivated: CombatEventCallback = (
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
) => {
  CRUTCH.dbgOther(`found grape ${targetUnitId}`)
  GRAPES[targetUnitId] = true
}

function onGrapeCharged(this: void): undefined {
  clearGrapesLater()
}

function onInitial(this: void): undefined {
  IP.CountDownDuration(PANEL_GRAPE_TIMER_INDEX, grapeSummonPrefix, 18000)
}

function cleanUp(this: void): undefined {
  numActive = 0
  numFaceplanted = 0
  numDead = 0
  IP.StopCount(PANEL_GRAPE_TIMER_INDEX)
  IP.StopCount(PANEL_GRAPE_DISPLAY_INDEX)
  updateDisplay()
}

CR.RegisterGrapes = function (this: void) {
  if (!CRUTCH.savedOptions.cloudrest.infoPanel.showGrapes) return

  CRUTCH.RegisterExitedGroupCombatListener("CRGrapesExitedCombat", cleanUp)

  CRUTCH.RegisterForCombatEvent("GrapesSummoned", onGrapesSummoned, ACTION_RESULT_BEGIN, 105291)
  CRUTCH.RegisterForCombatEvent("GrapesDied", onGrapeDied, ACTION_RESULT_DIED)
  CRUTCH.RegisterForCombatEvent(
    "GrapesFaceplanted",
    onFaceplanted,
    ACTION_RESULT_EFFECT_GAINED,
    105363
  )
  CRUTCH.RegisterForCombatEvent(
    "GrapesActive",
    onGrapeActivated,
    ACTION_RESULT_EFFECT_GAINED,
    105339
  )
  CRUTCH.RegisterForCombatEvent("GrapesCharge", onGrapeCharged, undefined, 105373)
  CRUTCH.RegisterForCombatEvent(
    "GrapesZmajaStart",
    onInitial,
    ACTION_RESULT_EFFECT_GAINED_DURATION,
    105890
  )
}

CR.UnregisterGrapes = function (this: void) {
  CRUTCH.UnregisterExitedGroupCombatListener("CRGrapesExitedCombat")

  CRUTCH.UnregisterForCombatEvent("GrapesSummoned")
  CRUTCH.UnregisterForCombatEvent("GrapesDied")
  CRUTCH.UnregisterForCombatEvent("GrapesFaceplanted")
  CRUTCH.UnregisterForCombatEvent("GrapesActive")
  CRUTCH.UnregisterForCombatEvent("GrapesCharge")
  CRUTCH.UnregisterForCombatEvent("GrapesZmajaStart")

  cleanUp()
}
