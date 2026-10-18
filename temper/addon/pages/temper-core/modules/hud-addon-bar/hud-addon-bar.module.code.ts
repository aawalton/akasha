import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

import { createFieldRegistry } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-field-registry/hud-addon-field-registry.module.code.ts"
import { layoutCells } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-layout/hud-addon-layout.module.code.ts"
import type { HudField } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-types/hud-addon-types.module.code.ts"
import { paintOverPlay } from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import {
  colorOf,
  colorText,
  styleTextOverPlay,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import { spaceOf } from "akasha/temper/window/modules/window-spacing/window-spacing.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"

const HUD_CONTAINER_NAME = "TemperHudBar"
const HUD_BACKDROP_NAME = "TemperHudBarBackdrop"
const LABEL_NAME_PREFIX = "TemperHudField_"
const UPDATE_NAMESPACE = "TemperHudUpdate"
const UPDATE_INTERVAL_MS = 1000

const TOP_OFFSET_Y = 0
const BAR_HEIGHT = 30
const EDGE_PAD = 16
const COL_GAP = spaceOf("6")

const COLUMN_WIDTH = 56

const registry = createFieldRegistry()
const labels = new Map<string, LabelControl>()

let container: Control | undefined

function makeLabel(id: string): LabelControl {
  if (container === undefined) {
    throw new Error("Temper HUD label created before the bar was built")
  }
  const label = WINDOW_MANAGER.CreateControl(`${LABEL_NAME_PREFIX}${id}`, container, CT_LABEL)
  label.SetHorizontalAlignment(TEXT_ALIGN_RIGHT)
  return colorText(styleTextOverPlay(label, "number"), colorOf("muted"))
}

function reflow(): undefined {
  if (container === undefined) return
  const bar = container
  const placed: LabelControl[] = []
  for (const field of registry.list()) {
    const label = labels.get(field.id)
    if (label !== undefined) placed.push(label)
  }
  const spans = layoutCells(
    placed.map((label) => (label.GetText() === "" ? undefined : label.GetTextWidth())),
    { edgePad: EDGE_PAD, minWidth: COLUMN_WIDTH, gap: COL_GAP }
  )
  placed.forEach((label, index) => {
    const span = spans[index]
    label.ClearAnchors()
    if (span === undefined) {
      label.SetHidden(true)
      return
    }
    label.SetHidden(false)
    label.SetAnchor(RIGHT, bar, LEFT, span.left + span.width, 0)
  })
}

export function initializeHudBar(): undefined {
  if (container !== undefined) return

  const bar = WINDOW_MANAGER.CreateTopLevelWindow(HUD_CONTAINER_NAME)
  bar.SetAnchor(TOPLEFT, GuiRoot, TOPLEFT, 0, TOP_OFFSET_Y)
  bar.SetDimensions(GuiRoot.GetWidth(), BAR_HEIGHT)
  container = bar

  const backdrop = WINDOW_MANAGER.CreateControl(HUD_BACKDROP_NAME, bar, CT_BACKDROP)
  backdrop.SetAnchorFill(bar)
  paintOverPlay(backdrop)
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
  writeField(field)
  reflow()
}

function writeField(field: HudField): undefined {
  const label = labels.get(field.id)
  if (label === undefined) return
  const cell = field.compute()
  label.SetText(cell.text)
  if (cell.color === undefined) {
    colorText(label, colorOf("muted"))
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
  reflow()
}

export function isHudBarReady(): boolean {
  return container !== undefined
}
