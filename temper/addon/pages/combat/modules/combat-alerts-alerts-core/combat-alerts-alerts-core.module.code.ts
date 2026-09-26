import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-prominent/combat-alerts-alerts-prominent.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-format/combat-alerts-alerts-format.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-ability-data/combat-alerts-alerts-ability-data.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    DisplayNotification: (
      this: void,
      abilityId: number,
      textLabel: string,
      timer: number,
      sourceUnitId: number,
      sourceName: string | number,
      sourceType: number,
      targetUnitId: number,
      targetName: string | number,
      targetType: number,
      result: number,
      preventOverwrite?: boolean
    ) => void
    Interrupted: (this: void, sourceUnitId: number) => string | undefined
    InterruptAbility: (
      this: void,
      abilityId: number,
      suppressStopped?: boolean
    ) => string | undefined
    InterruptAbilityOnTarget: (
      this: void,
      abilityId: number,
      targetUnitId: number,
      suppressStopped?: boolean
    ) => string | undefined
  }
}

interface AlertLine {
  source: number
  expireTime: number
  interrupted?: boolean
  abilityId: number
  target: number
}

interface DisplayingEntry {
  multiTargets: boolean | undefined
  targets?: Record<number, number>
  index?: number
}

const FREE_CONTROLS: Record<number, AlertLine | false> = {}
let numControls = 0

const DISPLAYING: Record<number, Record<number, DisplayingEntry>> = {}

function removeFromDisplaying(
  this: void,
  sourceUnitId: number,
  abilityId: number,
  targetUnitId: number
): undefined {
  const unitData = DISPLAYING[sourceUnitId]
  if (unitData !== undefined) {
    const abilityData = unitData[abilityId]
    if (abilityData !== undefined) {
      if (abilityData.multiTargets === true) {
        const targets = abilityData.targets as Record<number, number>
        delete targets[targetUnitId]
        if (ZO_IsTableEmpty(targets)) {
          delete unitData[abilityId]
        }
      } else {
        delete unitData[abilityId]
      }
    }
    if (ZO_IsTableEmpty(unitData)) {
      delete DISPLAYING[sourceUnitId]
    }
  }
}

function addToDisplaying(
  this: void,
  sourceUnitId: number,
  abilityId: number,
  preventOverwrite: boolean | undefined,
  targetUnitId: number,
  index: number
): undefined {
  let unitData = DISPLAYING[sourceUnitId]
  if (unitData === undefined) {
    unitData = {}
    DISPLAYING[sourceUnitId] = unitData
  }

  let abilityData = unitData[abilityId]
  if (abilityData === undefined) {
    abilityData = { multiTargets: preventOverwrite }
    unitData[abilityId] = abilityData
    if (abilityData.multiTargets === true) {
      abilityData.targets = {}
    }
  }

  if (abilityData.multiTargets === true) {
    ;(abilityData.targets as Record<number, number>)[targetUnitId] = index
  } else {
    abilityData.index = index
  }
}

let isPolling = false

const resultStrings = CRUTCH.Constants.ACTION_RESULTS
const unitTypeStrings = CRUTCH.Constants.UNIT_TYPES

function getTimerColor(this: void, timer: number): [number, number, number] {
  if (timer > 2000) {
    return [255, 238, 0]
  } else if (timer > 1000) {
    return [255, 140, 0]
  } else {
    return [255, 0, 0]
  }
}

function getScale(this: void): number {
  return CRUTCH.savedOptions.general.alertScale
}

function getLine(this: void, index: number): Control {
  return TemperCombatAlertsContainer.GetNamedChild("Line" + tostring(index)) as Control
}

