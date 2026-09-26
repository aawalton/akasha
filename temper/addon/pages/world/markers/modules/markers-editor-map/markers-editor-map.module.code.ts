import { showDialogue } from "akasha/temper/addon/pages/world/markers/modules/markers-dialogs/markers-dialogs.module.code.ts"
import {
  EDITOR,
  type EditorImage,
  type EditorTiles,
  EMPTY_MARKER,
  editorChild,
  MAP_END_Y,
  MAP_START_Y,
} from "akasha/temper/addon/pages/world/markers/modules/markers-editor-state/markers-editor-state.module.code.ts"
import {
  markerFont,
  newMarkerPool,
} from "akasha/temper/addon/pages/world/markers/modules/markers-render/markers-render.module.code.ts"
import {
  type MarkerIcon,
  MM,
} from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import { drawnTexture } from "akasha/temper/addon/pages/world/markers/modules/markers-textures/markers-textures.module.code.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-4/eso-api-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-space/eso-space.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-4/eso-ui-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"

type MouseUp = (
  this: void,
  control: Control,
  button: number,
  upInside: boolean,
  ctrl: boolean,
  alt: boolean,
  shift: boolean,
  command: boolean,
  source?: string
) => void

const DRAG_TICK = "TemperWorldMarkersEditorImageUpdateTick"

let pool: ReturnType<typeof newMarkerPool> | undefined

function mousePosition(this: void, source: string | undefined): LuaMultiReturn<[number, number]> {
  if (EDITOR.cursorId !== undefined && source === "gamepadCursor") {
    return WINDOW_MANAGER.GetCursorPosition(EDITOR.cursorId)
  }
  return GetUIMousePosition()
}

function updateLastClick(this: void, source?: string): undefined {
  const image = EDITOR.image
  if (image === undefined) return undefined
  const [, , y] = GetUnitRawWorldPosition("player")
  const [mx, my] = mousePosition(source)
  const [l, t, r, b] = image.ProjectRectToScreenAndBuildAABB()
  const nx = (mx - l) / (r - l)
  const ny = (my - t) / (b - t)
  editorChild<EditControl>("lastX", "Edit")?.SetText(
    tostring(zo_floor(EDITOR.originX + nx * EDITOR.nxratio))
  )
  editorChild<EditControl>("playerY", "Edit")?.SetText(tostring(y))
  editorChild<EditControl>("lastZ", "Edit")?.SetText(
    tostring(zo_floor(EDITOR.originZ + ny * EDITOR.nzratio))
  )
  return undefined
}

function createPreview(this: void, icon: MarkerIcon): MarkerIcon {
  if (pool === undefined) return icon
  const [control, key] = pool.AcquireObject()
  control.SetHidden(false)
  control.SetSpace(SPACE_INTERFACE)
  control.SetScale((tonumber(icon.size) ?? 1) * 0.2)
  const bgLayer = control.GetNamedChild<TextureControl>("Background")
  control.bgLayer = bgLayer
  control.highlight = bgLayer?.GetNamedChild<BackdropControl>("Highlight")
  control.textLayer = bgLayer?.GetNamedChild<LabelControl>("Text")
  control.SetTransformNormalizedOriginPoint(0.5, 0.5)
  control.textLayer?.SetFont(markerFont())
  control.textLayer?.SetScale(4 * MM.vars.fontScale)
  icon.control = control
  icon.key = key
  if (icon.bgTexture !== undefined && bgLayer !== undefined) {
    bgLayer.SetHidden(false)
    bgLayer.SetTexture(drawnTexture(icon.bgTexture))
    bgLayer.SetColor(
      icon.colour[0] ?? 1,
      icon.colour[1] ?? 1,
      icon.colour[2] ?? 1,
      icon.colour[3] ?? 1
    )
  }
  control.textLayer?.SetHidden(false)
  control.textLayer?.SetText(icon.text)
  control.highlight?.SetHidden(true)
  control.SetMouseEnabled(true)
  const onMouseUp: MouseUp = (_clicked, button, upInside, _ctrl, _alt, shift, _command, source) => {
    if (button === MOUSE_BUTTON_INDEX_LEFT && upInside) {
      EDITOR.selectMarker?.(icon)
      if (shift) updateLastClick()
    } else if (button === MOUSE_BUTTON_INDEX_RIGHT && upInside) {
      const [x, y] = mousePosition(source)
      if (!shift) {
        showDialogue(
          "Creating Marker",
          "You are currently trying to create a marker on top of an existing marker. It may be hard to select one of the stacked markers.\n\nWould you like to continue?",
          "You can hold shift to avoid this popup.",
          () => EDITOR.createMarker?.(x, y)
        )
      } else {
        EDITOR.createMarker?.(x, y)
      }
    }
  }
  control.SetHandler("OnMouseUp", onMouseUp)
  return icon
}

