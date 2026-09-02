import { isShiftActive } from "@akasha/temper-combat-addon/combat-action-bar"
import { getBarSettings } from "@akasha/temper-combat-addon/combat-action-bar-settings"
import { onEngineUpdate } from "@akasha/temper-combat-addon/combat-action-engine-context"

const HUD_GAP = 5

const SHIFT_Y_BASE = -50

interface Rect {
  left: number
  top: number
  right: number
  bottom: number
}

interface HudInfo {
  point: number
  relativeTo: Control | undefined
  relativePoint: number
  offsetX: number
  offsetY: number
  bottom: number
  newRect?: Rect
}

interface HudEntry {
  name: string
  control: Control
}

const hudInfo = new Map<string, HudInfo>()
let NEW_RECT_READY = false
let SHIFTED = false

function moveUp(movingRect: Rect, rect: Rect, gap: number): number {
  if (movingRect.left > rect.right || movingRect.right < rect.left) {
    return 0
  }
  if (movingRect.bottom + gap < rect.top || movingRect.top - gap > rect.bottom) {
    return 0
  }
  const delta = rect.top - gap - movingRect.bottom
  movingRect.top = movingRect.top + delta
  movingRect.bottom = movingRect.bottom + delta
  return delta
}

function computeNewOffsetY(
  rectList: readonly Rect[],
  info: HudInfo,
  hud: Control,
  gap: number
): { hudRect: Rect; offsetY: number; bottom: number } {
  const hudRect: Rect = {
    left: hud.GetLeft(),
    right: hud.GetRight(),
    top: hud.GetTop(),
    bottom: hud.GetBottom(),
  }
  let delta = 0
  for (const rect of rectList) {
    delta = delta + moveUp(hudRect, rect, gap)
  }
  return { hudRect, offsetY: info.offsetY + delta, bottom: info.bottom + delta }
}

function getHudTable(): readonly HudEntry[] {
  return [
    { name: "hb", control: ZO_PlayerAttributeHealth },
    { name: "mb", control: ZO_PlayerAttributeMagicka },
    { name: "sb", control: ZO_PlayerAttributeStamina },
    { name: "bb", control: ZO_BuffDebuffTopLevelSelfContainer },
  ]
}

function recordOriginalInfo(hudTable: readonly HudEntry[]): undefined {
  for (const entry of hudTable) {
    if (hudInfo.get(entry.name) === undefined) {
      const [, point, relativeTo, relativePoint, offsetX, offsetY] = entry.control.GetAnchor(0)
      hudInfo.set(entry.name, {
        point,
        relativeTo,
        relativePoint,
        offsetX,
        offsetY,
        bottom: entry.control.GetBottom(),
      })
    }
  }
  return undefined
}

function computeNewRects(hudTable: readonly HudEntry[], gap: number): undefined {
  if (NEW_RECT_READY) {
    return undefined
  }
  const settings = getBarSettings()
  const slot3Btn = ZO_ActionBar_GetButton(3)
  const slot7Btn = ZO_ActionBar_GetButton(7)
  if (slot3Btn === undefined || slot7Btn === undefined) {
    return undefined
  }
  const slot3 = slot3Btn.slot
  const slot7 = slot7Btn.slot
  const shiftY = SHIFT_Y_BASE - gap
  const offsetX = settings.barShiftOffsetX
  const offsetY = settings.barShiftOffsetY
  const rectList: Rect[] = [
    {
      top: slot3.GetTop() + shiftY + offsetY,
      bottom: slot3.GetBottom() + shiftY + offsetY,
      left: slot3.GetLeft() + offsetX,
      right: slot7.GetRight() + offsetX,
    },
  ]

  const ordered = [...hudTable].sort((a: HudEntry, b: HudEntry) => {
    const ba = a.control.GetBottom()
    const bb = b.control.GetBottom()
    if (ba > bb) {
      return -1
    }
    if (ba < bb) {
      return 1
    }
    return 0
  })
  for (const entry of ordered) {
    const info = hudInfo.get(entry.name)
    if (info === undefined) {
      continue
    }
    const { hudRect } = computeNewOffsetY(rectList, info, entry.control, gap)
    rectList.push(hudRect)
    info.newRect = hudRect
  }
  NEW_RECT_READY = true
  return undefined
}

function applyAnchors(hudTable: readonly HudEntry[], shiftBarVisible: boolean): undefined {
  for (const entry of hudTable) {
    const info = hudInfo.get(entry.name)
    if (info === undefined) {
      continue
    }
    const target = shiftBarVisible && info.newRect !== undefined ? info.newRect.bottom : info.bottom
    if (target !== entry.control.GetBottom()) {
      entry.control.ClearAnchors()
      if (shiftBarVisible && info.newRect !== undefined) {
        entry.control.SetAnchor(TOPLEFT, GuiRoot, TOPLEFT, info.newRect.left, info.newRect.top)
        entry.control.SetAnchor(
          BOTTOMRIGHT,
          GuiRoot,
          TOPLEFT,
          info.newRect.right,
          info.newRect.bottom
        )
      } else {
        entry.control.SetAnchor(
          info.point,
          info.relativeTo,
          info.relativePoint,
          info.offsetX,
          info.offsetY
        )
      }
    }
  }
  return undefined
}

function onPatchUpdate(this: void, _now: number): undefined {
  const settings = getBarSettings()
  if (!settings.patchMoveBarsEnabled) {
    return undefined
  }
  const shiftBarVisible = settings.barShowShift && isShiftActive()

  if (!shiftBarVisible && !SHIFTED) {
    return undefined
  }
  if (shiftBarVisible && SHIFTED) {
    return undefined
  }

  const hudTable = getHudTable()
  recordOriginalInfo(hudTable)
  computeNewRects(hudTable, HUD_GAP)
  applyAnchors(hudTable, shiftBarVisible)

  SHIFTED = shiftBarVisible
  if (!shiftBarVisible) {
    hudInfo.clear()
    NEW_RECT_READY = false
  }
  return undefined
}

export function registerPatch(this: void): undefined {
  const settings = getBarSettings()
  if (!settings.patchMoveBarsEnabled) {
    return undefined
  }
  onEngineUpdate(onPatchUpdate)
  return undefined
}