function updateDisplay(this: void): undefined {
  const currTime = GetGameTimeMilliseconds()
  let numActive = 0
  for (let i = 1; i <= numControls; i++) {
    const data = FREE_CONTROLS[i]
    if (data !== undefined && data !== false) {
      const lineControl = getLine(i)
      const millisRemaining = data.expireTime - currTime
      if (millisRemaining < 0) {
        lineControl.SetHidden(true)
        FREE_CONTROLS[i] = false
        removeFromDisplaying(data.source, data.abilityId, data.target)
      } else {
        numActive = numActive + 1
        if (data.interrupted !== true) {
          const timerLabel = lineControl.GetNamedChild<LabelControl>("Timer") as LabelControl
          timerLabel.SetText(string.format("%.1f", millisRemaining / 1000))
          const color = getTimerColor(millisRemaining)
          timerLabel.SetColor(color[0], color[1], color[2])

          if (CRUTCH.savedOptions.general.showProminent) {
            let prominentThreshold = 1000
            const prominentData = CRUTCH.prominent[data.abilityId]
            if (prominentData !== undefined && prominentData.preMillis !== undefined) {
              prominentThreshold = prominentData.preMillis
            }
            if (millisRemaining <= prominentThreshold && prominentData !== undefined) {
              if (CRUTCH.prominentDisplaying[data.abilityId] === undefined) {
                CRUTCH.DisplayProminent(data.abilityId)
              }
            }
          }
        }
      }
    }
  }

  if (numActive === 0) {
    EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "Poll")
    isPolling = false
  }
}

function findOrCreateControl(this: void): number {
  for (let i = 1; i <= numControls; i++) {
    if (FREE_CONTROLS[i] === false) {
      return i
    }
  }

  const index = numControls + 1
  numControls = index
  const lineControl = CreateControlFromVirtual(
    "$(parent)Line" + tostring(index),
    TemperCombatAlertsContainer,
    "TemperCombatAlerts_Line_Template",
    ""
  )
  if (index === 1) {
    lineControl.SetAnchor(CENTER, TemperCombatAlertsContainer, CENTER, 0, 0)
  } else {
    const prevControl = getLine(index - 1)
    lineControl.SetAnchor(TOP, prevControl, BOTTOM, 0, (getScale() * 4) / 9)
  }

  return index
}

