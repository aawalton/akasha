import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-hud-manager/eso-hud-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

import {
  type HudLayoutPanel,
  hudLayout,
  type InputMode,
} from "akasha/temper/addon/pages/temper-core/modules/core-config/core-config.module.code.ts"
import {
  type HudDock,
  type HudPanelBox,
  type HudPoint,
  placeHudPanels,
} from "akasha/temper/addon/pages/temper-core/modules/hud-layout-place/hud-layout-place.module.code.ts"

const NAMESPACE = "TemperHudLayout"
const DEFAULT_GAP = 10
const TOP_BAR = "TemperHudBar"
const WATCHED_EVENTS = ["OnShow", "OnHide", "OnRectHeightChanged"]
const DOCKS: readonly HudDock[] = [
  "top-left",
  "top",
  "top-right",
  "left",
  "right",
  "bottom-left",
  "bottom",
  "bottom-right",
]

interface FittingPanel {
  readonly wanted: number
  readonly fit: (this: void, room: number) => undefined
}

interface Anchor {
  readonly point: number
  readonly relativeTo: Control | undefined
  readonly relativePoint: number
  readonly offsetX: number
  readonly offsetY: number
}

interface MovedPanel {
  readonly own: readonly Anchor[]
  readonly placed: Anchor
}

const ANCHOR_SLOTS = [0, 1]
const OFFSET_TOLERANCE = 0.01

const fitting = new Map<string, FittingPanel>()
const roomsGiven = new Map<string, number>()
const moved = new Map<string, MovedPanel>()
const watched = new Set<string>()
let pending = false

function inputMode(): InputMode {
  return IsInGamepadPreferredMode() ? "gamepad" : "keyboard"
}

function anchorsOf(control: Control): Anchor[] {
  const anchors: Anchor[] = []
  for (const slot of ANCHOR_SLOTS) {
    const [valid, point, relativeTo, relativePoint, offsetX, offsetY] = control.GetAnchor(slot)
    if (valid) anchors.push({ point, relativeTo, relativePoint, offsetX, offsetY })
  }
  return anchors
}

function holdsOnly(anchors: readonly Anchor[], placed: Anchor): boolean {
  const first = anchors[0]
  if (anchors.length !== 1 || first === undefined) return false
  return (
    first.point === placed.point &&
    first.relativeTo === placed.relativeTo &&
    first.relativePoint === placed.relativePoint &&
    Math.abs(first.offsetX - placed.offsetX) < OFFSET_TOLERANCE &&
    Math.abs(first.offsetY - placed.offsetY) < OFFSET_TOLERANCE
  )
}

function anchorPlaced(key: string, control: Control, placed: Anchor): undefined {
  const held = moved.get(key)
  const now = anchorsOf(control)
  const own = held !== undefined && holdsOnly(now, held.placed) ? held.own : now
  moved.set(key, { own, placed })
  control.ClearAnchors()
  control.SetAnchor(
    placed.point,
    placed.relativeTo,
    placed.relativePoint,
    placed.offsetX,
    placed.offsetY
  )
}

function releasePanel(key: string): undefined {
  const held = moved.get(key)
  if (held === undefined) return
  moved.delete(key)
  const control = GetControl(key)
  if (control !== undefined && holdsOnly(anchorsOf(control), held.placed)) {
    control.ClearAnchors()
    for (const one of held.own) {
      control.SetAnchor(one.point, one.relativeTo, one.relativePoint, one.offsetX, one.offsetY)
    }
  }
  const shrinking = fitting.get(key)
  if (shrinking === undefined || !roomsGiven.has(key)) return
  roomsGiven.delete(key)
  shrinking.fit(GuiRoot.GetHeight())
}

