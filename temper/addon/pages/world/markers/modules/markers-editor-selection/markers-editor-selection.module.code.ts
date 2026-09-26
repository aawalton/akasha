import {
  compressLoaded,
  decompressString,
  saveIcons,
} from "akasha/temper/addon/pages/world/markers/modules/markers-codec/markers-codec.module.code.ts"
import {
  showDialogue,
  showNotice,
} from "akasha/temper/addon/pages/world/markers/modules/markers-dialogs/markers-dialogs.module.code.ts"
import {
  EDITOR,
  EMPTY_MARKER,
  editorChild,
  MAP_FLOORS,
} from "akasha/temper/addon/pages/world/markers/modules/markers-editor-state/markers-editor-state.module.code.ts"
import { unloadEverything } from "akasha/temper/addon/pages/world/markers/modules/markers-render/markers-render.module.code.ts"
import {
  type MarkerIcon,
  MM,
} from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-4/eso-api-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-space/eso-space.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-4/eso-ui-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"

const DESTRUCTIVE = "Warning: Destructive Action"
const CANNOT_UNDO = "This is a destructive action and cannot be undone."

function field(
  this: void,
  name: string
): LuaMultiReturn<[EditControl | undefined, LabelControl | undefined]> {
  return $multi(editorChild<EditControl>(name, "Edit"), editorChild<LabelControl>(name, "Text"))
}

function tint(this: void, name: string, bad: boolean): undefined {
  const [edit, label] = field(name)
  const g = bad ? 0 : 1
  edit?.SetColor(1, g, g)
  label?.SetColor(1, g, g)
  return undefined
}

function textOf(this: void, value: unknown): string {
  return value === undefined ? "" : tostring(value)
}

function selectMarker(this: void, given: MarkerIcon | undefined): undefined {
  let marker = given ?? EMPTY_MARKER
  if (EDITOR.previews.get(marker.index ?? 0) === undefined) marker = EMPTY_MARKER
  EDITOR.zoneMarkers.get(EDITOR.selectedMarker)?.control?.highlight?.SetHidden(true)
  const index = marker.index ?? 0
  EDITOR.selectedMarker = index
  marker.control?.highlight?.SetHidden(false)
  const empty = index === 0

  editorChild<LabelControl>("MarkerDetails", "Text")?.SetText(
    string.format("Selected Marker: %d", index)
  )
  editorChild<EditControl>("MarkerSize", "Edit")?.SetText(empty ? "" : textOf(marker.size))
  editorChild<EditControl>("TextureSelector", "Texture", "Edit")?.SetText(
    empty ? "" : (marker.bgTexture ?? "")
  )
  const orientation = marker.orientation
  editorChild<EditControl>("Pitch", "Edit")?.SetText(
    orientation === undefined ? "" : string.format("%.1f", zo_deg(orientation[0] ?? 0))
  )
  editorChild<EditControl>("Yaw", "Edit")?.SetText(
    orientation === undefined ? "" : string.format("%.1f", zo_deg(orientation[1] ?? 0))
  )
  editorChild<EditControl>("X", "Edit")?.SetText(empty ? "" : textOf(marker.x))
  editorChild<EditControl>("Y", "Edit")?.SetText(empty ? "" : textOf(marker.y))
  editorChild<EditControl>("Z", "Edit")?.SetText(empty ? "" : textOf(marker.z))
  editorChild<EditControl>("TextEditor")?.SetText(empty ? "" : marker.text)

  if (!empty) {
    tint("Y", marker.y === 0)
    const nx = (marker.x - EDITOR.originX) / EDITOR.nxratio
    const nz = (marker.z - EDITOR.originZ) / EDITOR.nzratio
    tint("X", nx > 1 || nx < 0)
    tint("Z", nz > 1 || nz < 0)
  } else {
    tint("X", false)
    tint("Y", false)
    tint("Z", false)
  }

  const colour = marker.colour
  editorChild<EditControl>("ColourSelector", "ColourHex", "Edit")?.SetText(
    empty
      ? ""
      : ZO_ColorDef.FloatsToHex(colour[0] ?? 1, colour[1] ?? 1, colour[2] ?? 1, colour[3] ?? 1)
  )
  return undefined
}

export function reselectCurrentMarker(this: void): undefined {
  selectMarker(EDITOR.zoneMarkers.get(EDITOR.selectedMarker))
  return undefined
}