CRUTCH.DisplayNotification = function (
  this: void,
  abilityId,
  textLabel,
  timer,
  sourceUnitId,
  sourceName,
  sourceType,
  targetUnitId,
  targetName,
  targetType,
  result,
  preventOverwrite
) {
  const [customTime, customColor, hideTimer, alertType, resultFilter, dingInIA, customText] =
    CRUTCH.GetFormatInfo(abilityId)
  let label = textLabel
  if (customText !== undefined) {
    label = customText
  }
  if (CRUTCH.savedOptions.general.showSpeshul && CRUTCH.savedOptions.memes.alertNames === true) {
    label = CRUTCH.DecorateNotificationText(label)
  }

  if (resultFilter === 1 && result !== ACTION_RESULT_BEGIN) {
    return
  }
  if (resultFilter === 2 && result !== ACTION_RESULT_EFFECT_GAINED) {
    return
  }
  if (resultFilter === 3 && result !== ACTION_RESULT_EFFECT_GAINED_DURATION) {
    return
  }

  let duration: number = timer
  if (customTime !== 0) {
    duration = customTime
  }

  if (type(duration) !== "number") {
    duration = 1000
    CRUTCH.dbgOther("|cFF0000Warning: timer is not number, setting to 1000|r")
  }

  const sourceIdAndName = zo_strformat("<<1>> <<2>>", sourceUnitId, sourceName)
  const targetIdAndName = zo_strformat("<<1>> <<2>>", targetUnitId, targetName)

  let index = 0
  const displayed = DISPLAYING[sourceUnitId]?.[abilityId]
  if (displayed !== undefined) {
    if ((preventOverwrite !== true && alertType === 2) || displayed.multiTargets === true) {
      return
    }

    if (alertType === 3) {
      index = findOrCreateControl()
    } else {
      if (abilityId !== 114578 && abilityId !== 72057) {
        CRUTCH.dbgSpam(
          string.format(
            "|cFF8888[CS]|r Overwriting %s from %s because it's already being displayed",
            GetAbilityName(abilityId),
            sourceIdAndName
          )
        )
      }
      index = displayed.index as number
    }
  } else {
    index = findOrCreateControl()
  }

  const lineControl = getLine(index)
  FREE_CONTROLS[index] = {
    source: sourceUnitId,
    expireTime: GetGameTimeMilliseconds() + duration,
    abilityId,
    target: targetUnitId,
  }
  addToDisplaying(sourceUnitId, abilityId, preventOverwrite, targetUnitId, index)

  let resultString = ""
  if (result !== undefined) {
    resultString = " " + (resultStrings[result] ?? tostring(result))
  }

  let sourceTypeString = ""
  if (sourceType !== undefined) {
    sourceTypeString = " " + (unitTypeStrings[sourceType] ?? tostring(sourceType))
  }

  let targetTypeString = ""
  if (targetType !== undefined) {
    targetTypeString = " " + (unitTypeStrings[targetType] ?? tostring(targetType))
  }

  const styles = CRUTCH.GetStyles()
  const scale = getScale()
  const alertFont = styles.GetAlertFont((scale * 8) / 9)
  const smallFont = styles.GetAlertFont((scale * 7) / 18)

  lineControl.SetHeight(scale)
  const labelControl = lineControl.GetNamedChild<LabelControl>("Label") as LabelControl
  labelControl.SetFont(alertFont)
  labelControl.SetDimensions(1200, scale)
  labelControl.SetText(
    customColor !== undefined
      ? zo_strformat("|c<<1>><<2>>|r", customColor, label)
      : zo_strformat("<<1>>", label)
  )
  labelControl.SetWidth(labelControl.GetTextWidth())

  const timerLabel = lineControl.GetNamedChild<LabelControl>("Timer") as LabelControl
  if (hideTimer === 1) {
    timerLabel.SetHidden(true)
  } else {
    timerLabel.SetHidden(false)
    timerLabel.SetFont(alertFont)
    timerLabel.SetText(string.format("%.1f", duration / 1000))
    timerLabel.SetDimensions(200, scale)
    timerLabel.SetWidth(timerLabel.GetTextWidth())
    timerLabel.SetAnchor(LEFT, labelControl, RIGHT, (scale * 5) / 18)
    const color = getTimerColor(duration)
    timerLabel.SetColor(color[0], color[1], color[2])
  }

  const iconControl = lineControl.GetNamedChild<TextureControl>("Icon") as TextureControl
  iconControl.SetTexture(GetAbilityIcon(abilityId))
  iconControl.SetDimensions(scale, scale)
  iconControl.SetAnchor(RIGHT, labelControl, LEFT, (-scale * 2) / 9, 3)

  const idLabel = lineControl.GetNamedChild<LabelControl>("Id") as LabelControl
  idLabel.SetFont(smallFont)
  if (CRUTCH.savedOptions.debugLine) {
    idLabel.SetText(
      string.format(
        "%d (%d) [%s%s] [%s%s]%s",
        abilityId,
        duration,
        sourceIdAndName,
        sourceTypeString,
        targetIdAndName,
        targetTypeString,
        resultString
      )
    )
  } else {
    idLabel.SetText("")
  }

  lineControl.SetHidden(false)

  if (
    dingInIA === 1 &&
    CRUTCH.savedOptions.endlessArchive.dingUppercut &&
    GetZoneId(GetUnitZoneIndex("player")) === 1436
  ) {
    PlaySound(SOUNDS.DUEL_START)
  }

  if (
    dingInIA === 2 &&
    CRUTCH.savedOptions.endlessArchive.dingDangerous &&
    GetZoneId(GetUnitZoneIndex("player")) === 1436
  ) {
    PlaySound(SOUNDS.DUEL_START)
  }

  if (!isPolling) {
    EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "Poll", 100, updateDisplay)
    isPolling = true
  }
}

