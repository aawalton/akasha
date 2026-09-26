import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import {
  calculateGraveValues,
  coordsValues,
  formatDate,
  GRAVE_ELEMENTS,
  type GraveElement,
} from "akasha/temper/addon/pages/combat/combat-alerts-drawing/modules/grave-elements/combat-alerts-drawing-grave-elements.module.code.ts"
import { setRenderSpaceOrigin } from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-core/combat-alerts-drawing-core.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const M = CRUTCH.Drawing.Model

interface GraveControlData<T extends Control> {
  control: T
  targetX: number
  targetY: number
  targetZ: number
}

interface GraveKeys {
  rects: number[]
  labels: number[]
}

let genericTexturePool: ZoControlPool<TextureControl> | undefined
let genericLabelPool: ZoControlPool<LabelControl> | undefined
const RECT_CONTROLS: Record<number, GraveControlData<TextureControl>> = {}
const LABEL_CONTROLS: Record<number, GraveControlData<LabelControl>> = {}
const GRAVES: Record<string, GraveKeys> = {}
const ANIMATIONS: Record<string, number> = {}

const ANIMATION_DURATION = 1000
const ANIMATION_Y = 170
const ANIMATION_X_PERIOD = 100
const ANIMATION_X = 1.5

function updateAnimations(this: void): undefined {
  for (const [unitTag, targetTime] of pairs(ANIMATIONS)) {
    let timeUntilEnd = targetTime - GetGameTimeMilliseconds()
    if (timeUntilEnd < 0) {
      delete ANIMATIONS[unitTag]
      if (ZO_IsTableEmpty(ANIMATIONS)) {
        CRUTCH.dbgSpam("end animation " + unitTag)
        EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "GraveUpdate")
      }

      timeUntilEnd = 0
    }

    const progress = 1 - timeUntilEnd / ANIMATION_DURATION
    const yOffset = (1 - ZO_EaseOutCubic(progress)) * ANIMATION_Y
    const xOffset =
      math.sin(((ANIMATION_DURATION - timeUntilEnd) / ANIMATION_X_PERIOD) * math.pi * 2) *
      ANIMATION_X

    const keys = GRAVES[unitTag]
    if (keys === undefined) {
      return
    }

    for (const key of keys.rects) {
      const controlData = RECT_CONTROLS[key] as GraveControlData<TextureControl>
      setRenderSpaceOrigin(
        controlData.control,
        controlData.targetX + xOffset,
        controlData.targetY - yOffset,
        controlData.targetZ
      )
    }
    for (const key of keys.labels) {
      const controlData = LABEL_CONTROLS[key] as GraveControlData<LabelControl>
      setRenderSpaceOrigin(
        controlData.control,
        controlData.targetX + xOffset,
        controlData.targetY - yOffset,
        controlData.targetZ
      )
    }
  }
}

function pollIfNeeded(this: void): undefined {
  if (ZO_IsTableEmpty(ANIMATIONS)) {
    EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "GraveUpdate")
  } else {
    EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "GraveUpdate", 20, updateAnimations)
  }
}

function createRectRenderSpace(
  this: void,
  x: number,
  y: number,
  z: number,
  pitch: number,
  yaw: number,
  roll: number,
  width: number,
  height: number,
  color: readonly number[],
  texture: string | undefined
): LuaMultiReturn<[TextureControl, number]> {
  if (genericTexturePool === undefined) {
    genericTexturePool = ZO_ControlPool.New<TextureControl>(
      "TemperCombatAlertsModelTexture",
      TemperCombatAlertsDrawing
    )
  }

  const [control, key] = genericTexturePool.AcquireObject()
  RECT_CONTROLS[key] = { control, targetX: x, targetY: y, targetZ: z }

  control.SetHidden(false)
  control.Create3DRenderSpace()
  control.SetColor(color[0] as number, color[1] as number, color[2] as number, color[3])
  control.SetTexture(texture ?? "TemperCombat/assets/floor/square.dds")

  setRenderSpaceOrigin(control, x, y - ANIMATION_Y, z)

  control.Set3DLocalDimensions(width, height)
  control.Set3DRenderSpaceUsesDepthBuffer(true)

  control.Set3DRenderSpaceOrientation(pitch, yaw, roll)

  control.SetDesaturation(1)

  return $multi(control, key)
}

function createLabelRenderSpace(
  this: void,
  x: number,
  y: number,
  z: number,
  pitch: number,
  yaw: number,
  roll: number,
  color: readonly number[],
  text: string,
  fontSizeArg: number | undefined
): LuaMultiReturn<[LabelControl, number]> {
  if (genericLabelPool === undefined) {
    genericLabelPool = ZO_ControlPool.New<LabelControl>(
      "TemperCombatAlertsModelLabel",
      TemperCombatAlertsDrawing
    )
  }

  const [control, key] = genericLabelPool.AcquireObject()
  LABEL_CONTROLS[key] = { control, targetX: x, targetY: y, targetZ: z }

  control.SetHidden(false)
  control.Create3DRenderSpace()
  control.SetColor(color[0] as number, color[1] as number, color[2] as number, color[3])

  const fontSize = fontSizeArg ?? 20
  control.SetFont("$(STONE_TABLET_FONT)|" + fontSize)
  control.SetText(text)
  control.SetColor(0.1, 0.1, 0.1, 1)
  CRUTCH.dbgSpam(text + " - $(STONE_TABLET_FONT)|" + fontSize)

  control.SetScale(0.01)

  setRenderSpaceOrigin(control, x, y - ANIMATION_Y, z)
  control.Set3DRenderSpaceUsesDepthBuffer(true)

  control.Set3DRenderSpaceOrientation(pitch, yaw, roll)

  return $multi(control, key)
}

