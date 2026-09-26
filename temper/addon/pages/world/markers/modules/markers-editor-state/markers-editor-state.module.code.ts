import type { MarkerIcon } from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import "akasha/temper/addon/pages/world/markers/markers-declarations/markers-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-4/eso-ui-4.type-declaration.d.ts"

export interface EditorImage extends Control {
  dragging?: boolean
  startX?: number
  startY?: number
  startOriginX?: number
  startOriginY?: number
}

export interface EditorTiles extends ZoWorldMapTilesManager {
  mapid?: number
  cZone?: number
  horizontalTiles?: number
  verticalTiles?: number
  totalTiles?: number
}

export interface EditorState {
  scene?: Scene
  frame?: BackdropControl
  image?: EditorImage
  tiles?: EditorTiles
  mapWidth: number
  mapHeight: number
  zoneMarkers: LuaTable<number, MarkerIcon>
  previews: LuaTable<number, MarkerIcon>
  selectedMarker: number
  originX: number
  originZ: number
  nxratio: number
  nzratio: number
  cursorId?: number
  mapZoneLookup: Record<number, Record<number, string> | undefined>
  selections: Record<string, string | undefined>
  mapSelector?: ComboBox
  reloadMap?: (this: void) => void
  destroyPreviews?: (this: void) => void
  setMapId?: (this: void, mapId: number, fromReload?: boolean) => void
  selectMarker?: (this: void, marker: MarkerIcon | undefined) => void
  createMarker?: (this: void, x: number, y: number) => void
  updateLastClick?: (this: void, source?: string) => void
  changeScale?: (this: void, delta: number, dataType?: string) => void
  pan?: (this: void, dataType?: string, deltaX?: number, deltaY?: number) => void
}

export const EMPTY_MARKER: MarkerIcon = {
  index: 0,
  x: 0,
  y: 0,
  z: 0,
  colour: [1, 1, 1, 1],
  text: "",
  size: 1,
}

export const EDITOR: EditorState = {
  mapWidth: 0,
  mapHeight: 0,
  zoneMarkers: new LuaTable(),
  previews: new LuaTable(),
  selectedMarker: 0,
  originX: 0,
  originZ: 0,
  nxratio: 1,
  nzratio: 1,
  mapZoneLookup: {},
  selections: {},
}

export const MAP_START_Y: Record<number, number | undefined> = { [1807]: 18182, [1808]: 10882 }
export const MAP_END_Y: Record<number, number | undefined> = { [1806]: 18182, [1807]: 10882 }
export const MAP_FLOORS: Record<number, number | undefined> = {
  [1806]: 21720,
  [1807]: 14644,
  [1808]: 7120,
}

export function editorChild<T extends Control = Control>(
  this: void,
  ...path: string[]
): T | undefined {
  let control: Control | undefined = TemperWorldMarkerEditorToplevel
  for (const name of path) {
    control = control?.GetNamedChild(name)
  }
  return control as T | undefined
}