function adjustControlsOnInterrupt(
  this: void,
  unitId: number,
  abilityId: number,
  targetUnitId: number | undefined,
  suppressStopped: boolean | undefined
): string | undefined {
  if (CRUTCH.uninterruptible[abilityId] === true) {
    return undefined
  }

  const data = (DISPLAYING[unitId] as Record<number, DisplayingEntry>)[abilityId] as DisplayingEntry
  let index: number | undefined
  if (targetUnitId !== undefined && data.targets !== undefined) {
    index = data.targets[targetUnitId]
  } else {
    index = data.index
  }
  let expiredTimer = "0"
  const line = index !== undefined ? FREE_CONTROLS[index] : undefined
  if (index !== undefined && line !== undefined && line !== false && line.interrupted !== true) {
    line.interrupted = true

    if (suppressStopped === true) {
      line.expireTime = GetGameTimeMilliseconds() - 1
      updateDisplay()
    } else if (GetGameTimeMilliseconds() < line.expireTime - 100) {
      line.expireTime = GetGameTimeMilliseconds() + 1000

      const lineControl = getLine(index)
      const labelControl = lineControl.GetNamedChild<LabelControl>("Label") as LabelControl
      const timerControl = lineControl.GetNamedChild<LabelControl>("Timer") as LabelControl
      labelControl.SetWidth(800)
      labelControl.SetText(labelControl.GetText() + " |cA8FFBD- stopped|r")
      labelControl.SetWidth(labelControl.GetTextWidth())
      expiredTimer = timerControl.GetText()
      timerControl.SetText("")
    }
  }

  const slot = CRUTCH.prominentDisplaying[abilityId]
  if (slot !== undefined) {
    const control = GetControl("TemperCombatAlertsProminent" + tostring(slot)) as Control
    control.SetHidden(true)
    delete CRUTCH.prominentDisplaying[abilityId]
    EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "Prominent" + tostring(slot))
  }

  return expiredTimer
}

CRUTCH.Interrupted = function (this: void, sourceUnitId) {
  const unitData = DISPLAYING[sourceUnitId]
  if (unitData === undefined) {
    return undefined
  }

  CRUTCH.dbgSpam("Attempting to interrupt sourceUnitId " + tostring(sourceUnitId))
  let expiredTimer: string | undefined = "0"
  for (const [abilityId] of pairs(unitData)) {
    expiredTimer = adjustControlsOnInterrupt(sourceUnitId, abilityId, undefined, undefined)
  }
  return expiredTimer
}

CRUTCH.InterruptAbility = function (this: void, abilityId, suppressStopped) {
  let expiredTimer: string | undefined = "0"
  for (const [unitId, unitData] of pairs(DISPLAYING)) {
    if (unitData[abilityId] !== undefined) {
      expiredTimer = adjustControlsOnInterrupt(unitId, abilityId, undefined, suppressStopped)
    }
  }
  return expiredTimer
}

CRUTCH.InterruptAbilityOnTarget = function (this: void, abilityId, targetUnitId, suppressStopped) {
  CRUTCH.dbgSpam(
    string.format(
      "Attempting to interrupt %s (%d) on %s (%d)",
      GetAbilityName(abilityId),
      abilityId,
      GetUnitDisplayName(CRUTCH.groupIdToTag[targetUnitId] as string),
      targetUnitId
    )
  )
  let expiredTimer: string | undefined = "0"
  for (const [unitId, unitData] of pairs(DISPLAYING)) {
    const abilityData = unitData[abilityId]
    if (
      abilityData !== undefined &&
      abilityData.targets !== undefined &&
      abilityData.targets[targetUnitId] !== undefined
    ) {
      expiredTimer = adjustControlsOnInterrupt(unitId, abilityId, targetUnitId, suppressStopped)
    }
  }
  return expiredTimer
}