function anchorOf(point: HudPoint): number {
  if (point === "TOPLEFT") return TOPLEFT
  if (point === "TOP") return TOP
  if (point === "TOPRIGHT") return TOPRIGHT
  if (point === "BOTTOMLEFT") return BOTTOMLEFT
  if (point === "BOTTOM") return BOTTOM
  return BOTTOMRIGHT
}

function watch(key: string, control: Control): undefined {
  if (watched.has(key)) return
  watched.add(key)
  for (const event of WATCHED_EVENTS) control.SetHandler(event, schedulePlacing, NAMESPACE)
}

function heightOf(panel: HudLayoutPanel, control: Control): number {
  if (panel.measuredBy === undefined) return control.GetHeight()
  const measure = GetControl(panel.measuredBy)
  if (measure === undefined) return control.GetHeight()
  watch(panel.measuredBy, measure)
  const height = measure.GetHeight()
  if (control.GetHeight() !== height) control.SetHeight(height)
  return height
}

function boxOf(panel: HudLayoutPanel): HudPanelBox | undefined {
  const control = GetControl(panel.key)
  if (control === undefined) return undefined
  watch(panel.key, control)
  const height = heightOf(panel, control)
  const shrinking = fitting.get(panel.key)
  return {
    key: panel.key,
    dock: panel.dock,
    displayOrder: panel.displayOrder,
    top: control.GetTop(),
    height: shrinking?.wanted ?? height,
    hidden: control.IsHidden(),
    neverMoves: panel.neverMoves,
    shrinks: shrinking !== undefined,
  }
}

function roomTop(): number {
  const bar = GetControl(TOP_BAR)
  if (bar === undefined) return 0
  watch(TOP_BAR, bar)
  return bar.IsHidden() ? 0 : bar.GetBottom()
}

function placePanels(): undefined {
  pending = false
  const layout = hudLayout()
  if (layout === undefined) return
  const gaps = {} as Record<HudDock, number>
  for (const dock of DOCKS) gaps[dock] = layout.docks[dock]?.gap ?? DEFAULT_GAP
  const mode = inputMode()
  const boxes: HudPanelBox[] = []
  for (const panel of layout.panels) {
    if (!panel.inputModes.includes(mode)) {
      releasePanel(panel.key)
      continue
    }
    const box = boxOf(panel)
    if (box !== undefined) boxes.push(box)
  }
  const screen = { width: GuiRoot.GetWidth(), height: GuiRoot.GetHeight(), top: roomTop() }
  for (const place of placeHudPanels(screen, boxes, gaps)) {
    const control = GetControl(place.key)
    if (control === undefined) continue
    const point = anchorOf(place.point)
    anchorPlaced(place.key, control, {
      point,
      relativeTo: GuiRoot,
      relativePoint: point,
      offsetX: place.offsetX,
      offsetY: place.offsetY,
    })
    const shrinking = fitting.get(place.key)
    if (shrinking === undefined || roomsGiven.get(place.key) === place.room) continue
    roomsGiven.set(place.key, place.room)
    shrinking.fit(place.room)
  }
}

function schedulePlacing(this: void): undefined {
  if (pending) return
  pending = true
  EVENT_MANAGER.RegisterForUpdate(NAMESPACE, 0, function (this: void): undefined {
    EVENT_MANAGER.UnregisterForUpdate(NAMESPACE)
    placePanels()
  })
}

export function fitHudPanel(
  key: string,
  wanted: number,
  fit: (this: void, room: number) => undefined
): number | undefined {
  fitting.set(key, { wanted, fit })
  schedulePlacing()
  return roomsGiven.get(key)
}

export function initializeHudLayout(): undefined {
  HUD_MANAGER?.RegisterCallback("PropagateSettings", schedulePlacing)
  HUD_MANAGER?.RegisterCallback("OffsetsChanged", schedulePlacing)
  EVENT_MANAGER.RegisterForEvent(NAMESPACE, EVENT_PLAYER_ACTIVATED, function (this: void) {
    schedulePlacing()
  })
  schedulePlacing()
}
