import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/world/markers/markers-declarations/markers-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export interface MarkerControl extends Control {
  bgLayer?: TextureControl
  textLayer?: LabelControl
  highlight?: BackdropControl
}

export interface MarkerIcon {
  x: number
  y: number
  z: number
  bgTexture?: string
  orientation?: number[]
  colour: number[]
  colourHex?: string
  text: string
  size: number | string
  control?: MarkerControl
  key?: number
  endTime?: number
  index?: number
  initialXAnchor?: number
  initialYAnchor?: number
}

export interface MarkerSelections {
  text?: string
  offsetYPercent?: number
  offsetY?: number
  texture?: string
  floating?: boolean
  rgba?: number[]
  size?: number
  yaw?: number
  pitch?: number
}

export type MarkersVars = {
  loadedProfile: Record<number, string | undefined>
  Profiles: Record<number, Record<string, string[] | undefined> | undefined>
  globalMult: number
  cullingDistance: number
  fontface: string
  fonteffect: string
  fontScale: number
  currentPresetVersion: number
  latestUpdateMessage: number
  currentSelections?: MarkerSelections
  quickSelections?: MarkerSelections
}

export const DEFAULT_VARS: MarkersVars = {
  loadedProfile: {},
  Profiles: {},
  globalMult: 1,
  cullingDistance: 200,
  fontface: "GAMEPAD_BOLD_FONT",
  fonteffect: "|thick-outline",
  fontScale: 1,
  currentPresetVersion: 1,
  latestUpdateMessage: 0,
}

export interface MarkersState {
  vars: MarkersVars
  facing: MarkerIcon[]
  ground: MarkerIcon[]
  currentTimestamp: number
  currentSelections: MarkerSelections
  quickSelections: MarkerSelections
  exportString: string
  multipleProfilesLoaded: boolean
  currentAdditionalProfiles: string[]
  currentLoadProfileName: string
}

export const MM: MarkersState = {
  vars: DEFAULT_VARS,
  facing: [],
  ground: [],
  currentTimestamp: -1,
  currentSelections: {},
  quickSelections: {},
  exportString: "",
  multipleProfilesLoaded: false,
  currentAdditionalProfiles: [],
  currentLoadProfileName: "Default",
}

export const CHAT_PREFIX = "|cFFD700More Markers|r: "

export function refreshWidget(this: void, reference: string): undefined {
  const widget = _G[reference] as LamRefreshable | undefined
  if (widget !== undefined) {
    widget.UpdateValue()
  }
  return undefined
}

export function refreshExport(this: void): undefined {
  refreshWidget("TemperWorldMarkersExportEditBox")
  return undefined
}

export function refreshLoadedProfile(this: void): undefined {
  refreshWidget("TemperWorldMarkersProfilesCurrentLoadedProfile")
  return undefined
}
