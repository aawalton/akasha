import type { VotansMiniMap } from "../minimap-holder/minimap-holder.module.code.ts"
import type {
  AnyAsyncTask,
  ColorDef,
  LooseMember,
  LooseTable,
  MapScene,
  MiniMapCallbackManager,
  MiniMapControl,
  MiniMapPanAndZoom,
  MiniMapPin,
  MiniMapPinManager,
  MiniMapScene,
} from "../minimap-view-types/minimap-view-types.module.code.ts"

export function asVotansMiniMap(value: unknown): VotansMiniMap {
  return value as VotansMiniMap
}

export function asAnyTable(value: unknown): LooseTable {
  return value as LooseTable
}

export function asMapScene(value: unknown): MapScene {
  return value as MapScene
}

export function asNumber(value: unknown): number {
  return value as number
}
export function asBoolean(value: unknown): boolean {
  return value as boolean
}
export function asString(value: unknown): string {
  return value as string
}

export function asRecord(value: unknown): Record<string, unknown> {
  return value as Record<string, unknown>
}

type AnyArray = readonly unknown[]
export function asAnyArray(value: unknown): AnyArray {
  return value as AnyArray
}

export function asAnyAsyncTask(value: unknown): AnyAsyncTask {
  return value as AnyAsyncTask
}

export function asColorDef(value: unknown): ColorDef {
  return value as ColorDef
}

export type DimsGetter = (this: void, ctrl: LooseTable) => LuaMultiReturn<[number, number]>
export function asDimsGetter(value: unknown): DimsGetter {
  return value as DimsGetter
}

export type FocusZoomGetter = (
  this: void,
  panZoom: LooseTable,
  normalizedX: number,
  normalizedY: number,
  useCurrentZoom?: unknown
) => LuaMultiReturn<[number, number, number]> | undefined

export interface FocusZoomSlot {
  GetNormalizedPositionFocusZoomAndOffset: FocusZoomGetter
}
export function asFocusZoomSlot(value: unknown): FocusZoomSlot {
  return value as FocusZoomSlot
}

export function asMiniMapControl(value: unknown): MiniMapControl {
  return value as MiniMapControl
}

export function asMiniMapPin(value: unknown): MiniMapPin {
  return value as MiniMapPin
}

export function asMiniMapPinManager(value: unknown): MiniMapPinManager {
  return value as MiniMapPinManager
}

export function asMiniMapPanAndZoom(value: unknown): MiniMapPanAndZoom {
  return value as MiniMapPanAndZoom
}

export function asScene(value: unknown): Scene {
  return value as Scene
}

export function asMiniMapCallbackManager(value: unknown): MiniMapCallbackManager {
  return value as MiniMapCallbackManager
}

export function asMiniMapScene(value: unknown): MiniMapScene {
  return value as MiniMapScene
}

export function asSceneFragment(value: unknown): SceneFragment {
  return value as SceneFragment
}

export function asAnyTableMember(value: unknown): LooseMember {
  return value as LooseMember
}