function removeGrave(this: void, unitTag: string): undefined {
  const data = GRAVES[unitTag]
  if (data === undefined) {
    return
  }

  for (const key of data.rects) {
    genericTexturePool?.ReleaseObject(key)
    delete RECT_CONTROLS[key]
  }
  for (const key of data.labels) {
    genericLabelPool?.ReleaseObject(key)
    delete LABEL_CONTROLS[key]
  }
  delete GRAVES[unitTag]
}
M.RemoveGrave = removeGrave

export function removeAllGraves(this: void): undefined {
  for (const [unitTag] of pairs(GRAVES)) {
    removeGrave(unitTag)
  }
}

const SCALE = 100
function createControlFromElement(
  this: void,
  element: GraveElement,
  graveKeys: GraveKeys,
  x: number,
  y: number,
  z: number,
  intro: string,
  name: string,
  birth: string,
  death: string,
  uiScale: number
): undefined {
  const [oX, oY, oZ, pitch, yaw, roll, width, height] = coordsValues(element.coords)
  if (element.texture !== undefined) {
    const [, key] = createRectRenderSpace(
      x + oX * SCALE,
      y + oY * SCALE,
      z + oZ * SCALE,
      pitch,
      yaw,
      roll,
      width,
      height,
      element.color,
      element.texture
    )
    graveKeys.rects.push(key)
  } else if (element.text !== undefined) {
    const scaledFontSize = math.floor((element.fontSize ?? 17) / uiScale)

    const text = zo_strformat(element.text, intro, name, birth, death)
    const [control, key] = createLabelRenderSpace(
      x + oX * SCALE,
      y + oY * SCALE,
      z + oZ * SCALE,
      pitch,
      yaw,
      roll,
      element.color,
      text,
      scaledFontSize
    )
    graveKeys.labels.push(key)

    let textWidth = control.GetTextWidth()

    const allowedTextWidth = 115 / uiScale

    if (textWidth > allowedTextWidth) {
      CRUTCH.dbgSpam(
        string.format(
          'adjusting font size for "%s" because textWidth %f and width %f',
          text,
          textWidth,
          width
        )
      )
      let newFontSize = scaledFontSize

      while (textWidth > allowedTextWidth && newFontSize > 0) {
        newFontSize = newFontSize - 1
        control.SetFont("$(STONE_TABLET_FONT)|" + newFontSize)
        textWidth = control.GetTextWidth()
        CRUTCH.dbgSpam("trying newFontSize " + newFontSize + " = " + textWidth)
      }

      CRUTCH.dbgSpam("newFontSize: " + newFontSize)
      control.SetFont("$(STONE_TABLET_FONT)|" + newFontSize)
      textWidth = control.GetTextWidth()
      CRUTCH.dbgSpam("new textWidth: " + textWidth)
    } else {
      CRUTCH.dbgSpam(
        string.format(
          'NOT adjusting font size for "%s" because textWidth %f and width %f',
          text,
          textWidth,
          width
        )
      )
    }

    const offset = (textWidth / 100 / 2) * uiScale
    const c = element.coords
    const [sX, sY, sZ] = calculateGraveValues(
      (c[0] as number) - offset,
      c[1] as number,
      c[2] as number,
      (c[3] as number) - offset,
      c[4] as number,
      c[5] as number,
      (c[6] as number) - offset,
      c[7] as number,
      c[8] as number
    )
    const newX = x + sX * SCALE
    const newY = y + sY * SCALE
    const newZ = z + sZ * SCALE
    const labelData = LABEL_CONTROLS[key] as GraveControlData<LabelControl>
    labelData.targetX = newX
    labelData.targetY = newY
    labelData.targetZ = newZ
    setRenderSpaceOrigin(control, newX, newY - ANIMATION_Y, newZ)
    CRUTCH.dbgSpam("^^^ " + control.GetName() + " ^^^")
  }
}

export function grave(
  this: void,
  unitTagArg?: string,
  introArg?: string,
  nameArg?: string,
  birthArg?: string,
  deathArg?: string
): undefined {
  const unitTag = unitTagArg ?? "player"
  const [, x, rawY, z] = GetUnitRawWorldPosition(unitTag)
  const y = rawY - 20
  const intro = introArg ?? "Here lies"
  const name = nameArg ?? "Kyzeragon"
  const birth = birthArg ?? "Unknown"
  const death = deathArg ?? formatDate(GetTimeStamp())

  removeGrave(unitTag)

  const graveKeys: GraveKeys = { rects: [], labels: [] }
  GRAVES[unitTag] = graveKeys

  const uiScale = GetUIGlobalScale()

  for (const element of GRAVE_ELEMENTS) {
    createControlFromElement(element, graveKeys, x, y, z, intro, name, birth, death, uiScale)
  }

  ANIMATIONS[unitTag] = GetGameTimeMilliseconds() + ANIMATION_DURATION
  pollIfNeeded()
}
M.Grave = grave
