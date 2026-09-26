import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import {
  CRUTCH,
  type CrutchStyle,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchInfoPanel {
    SetLine: (this: void, index: number, text: string, scale?: number, alpha?: number) => void
    RemoveLine: (this: void, index: number) => void
  }
}

interface InfoPanelLine {
  label: LabelControl
  active: boolean
  scale: number
}

const IP = CRUTCH.InfoPanel

const LINES: Record<number, InfoPanelLine> = {}

function createLabel(this: void, index: number, scale: number, alpha: number): LabelControl {
  const label = CreateControlFromVirtual<LabelControl>(
    "$(parent)Line" + index,
    TemperCombatAlertsInfoPanel,
    "TemperCombatAlertsInfoPanelLineTemplate",
    ""
  )
  label.SetFont(CRUTCH.GetStyles().GetInfoPanelFont(CRUTCH.savedOptions.infoPanel.size * scale))
  label.SetAlpha(alpha)
  LINES[index] = { label: label, active: true, scale: scale }
  return label
}

function updateAnchors(this: void): undefined {
  const keys: number[] = []
  for (const [index] of pairs(LINES)) {
    table.insert(keys, index)
  }
  table.sort(keys)

  let prevRelative: Control = TemperCombatAlertsInfoPanel
  let prevRelativeAnchor = TOPLEFT
  let numActiveLines = 0
  let totalHeight = 0
  for (const index of keys) {
    const line = LINES[index]
    if (line?.active) {
      const label = line.label
      label.ClearAnchors()
      label.SetAnchor(TOPLEFT, prevRelative, prevRelativeAnchor)
      prevRelative = label
      prevRelativeAnchor = BOTTOMLEFT
      numActiveLines = numActiveLines + 1
      totalHeight = totalHeight + label.GetTextHeight()
    }
  }

  TemperCombatAlertsInfoPanel.SetHeight(totalHeight)
}

IP.SetLine = function (this: void, index, text, scale, alpha) {
  const line = LINES[index]
  const lineScale = scale ?? 1
  const lineAlpha = alpha ?? 1

  if (line === undefined) {
    const label = createLabel(index, lineScale, lineAlpha)
    label.SetText(text)
    updateAnchors()
  } else if (!line.active) {
    line.active = true
    line.scale = lineScale
    line.label.SetFont(
      CRUTCH.GetStyles().GetInfoPanelFont(CRUTCH.savedOptions.infoPanel.size * lineScale)
    )
    line.label.SetAlpha(lineAlpha)
    line.label.SetText(text)
    line.label.SetHidden(false)
    updateAnchors()
  } else {
    line.label.SetAlpha(lineAlpha)
    line.label.SetText(text)
  }
}

IP.RemoveLine = function (this: void, index) {
  const line = LINES[index]
  if (line !== undefined) {
    line.label.SetHidden(true)
    line.label.SetText("")
    line.active = false
    updateAnchors()
  }
}

let currentStyle: CrutchStyle | undefined

function applyStyle(this: void, style?: CrutchStyle): undefined {
  if (style === undefined) {
    style = currentStyle
  } else {
    currentStyle = style
  }

  for (const [, line] of pairs(LINES)) {
    line.label.SetFont(
      (style as CrutchStyle).GetInfoPanelFont(CRUTCH.savedOptions.infoPanel.size * line.scale)
    )
  }
  updateAnchors()
}

IP.ApplyStyle = applyStyle

CRUTCH.InitializeInfoPanel = function (this: void) {
  const infoPanelFragment = ZO_SimpleSceneFragment.New(TemperCombatAlertsInfoPanel)
  HUD_SCENE.AddFragment(infoPanelFragment)
  HUD_UI_SCENE.AddFragment(infoPanelFragment)
}
