import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-panels-declarations/combat-alerts-panels-declarations.type-declaration.d.ts"
import { dbg } from "akasha/temper/addon/pages/combat/modules/combat-alerts-boss-api/combat-alerts-boss-api.module.code.ts"
import {
  BOSS_HEALTHS,
  getScale,
  getScaledFont,
  hideAllStages,
  redrawStages,
  roundHealth,
  updateStagesWithBossHealth,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-boss-stages/combat-alerts-boss-stages.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const BHB = CRUTCH.BossHealthBar

type AttachedPercentLabel = LabelControl & {
  slideAnimation: ZoTimeline
  slide: TranslateAnimation
}

function namedChild<T extends Control>(this: void, parent: Control, name: string): T {
  return parent.GetNamedChild<T>(name) as T
}

function onThresholdsChanged(this: void, _name: string, _isAdded: boolean): undefined {
  if (BHB.GetFirstValidBossTag() !== "") {
    redrawStages()
  }
}

let logNextPowerUpdate = 0
let powerUpdateDebug = false

function onPowerUpdate(
  this: void,
  _eventCode: number | undefined,
  unitTag: string,
  _powerIndex: number | undefined,
  _powerType: number | undefined,
  powerValue: number,
  powerMax: number,
  powerEffectiveMax: number
): undefined {
  const index = tonumber(string.sub(unitTag, 5, 5)) ?? 0
  const statusBar = TemperCombatAlertsBossHealthBarContainer.GetNamedChild<StatusBarControl>(
    "Bar" + tostring(index)
  )
  if (statusBar !== undefined) {
    ZO_StatusBar_SmoothTransition(statusBar, powerValue, powerMax)
    const roundedPercent = roundHealth((powerValue * 100) / powerMax)
    const percentText = zo_strformat("<<1>>%", tostring(roundedPercent))
    namedChild<LabelControl>(statusBar, "Percent").SetText(percentText)

    const attachedPercent = namedChild<AttachedPercentLabel>(statusBar, "AttachedPercent")
    attachedPercent.SetText(percentText)
    const [, originY] = attachedPercent.GetCenter()
    let targetY: number
    if (CRUTCH.savedOptions.bossHealthBar.horizontal) {
      targetY =
        statusBar.GetTop() + ((100 - roundedPercent) / 5) * 16 * getScale() - 18 * getScale()
    } else {
      targetY =
        statusBar.GetTop() + ((100 - roundedPercent) / 5) * 16 * getScale() - 12 * getScale()
    }
    attachedPercent.slide.SetDeltaOffsetX(0)
    attachedPercent.slide.SetDeltaOffsetY(targetY - originY)
    attachedPercent.slideAnimation.PlayFromStart()

    const previous = BOSS_HEALTHS[index]
    if (previous !== undefined) {
      const prevValue = previous.current
      const prevMax = previous.max

      if (logNextPowerUpdate > 0) {
        CRUTCH.dbgSpam(
          string.format(
            "|cFFFF00[BHB]|r boss %d changed (%d -> %d) / (%d -> %d) {%d} [logNextPowerUpdate %d]",
            index,
            prevValue,
            powerValue,
            prevMax,
            powerMax,
            powerEffectiveMax,
            logNextPowerUpdate
          )
        )
        logNextPowerUpdate = logNextPowerUpdate - 1
      } else if (powerUpdateDebug && powerValue !== prevValue) {
        CRUTCH.dbgSpam(
          string.format(
            "|c64e1fa[BHB]|r %s (boss%d) %.1fk || |c64e1fa%s|r / |c64e1fa%s|r (|c64e1fa%.3f|r)",
            BHB.GetUnitNameIfExists(unitTag),
            index,
            (powerValue - prevValue) / 1000,
            ZO_CommaDelimitDecimalNumber(powerValue),
            ZO_CommaDelimitDecimalNumber(powerMax),
            (powerValue * 100) / powerMax
          )
        )
      }

      if (powerValue === prevValue && powerMax === prevMax) {
        return
      }

      if (powerMax > prevMax) {
        CRUTCH.dbgSpam(
          string.format(
            "|cFF0000[BHB] boss %d MAX INCREASE|r %d / %d -> %d",
            index,
            powerValue,
            prevMax,
            powerMax
          )
        )
        logNextPowerUpdate = 5

        BOSS_HEALTHS[index] = { current: powerValue, max: powerMax }
        redrawStages()
        return
      } else if (powerMax < prevMax) {
        CRUTCH.dbgSpam(
          string.format(
            "|c00FFFF[BHB] boss %d MAX DECREASE|r %d / %d -> %d",
            index,
            powerValue,
            prevMax,
            powerMax
          )
        )
        logNextPowerUpdate = 5

        BOSS_HEALTHS[index] = { current: powerValue, max: powerMax }
        redrawStages()
        return
      }
    }

    BOSS_HEALTHS[index] = { current: powerValue, max: powerMax }
    updateStagesWithBossHealth()
  }
}
BHB.OnPowerUpdate = onPowerUpdate

CRUTCH.ToggleHealthDebug = function (this: void) {
  powerUpdateDebug = !powerUpdateDebug
  d(powerUpdateDebug)
}

function getOrCreateStatusBar(this: void, index: number): StatusBarControl {
  const container = TemperCombatAlertsBossHealthBarContainer
  const horizontal = CRUTCH.savedOptions.bossHealthBar.horizontal
  let statusBar = container.GetNamedChild<StatusBarControl>("Bar" + tostring(index))
  if (statusBar === undefined) {
    statusBar = CreateControlFromVirtual<StatusBarControl>(
      "$(parent)Bar" + tostring(index),
      container,
      "TemperCombatAlertsBossHealthBarBarTemplate",
      ""
    )
    CRUTCH.SetBarColors(index, undefined, undefined)
    dbg("Created new control Bar" + tostring(index))
  }
  statusBar.SetWidth(30 * getScale())
  statusBar.SetHeight(320 * getScale())
  statusBar.ClearAnchors()
  statusBar.SetAnchor(TOPLEFT, container, TOPLEFT, (index - 1) * 36 * getScale() + 2 * getScale())

  const backdrop = namedChild<BackdropControl>(statusBar, "Backdrop")
  backdrop.ClearAnchors()
  backdrop.SetAnchor(TOPLEFT, statusBar, TOPLEFT, -2 * getScale(), -2 * getScale())
  backdrop.SetAnchor(BOTTOMRIGHT, statusBar, BOTTOMRIGHT, 2 * getScale(), 2 * getScale())

  const bossName = namedChild<LabelControl>(statusBar, "BossName")
  bossName.SetFont(getScaledFont(16))
  bossName.SetWidth(200 * getScale())
  bossName.SetHeight(20 * getScale())
  bossName.ClearAnchors()
  bossName.SetAnchor(CENTER, statusBar, BOTTOM, 0, -104 * getScale())

  const percent = namedChild<LabelControl>(statusBar, "Percent")
  percent.SetFont(getScaledFont(15))
  percent.SetWidth(40 * getScale())
  percent.SetHeight(16 * getScale())
  percent.ClearAnchors()
  if (horizontal) {
    percent.SetAnchor(TOP, statusBar, BOTTOM, 0, 10 * getScale())
    percent.SetTransformRotationZ(math.pi / 2)
  } else {
    percent.SetAnchor(TOP, statusBar, BOTTOM, 0, 2 * getScale())
    percent.SetTransformRotationZ(0)
  }

  const attachedPercent = namedChild<LabelControl>(statusBar, "AttachedPercent")
  attachedPercent.SetFont(getScaledFont(15))
  attachedPercent.SetWidth(40 * getScale())
  attachedPercent.SetHeight(16 * getScale())
  attachedPercent.ClearAnchors()
  if (horizontal) {
    attachedPercent.SetAnchor(CENTER, statusBar, TOP, 0, -18 * getScale())
    attachedPercent.SetTransformRotationZ(math.pi / 2)
  } else {
    attachedPercent.SetAnchor(CENTER, statusBar, TOP, 0, -12 * getScale())
    attachedPercent.SetTransformRotationZ(0)
  }

  statusBar.SetHidden(false)

  return statusBar
}

function showOrHideBars(
  this: void,
  showAllForMoving?: boolean,
  onlyReanchorStages?: boolean
): undefined {
  let highestTag = 0

  for (let i = 1; i <= BOSS_RANK_ITERATION_END; i++) {
    const unitTag = "boss" + tostring(i)
    let name = BHB.GetUnitNameIfExists(unitTag)
    if (showAllForMoving) {
      name = "Example Boss " + tostring(i)
    }
    if (name !== undefined && name !== "") {
      highestTag = i
      const statusBar = getOrCreateStatusBar(i)

      let [powerValue, powerMax, powerEffectiveMax] = BHB.GetUnitHealths(unitTag)
      if (showAllForMoving) {
        powerMax = 1

        if (i === 4) {
          name = "Shielded Boss 4"
          powerValue = 0.4
          BHB.UpdateBar(unitTag, ATTRIBUTE_VISUAL_POWER_SHIELDING, false, 0.7, 1)
          BHB.UpdateBar(unitTag, ATTRIBUTE_VISUAL_UNWAVERING_POWER, true, 0, 1)
        } else if (i === 5) {
          name = "Invulnerable Boss 5"
          powerValue = 0.6
          BHB.UpdateBar(unitTag, ATTRIBUTE_VISUAL_POWER_SHIELDING, true, 0, 1)
          BHB.UpdateBar(unitTag, ATTRIBUTE_VISUAL_UNWAVERING_POWER, false, 1, 1)
        } else {
          powerValue = math.random()
          BHB.UpdateBar(unitTag, ATTRIBUTE_VISUAL_POWER_SHIELDING, true, 0, 1)
          BHB.UpdateBar(unitTag, ATTRIBUTE_VISUAL_UNWAVERING_POWER, true, 0, 1)
        }
      } else {
        BHB.UpdateAttributeVisuals(unitTag)
      }
      namedChild<LabelControl>(statusBar, "BossName").SetText(name)
      dbg(
        string.format(
          "%s (%s) value: %d max: %d effectiveMax: %d",
          name,
          unitTag,
          powerValue,
          powerMax,
          powerEffectiveMax
        )
      )
      onPowerUpdate(
        undefined,
        unitTag,
        undefined,
        undefined,
        powerValue,
        powerMax,
        powerEffectiveMax
      )
    } else {
      delete BOSS_HEALTHS[i]
      const statusBar = TemperCombatAlertsBossHealthBarContainer.GetNamedChild("Bar" + tostring(i))
      if (statusBar !== undefined) {
        statusBar.SetHidden(true)
      }
    }
  }

  if (highestTag === 0) {
    TemperCombatAlertsBossHealthBarContainer.SetWidth(36 * getScale())
  } else {
    TemperCombatAlertsBossHealthBarContainer.SetWidth(highestTag * 36 * getScale())
  }

  if (highestTag > 0) {
    if (!onlyReanchorStages) {
      if (showAllForMoving) {
        redrawStages("Example Boss 1")
        updateStagesWithBossHealth()
      } else {
        redrawStages()
      }
    }
  } else {
    hideAllStages()
  }
}
BHB.ShowOrHideBars = showOrHideBars

function onBossesChanged(this: void, boss1IsSame?: boolean): undefined {
  if (boss1IsSame) {
    showOrHideBars(false, true)
  } else {
    showOrHideBars()
  }
}
BHB.OnBossesChanged = onBossesChanged

BHB.UpdateScale = function (this: void, showAllForMoving) {
  TemperCombatAlertsBossHealthBarContainer.SetHeight(320 * getScale())
  onBossesChanged()
  showOrHideBars(showAllForMoving ?? true)
}

BHB.UpdateColors = function (this: void) {
  showOrHideBars(true)
  for (let i = 1; i <= BOSS_RANK_ITERATION_END; i++) {
    CRUTCH.SetBarColors(i, undefined, undefined)
  }
}

function updateRotation(this: void, showAllForMoving?: boolean): undefined {
  TemperCombatAlertsBossHealthBarContainer.SetTransformNormalizedOriginPoint(0, 0)
  if (CRUTCH.savedOptions.bossHealthBar.horizontal) {
    TemperCombatAlertsBossHealthBarContainer.SetTransformRotationZ(-math.pi / 2)
  } else {
    TemperCombatAlertsBossHealthBarContainer.SetTransformRotationZ(0)
  }
  if (showAllForMoving) {
    showOrHideBars(showAllForMoving)
  }
}
BHB.UpdateRotation = updateRotation

let bhbFragment: SceneFragment | undefined

function registerEvents(this: void): undefined {
  CRUTCH.RegisterBossChangedListener("CrutchBHBBossChange", onBossesChanged)
  BHB.RegisterThresholdsChangeListener("CrutchBHBThresholdsChange", onThresholdsChanged)

  EVENT_MANAGER.RegisterForEvent(
    "CrutchAlertsBossHealthBarPowerUpdate",
    EVENT_POWER_UPDATE,
    onPowerUpdate
  )
  EVENT_MANAGER.AddFilterForEvent(
    "CrutchAlertsBossHealthBarPowerUpdate",
    EVENT_POWER_UPDATE,
    REGISTER_FILTER_UNIT_TAG_PREFIX,
    "boss"
  )
  EVENT_MANAGER.AddFilterForEvent(
    "CrutchAlertsBossHealthBarPowerUpdate",
    EVENT_POWER_UPDATE,
    REGISTER_FILTER_POWER_TYPE,
    COMBAT_MECHANIC_FLAGS_HEALTH
  )
}

function unregisterEvents(this: void): undefined {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistering Boss Health Bar events")

  CRUTCH.UnregisterBossChangedListener("CrutchBHBBossChange")
  BHB.UnregisterThresholdsChangeListener("CrutchBHBThresholdsChange")

  EVENT_MANAGER.UnregisterForEvent("CrutchAlertsBossHealthBarPowerUpdate", EVENT_POWER_UPDATE)
}

BHB.Initialize = function (this: void) {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Initializing Boss Health Bar")
  const container = TemperCombatAlertsBossHealthBarContainer

  container.ClearAnchors()
  container.SetAnchor(
    TOPLEFT,
    GuiRoot,
    CENTER,
    CRUTCH.savedOptions.bossHealthBarDisplay.x,
    CRUTCH.savedOptions.bossHealthBarDisplay.y
  )
  updateRotation()

  if (bhbFragment === undefined) {
    bhbFragment = ZO_SimpleSceneFragment.New(container)
  }

  if (CRUTCH.savedOptions.bossHealthBar.enabled) {
    HUD_SCENE.AddFragment(bhbFragment)
    HUD_UI_SCENE.AddFragment(bhbFragment)
    registerEvents()
    BHB.RegisterVisualizers()
    onBossesChanged()
    showOrHideBars()
  } else {
    HUD_SCENE.RemoveFragment(bhbFragment)
    HUD_UI_SCENE.RemoveFragment(bhbFragment)
    unregisterEvents()
    BHB.UnregisterVisualizers()
  }
  container.SetHidden(!CRUTCH.savedOptions.bossHealthBar.enabled)
}
