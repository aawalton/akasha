import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-ui"

import { TEXT_SECONDARY } from "@akasha/design-tokens/text-color"
import { createFieldRegistry } from "../hud-addon-field-registry/hud-addon-field-registry.module.code.ts"
import type { HudField } from "../hud-addon-types/hud-addon-types.module.code.ts"

const HUD_CONTAINER_NAME = "TemperHudBar"
const HUD_BACKDROP_NAME = "TemperHudBarBackdrop"
const LABEL_NAME_PREFIX = "TemperHudField_"
const UPDATE_NAMESPACE = "TemperHudUpdate"
const UPDATE_INTERVAL_MS = 1000

const TOP_OFFSET_Y = 0
const BAR_HEIGHT = 30
const EDGE_PAD = 16
const COL_GAP = 28

const COLUMN_WIDTH = 40

const BACKDROP_ALPHA = 0.6

const registry = createFieldRegistry()
const labels = new Map<string, LabelControl>()

let container: Control | undefined

function makeLabel(id: string): LabelControl {
  if (container === undefined) {
    throw new Error("TemperHud label created before the bar was built")
  }
  const label = WINDOW_MANAGER.CreateControl(`${LABEL_NAME_PREFIX}${id}`, container, CT_LABEL)
  label.SetFont("ZoFontWinT2")
  label.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)
  return label
}

function reflow(): undefined {
  if (container === undefined) return
  let index = 0
  for (const field of registry.list()) {
    const label = labels.get(field.id)
    if (label === undefined) continue
    label.ClearAnchors()
    const rightEdge = EDGE_PAD + COLUMN_WIDTH + index * (COLUMN_WIDTH + COL_GAP)
    label.SetAnchor(RIGHT, container, LEFT, rightEdge, 0)
    index += 1
  }
}

export function initializeHudBar(): undefined {
  if (container !== undefined) return

  const bar = WINDOW_MANAGER.CreateTopLevelWindow(HUD_CONTAINER_NAME)
  bar.SetAnchor(TOPLEFT, GuiRoot, TOPLEFT, 0, TOP_OFFSET_Y)
  bar.SetDimensions(GuiRoot.GetWidth(), BAR_HEIGHT)
  container = bar

  const backdrop = WINDOW_MANAGER.CreateControl(HUD_BACKDROP_NAME, bar, CT_BACKDROP)
  backdrop.SetAnchorFill(bar)
  backdrop.SetCenterColor(0, 0, 0, BACKDROP_ALPHA)
  backdrop.SetEdgeColor(0, 0, 0, 0)
  backdrop.SetDrawLayer(DL_BACKGROUND)

  EVENT_MANAGER.RegisterForUpdate(
    UPDATE_NAMESPACE,
    UPDATE_INTERVAL_MS,
    function (this: void): undefined {
      refreshHudBar()
    }
  )
}

export function registerHudField(field: HudField): undefined {
  registry.register(field)
  if (container !== undefined && !labels.has(field.id)) {
    labels.set(field.id, makeLabel(field.id))
  }
  reflow()
  writeField(field)
}

function writeField(field: HudField): undefined {
  const label = labels.get(field.id)
  if (label === undefined) return
  const cell = field.compute()
  label.SetText(cell.text)
  if (cell.color === undefined) {
    label.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)
  } else {
    const [red, green, blue] = cell.color
    label.SetColor(red, green, blue, 1)
  }
  label.SetAlpha(cell.alpha ?? 1)
}

export function refreshHudBar(): undefined {
  for (const field of registry.list()) {
    writeField(field)
  }
}

export function isHudBarReady(): boolean {
  return container !== undefined
}