function destroyPreview(this: void, icon: MarkerIcon): undefined {
  const control = icon.control
  if (control === undefined || pool === undefined || icon.key === undefined) return undefined
  control.SetHidden(true)
  control.ClearTransformRotation()
  control.bgLayer?.SetHidden(true)
  control.textLayer?.SetText("")
  control.textLayer?.SetHidden(true)
  control.highlight?.SetHidden(true)
  pool.ReleaseObject(icon.key)
  icon.control = undefined
  icon.key = undefined
  return undefined
}

export function destroyPreviews(this: void): undefined {
  for (const [, preview] of EDITOR.previews) destroyPreview(preview)
  EDITOR.previews = new LuaTable()
  return undefined
}

function pan(this: void, dataType?: string, customX?: number, customY?: number): undefined {
  const image = EDITOR.image
  const frame = EDITOR.frame
  if (image === undefined || frame === undefined) return undefined
  let deltaX = 0
  let deltaY = 0
  if (image.dragging === true) {
    const [x, y] = GetUIMousePosition()
    deltaX = x - (image.startX ?? x)
    deltaY = y - (image.startY ?? y)
  } else if (dataType === "customDelta") {
    deltaX = customX ?? 0
    deltaY = customY ?? 0
  }
  image.ClearAnchors()
  const maxAnchor = EDITOR.mapWidth * image.GetScale() - EDITOR.mapWidth
  image.SetAnchor(
    CENTER,
    frame,
    CENTER,
    zo_clamp((image.startOriginX ?? 0) + deltaX, -maxAnchor, maxAnchor),
    zo_clamp((image.startOriginY ?? 0) + deltaY, -maxAnchor, maxAnchor)
  )
  return undefined
}

export function rememberOrigin(this: void, image: EditorImage): undefined {
  const [, , , , originX, originY] = image.GetAnchor(0)
  image.startOriginX = originX
  image.startOriginY = originY
  return undefined
}

function changeScale(this: void, delta: number, dataType?: string): undefined {
  const image = EDITOR.image
  if (image === undefined) return undefined
  if (image.dragging !== true || dataType === "gamepadCursor") {
    if (dataType !== "gamepadCursor") {
      ;[image.startX, image.startY] = GetUIMousePosition()
    }
    rememberOrigin(image)
  }
  const globalScale = TemperWorldMarkerEditorToplevel.GetScale()
  const scale = zo_clamp(image.GetScale() + delta / 10, 1, 8)
  image.SetScale(scale)
  for (const [, preview] of EDITOR.previews) {
    const control = preview.control
    if (control === undefined) continue
    const size = tonumber(preview.size) ?? 1
    const markerScale = zo_clamp((size * 0.25) / scale, 0, 0.25 * size)
    control.SetScale(markerScale)
    control.ClearAnchors()
    const currentSize = 100 * markerScale
    const [x] = control.GetDimensions()
    control.SetAnchor(
      TOPLEFT,
      image,
      TOPLEFT,
      (preview.initialXAnchor ?? 0) - currentSize / 2,
      (preview.initialYAnchor ?? 0) - currentSize / 2
    )
    let scalingFactor = 1
    if (x < 25 * globalScale) scalingFactor = (25 * globalScale) / x
    if (x > 35 * globalScale) scalingFactor = (35 * globalScale) / x
    scalingFactor = scalingFactor / (control.textLayer?.GetNumLines() ?? 1)
    control.SetTransformScale(scalingFactor)
  }
  pan()
  return undefined
}

function stopDragging(this: void): undefined {
  const image = EDITOR.image
  if (image !== undefined) image.dragging = false
  EVENT_MANAGER.UnregisterForUpdate(DRAG_TICK)
  return undefined
}

const onImageMouseUp: MouseUp = (
  _clicked,
  button,
  upInside,
  _ctrl,
  _alt,
  _shift,
  _command,
  source
) => {
  if (EDITOR.image?.dragging === true) {
    stopDragging()
  } else if (button === MOUSE_BUTTON_INDEX_LEFT && upInside) {
    EDITOR.selectMarker?.(EMPTY_MARKER)
    updateLastClick(source)
  } else if (button === MOUSE_BUTTON_INDEX_RIGHT && upInside) {
    const [x, y] = mousePosition(source)
    EDITOR.createMarker?.(x, y)
  }
}

function layoutTiles(this: void, tiles: EditorTiles): undefined {
  const horizontal = tiles.horizontalTiles ?? 1
  const vertical = tiles.verticalTiles ?? 1
  const tileWidth = EDITOR.mapWidth / horizontal
  const tileHeight = EDITOR.mapHeight / vertical
  tiles.ReleaseAllObjects()
  for (let i = 1; i <= (tiles.totalTiles ?? 0); i++) {
    const tile = tiles.AcquireObject(i)
    tile.SetDimensions(tileWidth, tileHeight)
    tile.SetAnchor(
      TOPLEFT,
      tiles.parent,
      TOPLEFT,
      zo_mod(i - 1, horizontal) * tileWidth,
      zo_floor((i - 1) / horizontal) * tileHeight
    )
  }
  return undefined
}

