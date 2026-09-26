import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    AddCarrionBarNotches: (this: void) => void
  }
  interface CrutchOsseinCage {
    RegisterCarrion: (this: void) => void
    UnregisterCarrion: (this: void) => void
  }
}

const BAR_MAX = 10

function addCarrionBarNotches(this: void): undefined {
  const width = TemperCombatAlertsCausticCarrion.GetWidth() / BAR_MAX
  for (const i of $range(0, BAR_MAX)) {
    const notch = WINDOW_MANAGER.CreateControl(
      "$(parent)Notch" + tostring(i),
      TemperCombatAlertsCausticCarrion,
      CT_BACKDROP
    ) as BackdropControl
    notch.SetEdgeColor(0, 0, 0, 0)
    notch.SetDrawLayer(2)

    if (i === 0) {
      notch.SetAnchor(TOPLEFT, TemperCombatAlertsCausticCarrion, TOPLEFT, width * i - 2, -4)
      notch.SetAnchor(BOTTOMRIGHT, TemperCombatAlertsCausticCarrion, BOTTOMLEFT, width * i - 1, 4)
      notch.SetCenterColor(0.9, 0.9, 0.9, 0.8)
    } else if (i === 5) {
      notch.SetAnchor(TOPLEFT, TemperCombatAlertsCausticCarrion, TOPLEFT, width * i - 1, -4)
      notch.SetAnchor(BOTTOMRIGHT, TemperCombatAlertsCausticCarrion, BOTTOMLEFT, width * i + 1, 4)
      notch.SetCenterColor(0.9, 0.9, 0.9, 0.8)
    } else if (i === BAR_MAX) {
      notch.SetAnchor(TOPLEFT, TemperCombatAlertsCausticCarrion, TOPLEFT, width * i, -4)
      notch.SetAnchor(BOTTOMRIGHT, TemperCombatAlertsCausticCarrion, BOTTOMLEFT, width * i + 2, 4)
      notch.SetCenterColor(0.9, 0.9, 0.9, 0.8)
    } else {
      if (i % 2 === 0) {
        notch.SetAnchor(TOPLEFT, TemperCombatAlertsCausticCarrion, TOPLEFT, width * i - 1, -4)
        notch.SetAnchor(BOTTOMRIGHT, TemperCombatAlertsCausticCarrion, BOTTOMLEFT, width * i, 4)
        notch.SetCenterColor(0.7, 0.7, 0.7, 0.8)
      } else {
        notch.SetAnchor(TOPLEFT, TemperCombatAlertsCausticCarrion, TOPLEFT, width * i - 1, 0)
        notch.SetAnchor(BOTTOMRIGHT, TemperCombatAlertsCausticCarrion, BOTTOMLEFT, width * i, 0)
        notch.SetCenterColor(0.7, 0.7, 0.7, 0.4)
      }
    }

    if (i % 2 === 0) {
      const label = WINDOW_MANAGER.CreateControl("$(parent)Label", notch, CT_LABEL) as LabelControl
      label.SetHorizontalAlignment(CENTER)
      label.SetAnchor(TOP, notch, BOTTOM, 0, 2)
      label.SetColor(0.8, 0.8, 0.8, 1)
      if (i < BAR_MAX) {
        label.SetText(tostring(i))
      } else {
        label.SetText(tostring(i) + "+")
      }
    }
  }
}
CRUTCH.AddCarrionBarNotches = addCarrionBarNotches

interface CarrionData {
  stacks: number
  tickTime: number
}

interface SortedCarrion {
  unitTag: string
  timeToTick: number
  stacks: number
}

const CARRION_STACKS: Record<string, CarrionData> = {}
let polling = false

function getSortedCarrion(this: void): SortedCarrion[] {
  const sorted: SortedCarrion[] = []
  for (const [tag, data] of pairs(CARRION_STACKS)) {
    let timeToTick = data.tickTime - (GetGameTimeMilliseconds() % 2000)
    if (timeToTick < 0) timeToTick = timeToTick + 2000
    table.insert(sorted, { unitTag: tag, timeToTick: timeToTick, stacks: data.stacks })
  }

  table.sort(sorted, (first, second) => {
    if (first.stacks === second.stacks) {
      return first.timeToTick < second.timeToTick
    }
    return first.stacks > second.stacks
  })
  return sorted
}

const REGULAR_THRESHOLDS: readonly [number, number] = [8, 7]
const TWINS_THRESHOLDS: readonly [number, number] = [5, 4]
let colorThresholds = REGULAR_THRESHOLDS

