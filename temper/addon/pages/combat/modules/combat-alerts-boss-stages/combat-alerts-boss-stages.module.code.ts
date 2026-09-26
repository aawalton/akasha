import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import {
  type BossThresholds,
  dbg,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-boss-api/combat-alerts-boss-api.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import type { OptionColor } from "akasha/temper/addon/pages/combat/modules/combat-alerts-options/combat-alerts-options.module.code.ts"

const BHB = CRUTCH.BossHealthBar

const THRESHOLD_OVERRIDES: Record<string, BossThresholds> = {}

BHB.AddThresholdOverride = function (this: void, name, thresholds) {
  THRESHOLD_OVERRIDES[name] = thresholds
  for (const [, listener] of pairs(BHB.thresholdsChangeListeners)) {
    listener(name, true)
  }
}

BHB.RemoveThresholdOverride = function (this: void, name) {
  if (THRESHOLD_OVERRIDES[name] !== undefined) {
    delete THRESHOLD_OVERRIDES[name]
    for (const [, listener] of pairs(BHB.thresholdsChangeListeners)) {
      listener(name, false)
    }
  }
}

BHB.GetThresholdOverride = function (this: void, name) {
  return THRESHOLD_OVERRIDES[name]
}

BHB.GetUnitNameIfExists = function (this: void, unitTag) {
  const spoofed = BHB.spoofedBosses[unitTag]
  if (spoofed !== undefined) {
    return spoofed.name
  }

  if (DoesUnitExist(unitTag)) {
    return GetUnitName(unitTag)
  }
  return undefined
}

BHB.GetUnitHealths = function (this: void, unitTag) {
  const spoofed = BHB.spoofedBosses[unitTag]
  if (spoofed !== undefined) {
    return spoofed.getHealthFunction()
  }
  return GetUnitPower(unitTag, COMBAT_MECHANIC_FLAGS_HEALTH)
}

export function roundHealth(this: void, num: number): number {
  if (CRUTCH.savedOptions.bossHealthBar.useFloorRounding) {
    return math.floor(num)
  } else {
    return zo_round(num)
  }
}

export function getScale(this: void): number {
  return CRUTCH.savedOptions.bossHealthBar.scale
}

export function getScaledFont(this: void, size: number): string {
  return CRUTCH.GetStyles().GetBHBFont(size * getScale())
}

export function setLabelColor(this: void, label: LabelControl, color: OptionColor): undefined {
  const [r, g, b, a] = unpack(color as [number, number, number, number])
  label.SetColor(r, g, b, a)
}

export function setCenterColor(
  this: void,
  backdrop: BackdropControl,
  color: OptionColor
): undefined {
  const [r, g, b, a] = unpack(color as [number, number, number, number])
  backdrop.SetCenterColor(r, g, b, a)
}

interface MechanicControls {
  state: string
  percentNumber: number
  percentage: LabelControl
  mechanic: LabelControl
  line: Control
  individual?: string
}

const MECHANIC_CONTROLS: MechanicControls[] = []
const MULTI_MECHANICS: Record<number, number[]> = {}
const INACTIVE = "INACTIVE"
const ACTIVE = "ACTIVE"
const IMMINENT = "IMMINENT"
const PASSED = "PASSED"

BHB.DumpMechanicControls = function (this: void) {
  d(MECHANIC_CONTROLS)
  d("--------------")
  for (let i = 0; i < MECHANIC_CONTROLS.length; i++) {
    const mech = MECHANIC_CONTROLS[i] as MechanicControls
    d(
      string.format(
        "[%d] %s - %d - %s",
        i + 1,
        mech.state,
        mech.percentNumber,
        mech.individual ?? "all"
      )
    )
  }
}

function getUnusedControlsIndex(this: void): number {
  let index = -1
  for (let i = 0; i < MECHANIC_CONTROLS.length; i++) {
    if (MECHANIC_CONTROLS[i]?.state === INACTIVE) {
      index = i
      break
    }
  }

  if (index !== -1) {
    return index
  }

  const luaIndex = MECHANIC_CONTROLS.length + 1

  dbg("creating new controls for index " + tostring(luaIndex))

  const percentageLabel = CreateControlFromVirtual<LabelControl>(
    "$(parent)Percent" + tostring(luaIndex),
    TemperCombatAlertsBossHealthBarContainer,
    "TemperCombatAlertsBossHealthBarPercentageTemplate",
    ""
  )

  const mechanicLabel = CreateControlFromVirtual<LabelControl>(
    "$(parent)Mechanic" + tostring(luaIndex),
    TemperCombatAlertsBossHealthBarContainer,
    "TemperCombatAlertsBossHealthBarMechanicTemplate",
    ""
  )

  const lineControl = CreateControlFromVirtual(
    "$(parent)Line" + tostring(luaIndex),
    TemperCombatAlertsBossHealthBarContainer,
    "TemperCombatAlertsBossHealthBarLineTemplate",
    ""
  )

  MECHANIC_CONTROLS.push({
    state: ACTIVE,
    percentNumber: 0,
    percentage: percentageLabel,
    mechanic: mechanicLabel,
    line: lineControl,
  })

  return luaIndex - 1
}

function createStageControl(
  this: void,
  percentage: number,
  bossTag: string | undefined
): MechanicControls {
  const controlIndex = getUnusedControlsIndex()
  const controls = MECHANIC_CONTROLS[controlIndex] as MechanicControls
  controls.state = ACTIVE
  controls.percentNumber = percentage
  controls.individual = bossTag

  if (bossTag !== undefined) {
    let multi = MULTI_MECHANICS[percentage]
    if (multi === undefined) {
      multi = []
      MULTI_MECHANICS[percentage] = multi
    }
    multi.push(controlIndex)
  }
  return controls
}

export function hideAllStages(this: void): undefined {
  for (const controls of MECHANIC_CONTROLS) {
    controls.state = INACTIVE
    controls.percentage.SetHidden(true)
    controls.mechanic.SetHidden(true)
    controls.line.SetHidden(true)
  }
  ZO_ClearTable(MULTI_MECHANICS)
}

BHB.GetFirstValidBossTag = function (this: void) {
  for (let i = 1; i <= BOSS_RANK_ITERATION_END; i++) {
    const unitTag = "boss" + tostring(i)
    if (DoesUnitExist(unitTag)) {
      return unitTag
    }
  }
  return ""
}

export interface BossHealth {
  current: number
  max: number
}

export const BOSS_HEALTHS: Record<number, BossHealth> = {}

function getBossHealthFraction(this: void, id: number): number {
  const tag = "boss" + tostring(id)
  if (BHB.spoofedBosses[tag] !== undefined) {
    return 0
  }

  const health = BOSS_HEALTHS[id]
  if (health === undefined) {
    return 0
  }

  return health.current / health.max
}

function setThresholdColor(
  this: void,
  control: LabelControl,
  settingsColor: OptionColor
): undefined {
  setLabelColor(control, settingsColor)
}

function getMultiMechanicHighlightInfo(
  this: void,
  percentageNumber: number,
  bossTag: string
): LuaMultiReturn<[string, number | undefined]> {
  const multiMechanic = MULTI_MECHANICS[percentageNumber] ?? []

  if (multiMechanic.length === 1) {
    const mechanicControlsIndex = multiMechanic[0] as number
    const mechanicControl = MECHANIC_CONTROLS[mechanicControlsIndex] as MechanicControls
    return $multi(mechanicControl.state, mechanicControlsIndex)
  }

  let allPassed = true
  let imminentIndex: number | undefined
  let activeIndex: number | undefined
  for (const mechanicControlsIndex of multiMechanic) {
    const mechanicControl = MECHANIC_CONTROLS[mechanicControlsIndex] as MechanicControls
    if (mechanicControl.state === IMMINENT) {
      allPassed = false
      imminentIndex = mechanicControlsIndex
    }
    if (mechanicControl.state === ACTIVE) {
      allPassed = false
      activeIndex = mechanicControlsIndex
    }
  }

  if (allPassed) {
    return $multi(PASSED, undefined)
  } else if (imminentIndex !== undefined) {
    return $multi(IMMINENT, imminentIndex)
  } else if (activeIndex !== undefined) {
    return $multi(ACTIVE, activeIndex)
  }

  CRUTCH.dbgOther("|cFF0000multi mechanic highlight?? " + percentageNumber + " " + bossTag)
  return $multi(ACTIVE, undefined)
}

export function updateStagesWithBossHealth(this: void): undefined {
  let highestHealth = 0
  for (let i = 1; i <= BOSS_RANK_ITERATION_END; i++) {
    const hp = getBossHealthFraction(i)
    if (hp > highestHealth) {
      highestHealth = hp
    }
  }
  highestHealth = roundHealth(highestHealth * 100)

  for (const controls of MECHANIC_CONTROLS) {
    if (controls.state !== INACTIVE) {
      let healthToCheck = highestHealth
      if (controls.individual !== undefined) {
        const [bossIndex] = string.gsub(controls.individual, "boss", "")
        healthToCheck = roundHealth(getBossHealthFraction(tonumber(bossIndex) ?? 0) * 100)
      }

      if (controls.state !== PASSED && healthToCheck < controls.percentNumber - 1) {
        controls.state = PASSED
      } else if (
        controls.state !== IMMINENT &&
        healthToCheck >= controls.percentNumber - 1 &&
        healthToCheck <= controls.percentNumber + 5
      ) {
        controls.state = IMMINENT
      }
    }
  }

  const options = CRUTCH.savedOptions.bossHealthBar
  for (let index = 0; index < MECHANIC_CONTROLS.length; index++) {
    const controls = MECHANIC_CONTROLS[index] as MechanicControls
    if (controls.state !== INACTIVE) {
      let labelsState = controls.state
      let showLabels = true

      if (controls.individual !== undefined) {
        const [state, activeIndex] = getMultiMechanicHighlightInfo(
          controls.percentNumber,
          controls.individual
        )
        labelsState = state
        showLabels = activeIndex === index
      }

      const backdrop = controls.line.GetNamedChild<BackdropControl>("Backdrop") as BackdropControl
      if (controls.state === PASSED) {
        setCenterColor(backdrop, options.passedColor)
      } else if (controls.state === IMMINENT) {
        setCenterColor(backdrop, options.imminentColor)
      }

      if (labelsState === PASSED) {
        setThresholdColor(controls.percentage, options.passedColor)
        setThresholdColor(controls.mechanic, options.passedColor)
      } else if (labelsState === IMMINENT) {
        setThresholdColor(controls.percentage, options.imminentColor)
        setThresholdColor(controls.mechanic, options.imminentColor)
      } else if (controls.state === ACTIVE) {
        setThresholdColor(controls.percentage, options.activeColor)
        setThresholdColor(controls.mechanic, options.activeColor)
      }

      controls.percentage.SetHidden(!showLabels)
      controls.mechanic.SetHidden(!showLabels)
    }
  }
}

const DEFAULT_STAGES: BossThresholds = {
  75: "",
  50: "",
  25: "",
}

function drawStage(
  this: void,
  percentage: number,
  mechanic: string,
  bossTag: string | undefined
): undefined {
  const controls = createStageControl(percentage, bossTag)
  const percentageLabel = controls.percentage
  const mechanicLabel = controls.mechanic
  const lineControl = controls.line
  const container = TemperCombatAlertsBossHealthBarContainer
  const options = CRUTCH.savedOptions.bossHealthBar

  const barHeight = 320 * getScale()
  const stageYOffset = (zo_clamp(100 - percentage - 0.99, 0, 100) / 100) * barHeight

  percentageLabel.ClearAnchors()
  percentageLabel.SetAnchor(RIGHT, container, TOPLEFT, -5 * getScale(), stageYOffset)
  percentageLabel.SetFont(getScaledFont(14))
  percentageLabel.SetText(tostring(percentage))
  percentageLabel.SetWidth(40 * getScale())
  percentageLabel.SetWidth(percentageLabel.GetTextWidth())
  percentageLabel.SetHeight(16 * getScale())
  setLabelColor(percentageLabel, options.activeColor)
  percentageLabel.SetHidden(false)
  if (options.horizontal) {
    percentageLabel.SetTransformRotationZ(math.pi / 2)
  } else {
    percentageLabel.SetTransformRotationZ(0)
  }

  mechanicLabel.ClearAnchors()
  mechanicLabel.SetAnchor(LEFT, container, TOPRIGHT, 6 * getScale(), stageYOffset)
  mechanicLabel.SetWidth(600 * getScale())
  mechanicLabel.SetHeight(16 * getScale())
  mechanicLabel.SetFont(getScaledFont(14))
  mechanicLabel.SetText(mechanic)
  setLabelColor(mechanicLabel, options.activeColor)
  mechanicLabel.SetHidden(false)

  lineControl.ClearAnchors()

  if (bossTag === undefined) {
    lineControl.SetAnchor(TOPLEFT, container, TOPLEFT, -4 * getScale(), stageYOffset)
    lineControl.SetAnchor(TOPRIGHT, container, TOPRIGHT, 4 * getScale(), stageYOffset)
  } else {
    const [indexText] = string.gsub(bossTag, "boss", "")
    const index = tonumber(indexText)

    const statusBar = container.GetNamedChild("Bar" + tostring(index))
    if (index === 1) {
      lineControl.SetAnchor(TOPLEFT, container, TOPLEFT, -4 * getScale(), stageYOffset)
    } else {
      lineControl.SetAnchor(TOPLEFT, statusBar, TOPLEFT, -2 * getScale(), stageYOffset)
    }

    if (index === 2) {
      lineControl.SetAnchor(TOPRIGHT, container, TOPRIGHT, 4 * getScale(), stageYOffset)
    } else {
      lineControl.SetAnchor(TOPRIGHT, statusBar, TOPRIGHT, 2 * getScale(), stageYOffset)
    }
  }

  const lineThiccness = math.max(1, math.ceil(GetUIGlobalScale() * getScale()))
  const lineHeight: unknown = lineThiccness + "px"
  lineControl.SetHeight(lineHeight as number)
  const backdrop = lineControl.GetNamedChild<BackdropControl>("Backdrop") as BackdropControl
  setCenterColor(backdrop, options.activeColor)
  lineControl.SetHidden(false)
}

export function redrawStages(this: void, optionalBossName?: string): undefined {
  hideAllStages()

  let data = BHB.GetBossThresholds(optionalBossName)
  if (data === undefined) {
    data = DEFAULT_STAGES
  }

  let isMulti = false
  for (let i = 1; i <= BOSS_RANK_ITERATION_END; i++) {
    const unitTag = `boss${i}` as const
    const stages = data[unitTag]
    if (stages !== undefined) {
      isMulti = true
      for (const [percentage, mechanic] of pairs(stages)) {
        if (type(percentage) === "number") {
          drawStage(percentage, mechanic, unitTag)
        }
      }
    }
  }
  if (isMulti) return

  for (const [percentage, mechanic] of pairs(data as Record<number | string, unknown>)) {
    if (type(percentage) === "number") {
      drawStage(percentage as number, mechanic as string, undefined)
    }
  }
}