export function editorApplyPressed(this: void): undefined {
  if (EDITOR.selectedMarker === 0) return undefined
  const marker = EDITOR.zoneMarkers.get(EDITOR.selectedMarker)
  if (marker === undefined) return undefined
  const selections = EDITOR.selections
  const x = tonumber(selections["x"])
  const y = tonumber(selections["y"])
  const z = tonumber(selections["z"])
  if (x !== undefined) marker.x = x
  if (y !== undefined) marker.y = y
  if (z !== undefined) marker.z = z
  const text = selections["text"]
  if (text !== undefined) marker.text = text
  const size = selections["markersize"]
  if (size !== undefined) marker.size = size
  const hex = selections["colour"] ?? ""
  const [r, g, b, a] = ZO_ColorDef.HexToFloats(hex)
  if (r !== undefined) {
    marker.colourHex = hex
    marker.colour = [r, g ?? 1, b ?? 1, a ?? 1]
  }
  const texture = selections["texture"]
  if (texture !== undefined && texture !== "") marker.bgTexture = texture
  const yaw = tonumber(selections["yaw"])
  const pitch = tonumber(selections["pitch"])
  marker.orientation =
    pitch !== undefined || yaw !== undefined ? [zo_rad(pitch ?? 0), zo_rad(yaw ?? 0)] : undefined
  EDITOR.reloadMap?.()
  selectMarker(marker)
  return undefined
}

function deleteSelectedMarker(this: void): undefined {
  if (EDITOR.selectedMarker === 0) return undefined
  if (EDITOR.zoneMarkers.get(EDITOR.selectedMarker) !== undefined) {
    EDITOR.zoneMarkers.delete(EDITOR.selectedMarker)
    EDITOR.reloadMap?.()
  }
  return undefined
}

export function deleteMarkerPressed(this: void): undefined {
  if (EDITOR.selectedMarker === 0) return undefined
  showDialogue(
    DESTRUCTIVE,
    string.format(
      "Are you sure you would like to remove the selected marker %d?",
      EDITOR.selectedMarker
    ),
    CANNOT_UNDO,
    deleteSelectedMarker
  )
  return undefined
}

function sameMarker(this: void, v: MarkerIcon, k: MarkerIcon): boolean {
  return (
    v.x === k.x &&
    v.y === k.y &&
    v.z === k.z &&
    v.text === k.text &&
    v.size === k.size &&
    v.colourHex === k.colourHex &&
    v.bgTexture === k.bgTexture
  )
}

export function deleteAllDuplicates(this: void): undefined {
  let count = 0
  for (const [i, v] of EDITOR.zoneMarkers) {
    for (const [j, k] of EDITOR.zoneMarkers) {
      if (i !== j && sameMarker(v, k)) {
        EDITOR.zoneMarkers.delete(j)
        count += 1
      }
    }
  }
  if (count !== 0) {
    showNotice("Notice", string.format("%d duplicate markers were found and deleted.", count), "")
  } else {
    showNotice("Notice", "No duplicate markers were found.", "")
  }
  EDITOR.reloadMap?.()
  return undefined
}

function createMarker(this: void, x: number, y: number): undefined {
  const image = EDITOR.image
  const tiles = EDITOR.tiles
  if (image === undefined || tiles === undefined) return undefined
  const [l, t, r, b] = image.ProjectRectToScreenAndBuildAABB()
  const nx = (x - l) / (r - l)
  const ny = (y - t) / (b - t)
  let [, , py] = GetUnitRawWorldPosition("player")
  const floor = MAP_FLOORS[tiles.mapid ?? 0]
  if (floor !== undefined) {
    py = floor
    showNotice(
      "Notice",
      "Due to how ESO handles Falgravn's Room in Kynes Aegis, markers placed with the editor will be offset by a certain distance and may not show up in game unless manually corrected.",
      ""
    )
  }
  const marker: MarkerIcon = {
    bgTexture: "M0RMarkers/textures/diamond.dds",
    colour: [1, 1, 1, 1],
    colourHex: "ffffff",
    size: 1,
    text: "",
    x: zo_floor(EDITOR.originX + nx * EDITOR.nxratio),
    y: py,
    z: zo_floor(EDITOR.originZ + ny * EDITOR.nzratio),
  }
  EDITOR.zoneMarkers.set(EDITOR.zoneMarkers.length() + 1, marker)
  EDITOR.reloadMap?.()
  selectMarker(marker)
  return undefined
}

function saveProfile(this: void): undefined {
  unloadEverything()
  EDITOR.destroyPreviews?.()
  for (const [, marker] of EDITOR.zoneMarkers) {
    if (marker.orientation !== undefined) MM.ground.push(marker)
    else MM.facing.push(marker)
  }
  MM.currentTimestamp = os.time()
  const zoneString = compressLoaded()
  saveIcons(zoneString)
  ZO_ClearNumericallyIndexedTable(MM.facing)
  ZO_ClearNumericallyIndexedTable(MM.ground)
  decompressString(zoneString)
  SCENE_MANAGER.Push("hud")
  return undefined
}

export function editorSavePressed(this: void): undefined {
  showDialogue(
    DESTRUCTIVE,
    "Are you sure you would like to overwrite the current profile with your edited changes?",
    CANNOT_UNDO,
    saveProfile
  )
  return undefined
}

EDITOR.selectMarker = selectMarker
EDITOR.createMarker = createMarker