function updateCarrionDisplay(this: void): undefined {
  const sorted = getSortedCarrion()

  if (CRUTCH.savedOptions.osseincage.showCarrionIndividual) {
    let text = ""
    for (const data of sorted) {
      const name = GetUnitDisplayName(data.unitTag)
      if (name !== undefined) {
        text = string.format(
          "%s%s%s(%s) - %d stacks; %dms to tick",
          text,
          text === "" ? "" : "\n",
          name,
          data.unitTag,
          data.stacks,
          data.timeToTick
        )
      }
    }
    TemperCombatAlertsCausticCarrionText.SetText(text)
    TemperCombatAlertsCausticCarrionText.SetHidden(false)
  } else {
    TemperCombatAlertsCausticCarrionText.SetHidden(true)
  }

  const highest = sorted[0]
  if (highest !== undefined) {
    const progress = (2000 - highest.timeToTick) / 2000 + highest.stacks
    if (progress > colorThresholds[0]) {
      TemperCombatAlertsCausticCarrionBar.SetGradientColors(1, 0, 0, 1, 0.5, 0, 0, 1)
      TemperCombatAlertsCausticCarrionStacks.SetColor(1, 0, 0, 1)
    } else if (progress > colorThresholds[1]) {
      TemperCombatAlertsCausticCarrionBar.SetGradientColors(1, 1, 0, 1, 0.7, 0, 0, 1)
      TemperCombatAlertsCausticCarrionStacks.SetColor(1, 1, 0, 1)
    } else {
      ZO_StatusBar_SetGradientColor(TemperCombatAlertsCausticCarrionBar, ZO_XP_BAR_GRADIENT_COLORS)
      TemperCombatAlertsCausticCarrionStacks.SetColor(1, 1, 1, 1)
    }

    ZO_StatusBar_SmoothTransition(TemperCombatAlertsCausticCarrionBar, progress, BAR_MAX)
    TemperCombatAlertsCausticCarrionStacks.SetText(
      string.format("%.1f", math.floor(progress * 10) / 10)
    )
  } else {
    ZO_StatusBar_SmoothTransition(TemperCombatAlertsCausticCarrionBar, 0, BAR_MAX)
    TemperCombatAlertsCausticCarrionStacks.SetText("0")
    TemperCombatAlertsCausticCarrionStacks.SetColor(1, 1, 1, 1)
  }
}

function onCausticCarrion(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string,
  _beginTime: number,
  _endTime: number,
  stackCount: number,
  _iconName: string,
  _buffType: string,
  _effectType: number,
  _abilityType: number,
  _statusEffectType: number,
  _unitName: string,
  _unitId: number,
  abilityId: number
): undefined {
  if (abilityId === 241089) {
    colorThresholds = TWINS_THRESHOLDS
  } else {
    colorThresholds = REGULAR_THRESHOLDS
  }

  if (changeType === EFFECT_RESULT_FADED) {
    delete CARRION_STACKS[unitTag]

    if (polling) {
      const [remainingTag] = next(CARRION_STACKS)
      if (remainingTag !== undefined) {
        return
      }
      polling = false
      EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "CarrionPoll")
      updateCarrionDisplay()
    }
    return
  }
  const tickRemainder = GetGameTimeMilliseconds() % 2000
  CARRION_STACKS[unitTag] = { stacks: stackCount, tickTime: tickRemainder }

  if (!polling) {
    polling = true
    EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "CarrionPoll", 90, updateCarrionDisplay)
  }
}

interface CarrionStyle {
  thickFont: string
  individualFont: string
  notchFont: string
}

const KEYBOARD_STYLE: CarrionStyle = {
  thickFont: "$(BOLD_FONT)|20|soft-shadow-thick",
  individualFont: "ZoFontGame",
  notchFont: "ZoFontGameSmall",
}

const GAMEPAD_STYLE: CarrionStyle = {
  thickFont: "ZoFontGamepad27",
  individualFont: "ZoFontGamepad18",
  notchFont: "ZoFontGamepad18",
}

function applyStyle(this: void, style: CarrionStyle): undefined {
  TemperCombatAlertsCausticCarrionStacks.SetFont(style.thickFont)

  TemperCombatAlertsCausticCarrionTitle.SetFont(style.thickFont)
  TemperCombatAlertsCausticCarrionTitle.SetHeight(100)
  TemperCombatAlertsCausticCarrionTitle.SetHeight(
    TemperCombatAlertsCausticCarrionTitle.GetTextHeight()
  )

  TemperCombatAlertsCausticCarrionText.SetFont(style.individualFont)

  for (const i of $range(0, BAR_MAX)) {
    if (i % 2 === 0) {
      const label = TemperCombatAlertsCausticCarrion.GetNamedChild(
        "Notch" + tostring(i) + "Label"
      ) as LabelControl
      label.SetFont(style.notchFont)
    }
  }
}

let initialized = false
function initFont(this: void): undefined {
  if (initialized) return
  initialized = true

  ZO_PlatformStyle.New(applyStyle, KEYBOARD_STYLE, GAMEPAD_STYLE)
}

let carrionFragment: SceneFragment | undefined

CRUTCH.OsseinCage.RegisterCarrion = function (this: void) {
  initFont()

  CRUTCH.RegisterExitedGroupCombatListener("ExitedCombatCarrion", () => {
    ZO_ClearTable(CARRION_STACKS)
  })

  if (CRUTCH.savedOptions.osseincage.showCarrion) {
    if (carrionFragment === undefined) {
      carrionFragment = ZO_SimpleSceneFragment.New(TemperCombatAlertsCausticCarrion)
    }
    HUD_SCENE.AddFragment(carrionFragment)
    HUD_UI_SCENE.AddFragment(carrionFragment)

    CRUTCH.RegisterForEffectChanged("CausticCarrionRegular", onCausticCarrion, 240708, "group")
    CRUTCH.RegisterForEffectChanged("CausticCarrionBoss2", onCausticCarrion, 241089, "group")
  }
}

CRUTCH.OsseinCage.UnregisterCarrion = function (this: void) {
  CRUTCH.UnregisterExitedGroupCombatListener("ExitedCombatCarrion")
  if (carrionFragment !== undefined) {
    HUD_SCENE.RemoveFragment(carrionFragment)
    HUD_UI_SCENE.RemoveFragment(carrionFragment)
  }

  CRUTCH.UnregisterBossChangedListener("CrutchOsseinCage")

  CRUTCH.UnregisterForEffectChanged("CausticCarrionRegular")
  CRUTCH.UnregisterForEffectChanged("CausticCarrionBoss2")
}
