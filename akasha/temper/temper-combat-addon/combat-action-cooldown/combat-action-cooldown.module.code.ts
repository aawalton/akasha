import { cooldownGeometry, scaleCooldown } from "@akasha/temper-combat-addon/combat-action-display"
import type { BarSettings } from "@akasha/temper-combat-addon/combat-actions-saved-variables"

const REDRAW_INTERVAL_MS = 40

const SHRINK = 1

export interface Cooldown {
  readonly parent: Control
  readonly topLeft: TextureControl
  readonly topRight: TextureControl
  readonly right: TextureControl
  readonly bottom: TextureControl
  readonly left: TextureControl
  readonly all: readonly TextureControl[]
  endTime: number
  duration: number
  noEnding: boolean
  hidden: boolean
  gen: number
}

function createPart(parent: Control, settings: BarSettings): TextureControl {
  const part = WINDOW_MANAGER.CreateControl(undefined, parent, CT_TEXTURE)
  part.SetDrawLevel(1)
  const color = settings.barCooldownColor
  part.SetColor(color[0], color[1], color[2], color[3])
  if (settings.barCooldownOpacity < 100) {
    part.SetAlpha(settings.barCooldownOpacity / 100)
  }
  part.SetHidden(true)
  return part
}

export function newCooldown(parent: Control, settings: BarSettings): Cooldown {
  const topLeft = createPart(parent, settings)
  const topRight = createPart(parent, settings)
  const right = createPart(parent, settings)
  const bottom = createPart(parent, settings)
  const left = createPart(parent, settings)
  return {
    parent,
    topLeft,
    topRight,
    right,
    bottom,
    left,
    all: [topLeft, left, bottom, right, topRight],
    endTime: 0,
    duration: 0,
    noEnding: false,
    hidden: false,
    gen: 0,
  }
}

function updateColor(cd: Cooldown, ending: boolean, settings: BarSettings): undefined {
  const color = ending ? settings.barCooldownEndingColor : settings.barCooldownColor
  const alpha = settings.barCooldownOpacity / 100
  for (const part of cd.all) {
    part.SetColor(color[0], color[1], color[2], color[3])
    part.SetAlpha(alpha)
  }
  return undefined
}

function hideAll(cd: Cooldown): undefined {
  for (const part of cd.all) {
    part.SetHidden(true)
  }
  return undefined
}

function cooldownDraw(cd: Cooldown, remainMs: number, settings: BarSettings): undefined {
  if (!settings.barCooldownVisible || cd.duration === 0 || cd.hidden || remainMs <= 0) {
    return hideAll(cd)
  }
  const thickness = settings.barCooldownThickness
  const [rawWidth, rawHeight] = cd.parent.GetDimensions()
  const width = rawWidth - thickness - 2 * SHRINK
  const height = rawHeight - thickness - 2 * SHRINK
  const half = width / 2
  const g = cooldownGeometry(remainMs, cd.duration)

  applySegment(
    cd.topLeft,
    g.topLeft,
    half * g.topLeft,
    thickness,
    TOPRIGHT,
    cd.parent,
    TOP,
    0,
    SHRINK
  )
  applySegment(
    cd.left,
    g.left,
    thickness,
    height * g.left,
    TOPLEFT,
    cd.parent,
    TOPLEFT,
    SHRINK,
    SHRINK
  )
  applySegment(
    cd.bottom,
    g.bottom,
    width * g.bottom,
    thickness,
    BOTTOMLEFT,
    cd.parent,
    BOTTOMLEFT,
    SHRINK,
    -SHRINK
  )
  applySegment(
    cd.right,
    g.right,
    thickness,
    height * g.right,
    BOTTOMRIGHT,
    cd.parent,
    BOTTOMRIGHT,
    -SHRINK,
    -SHRINK
  )
  applySegment(
    cd.topRight,
    g.topRight,
    half * g.topRight,
    thickness,
    TOPRIGHT,
    cd.parent,
    TOPRIGHT,
    -SHRINK,
    SHRINK
  )

  const ending = !cd.noEnding && remainMs < settings.barCooldownEndingSeconds * 1000
  return updateColor(cd, ending, settings)
}

function applySegment(
  part: TextureControl,
  fraction: number,
  pixelWidth: number,
  pixelHeight: number,
  point: number,
  relativeTo: Control,
  relativePoint: number,
  offsetX: number,
  offsetY: number
): undefined {
  if (fraction <= 0) {
    part.SetHidden(true)
    return undefined
  }
  part.SetAnchor(point, relativeTo, relativePoint, offsetX, offsetY)
  part.SetDimensions(pixelWidth, pixelHeight)
  part.SetHidden(false)
  return undefined
}

function animationFrame(cd: Cooldown, capturedGen: number, settings: BarSettings): undefined {
  if (cd.gen !== capturedGen) return undefined
  const remain = cd.endTime - GetGameTimeMilliseconds()
  cooldownDraw(cd, remain, settings)
  if (!cd.hidden && remain > 0) {
    zo_callLater(function scheduleFrame(this: void): undefined {
      return animationFrame(cd, capturedGen, settings)
    }, REDRAW_INTERVAL_MS)
  }
  return undefined
}

export function cooldownStart(
  cd: Cooldown,
  remainMs: number,
  durationMs: number,
  noEnding: boolean,
  settings: BarSettings
): undefined {
  const scaled = scaleCooldown(remainMs, durationMs)
  cd.endTime = GetGameTimeMilliseconds() + scaled.remain
  cd.duration = scaled.duration
  cd.hidden = false
  cd.noEnding = noEnding
  cd.gen = cd.gen + 1
  animationFrame(cd, cd.gen, settings)
  return undefined
}

export function cooldownHide(cd: Cooldown): undefined {
  cd.hidden = true
  cd.gen = cd.gen + 1
  return hideAll(cd)
}