function updateTextures(this: void, tiles: EditorTiles, mapId: number): undefined {
  const [horizontal, vertical] = GetMapNumTilesForMapId(mapId)
  tiles.horizontalTiles = horizontal
  tiles.verticalTiles = vertical
  tiles.totalTiles = horizontal * vertical
  layoutTiles(tiles)
  for (let i = 1; i <= tiles.totalTiles; i++) {
    tiles.GetActiveObject(i).SetTexture(GetMapTileTextureForMapId(mapId, i))
  }
  return undefined
}

function placePreviews(
  this: void,
  tiles: EditorTiles,
  image: EditorImage,
  mapId: number
): undefined {
  const [zone, px, py, pz] = GetUnitWorldPosition("player")
  tiles.cZone = zone
  for (const [i, marker] of EDITOR.zoneMarkers) {
    const [nx, ny] = GetNormalizedWorldPosition(zone, marker.x, marker.y, marker.z)
    const onMap = nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1
    const onFloor =
      marker.y <= (MAP_START_Y[mapId] ?? math.huge) && marker.y >= (MAP_END_Y[mapId] ?? 0)
    if (onMap && onFloor) {
      const preview = createPreview(marker)
      const control = preview.control
      if (control === undefined) continue
      const [imageWidth, imageHeight] = image.GetDimensions()
      const [markerWidth, markerHeight] = control.GetDimensions()
      preview.initialXAnchor = nx * imageWidth
      preview.initialYAnchor = ny * imageHeight
      control.SetAnchor(
        TOPLEFT,
        image,
        TOPLEFT,
        preview.initialXAnchor - markerWidth / 2,
        preview.initialYAnchor - markerHeight / 2
      )
      if (preview.orientation !== undefined)
        control.SetTransformRotationZ(preview.orientation[1] ?? 0)
      preview.index = i
      EDITOR.previews.set(i, preview)
    }
  }
  const offset = 2000
  const [pnx, pnz] = GetNormalizedWorldPosition(zone, px, py, pz)
  const [onx, onz] = GetNormalizedWorldPosition(zone, px + offset, py, pz + offset)
  EDITOR.nxratio = offset / (onx - pnx)
  EDITOR.nzratio = offset / (onz - pnz)
  EDITOR.originX = px - pnx * EDITOR.nxratio
  EDITOR.originZ = pz - pnz * EDITOR.nzratio
  return undefined
}

function setMapId(this: void, mapId: number, fromReload?: boolean): undefined {
  const tiles = EDITOR.tiles
  const image = EDITOR.image
  const frame = EDITOR.frame
  if (tiles === undefined || image === undefined || frame === undefined) return undefined
  tiles.mapid = mapId
  updateTextures(tiles, mapId)
  const preScale = image.GetScale()
  const [, point, relativeTo, relativePoint, offsetX, offsetY] = image.GetAnchor(0)
  image.SetScale(1)
  image.ClearAnchors()
  image.SetAnchor(CENTER, frame, CENTER, 0, 0)
  destroyPreviews()
  const currentMapId = GetCurrentMapId()
  SetMapToMapId(mapId)
  placePreviews(tiles, image, mapId)
  if (fromReload === true) {
    image.SetScale(preScale)
    image.SetAnchor(point, relativeTo, relativePoint, offsetX, offsetY)
  }
  changeScale(0)
  SetMapToMapId(currentMapId)
  const [name] = GetMapInfoById(mapId)
  TemperWorldMarkerEditorToplevelMapSelectorGamepadButton.SetText(
    string.format("%s (%d)", name, mapId)
  )
  EDITOR.selectMarker?.(EMPTY_MARKER)
  return undefined
}

export function initEditorMap(this: void, image: EditorImage, frame: BackdropControl): undefined {
  pool = newMarkerPool(image, "TemperWorldMarkerEditorPreview")
  frame.SetHandler("OnMouseWheel", (_self: Control, delta: number) => changeScale(delta))
  image.SetMouseEnabled(true)
  image.SetHandler("OnDragStart", () => {
    image.dragging = true
    ;[image.startX, image.startY] = GetUIMousePosition()
    rememberOrigin(image)
    EVENT_MANAGER.RegisterForUpdate(DRAG_TICK, 10, () => pan())
  })
  image.SetHandler("OnMouseUp", onImageMouseUp)
  EDITOR.tiles = ZO_WorldMapTiles_Manager.New(image)
  setMapId(2688)
  return undefined
}

EDITOR.setMapId = setMapId
EDITOR.reloadMap = () => {
  if (EDITOR.tiles?.mapid !== undefined) setMapId(EDITOR.tiles.mapid, true)
}
EDITOR.destroyPreviews = destroyPreviews
EDITOR.updateLastClick = updateLastClick
EDITOR.changeScale = changeScale
EDITOR.pan = pan
