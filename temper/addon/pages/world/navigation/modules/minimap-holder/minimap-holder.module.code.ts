import { asTemperMiniMap } from "akasha/temper/addon/pages/world/navigation/modules/minimap-casts/minimap-casts.module.code.ts"
import type {
  AccountSettings,
  PlayerSettings,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-saved-variables/minimap-saved-variables.module.code.ts"
import type {
  ColorDef,
  LooseTable,
  MiniMapControl,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-view-types/minimap-view-types.module.code.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const ZONE_ALERT_MODE = {
  Always: "ALWAYS",
  MiniMapHidden: "MINIMAPHIDDEN",
  Never: "NEVER",
} as const

const COMPASS_MODE = {
  Untouched: "UNTOUCHED",
  Hidden: "HIDDEN",
  Shown: "SHOWN",
} as const

const FONT_FACES: Record<string, [string, number] | string> = {
  MEDIUM_FONT: ["$(MEDIUM_FONT)", 1],
  BOLD_FONT: ["$(BOLD_FONT)", 1],
  CHAT_FONT: ["$(CHAT_FONT)", 1],
  GAMEPAD_LIGHT_FONT: ["$(GAMEPAD_LIGHT_FONT)", 1.3],
  GAMEPAD_MEDIUM_FONT: ["$(GAMEPAD_MEDIUM_FONT)", 1.3],
  GAMEPAD_BOLD_FONT: ["$(GAMEPAD_BOLD_FONT)", 1.3],
  ANTIQUE_FONT: ["$(ANTIQUE_FONT)", 1],
  HANDWRITTEN_FONT: ["$(HANDWRITTEN_FONT)", 0.95],
  STONE_TABLET_FONT: ["$(STONE_TABLET_FONT)", 0.9],
}

interface FrameStyleData {
  value: string
  setup: (this: void, ...args: unknown[]) => unknown
  reset?: (this: void, ...args: unknown[]) => unknown
}
export interface FrameStyleItem {
  name: string
  data: FrameStyleData
}

interface FontSizeData {
  size: number
  offsetY: number
}
export interface FontSizeItem {
  name: string
  data: FontSizeData
}

export interface TemperMiniMap {
  name: string
  zoneAlertMode: typeof ZONE_ALERT_MODE
  compassMode: typeof COMPASS_MODE
  fontFaces: Record<string, [string, number] | string>

  isSpecialZoom: boolean
  specialZoom: number
  isMounted: boolean
  zoomMode: string
  accountDefaults: AccountSettings
  account: AccountSettings
  defaults: PlayerSettings
  player: PlayerSettings
  mapVars?: LooseTable
  titleColor?: ColorDef
  pinManager?: LooseTable
  panZoom?: LooseTable

  modeData?: LooseTable
  background?: MiniMapControl
  clockRealTime?: MiniMapControl
  clockInGame?: MiniMapControl
  cameraAngleLeft?: Control
  cameraAngleRight?: Control
  cameraAngleRad?: number
  cameraAngle?: number
  scale?: number
  limitedScale?: number
  lastTitleFont?: string
  wasMapAdded?: boolean
  settingsScene?: LooseTable
  pinScales?: Record<string, number>

  GetCurrentZoom: (this: TemperMiniMap) => number
  SetCurrentZoom: (this: TemperMiniMap, zoom: number) => void
  InitTweaks: (this: TemperMiniMap) => void
  InitRequiredModifications: (this: TemperMiniMap) => void
  InitCameraAngle: (this: TemperMiniMap) => void
  InitMiniMap: (this: TemperMiniMap) => void
  CalculateScale: (this: TemperMiniMap, pinType: number) => number
  ShowClock: (this: void) => void
  RestorePosition: (this: TemperMiniMap) => void
  StartFollowPlayer: (this: TemperMiniMap) => void
  StopFollowPlayer: (this: TemperMiniMap) => void
  UpdateVisibility: (this: TemperMiniMap) => void
  SetMapHeader: (this: TemperMiniMap) => void
  GoMiniMapMode: (this: TemperMiniMap, skipWorldMapUpdate?: boolean) => void
  GoWorldMapMode: (this: TemperMiniMap, skipPanToPlayer?: boolean) => void
  UpdateBorder: (this: TemperMiniMap) => void
  UpdateCompass: (this: TemperMiniMap) => void
  UpdateDrawLevel: (this: TemperMiniMap) => void
  Initialize: (this: TemperMiniMap) => void
  ToggleShowMap: (this: TemperMiniMap) => void
  ToggleShowHUD: (this: TemperMiniMap) => void
  ToggleShowCombat: (this: TemperMiniMap) => void
  ToggleShowSiege: (this: TemperMiniMap) => void
  ToggleShowInHousing: (this: TemperMiniMap) => void
  ToogleZoom: (this: TemperMiniMap, enabled: boolean, zoom?: number) => void
  StepZoom: (this: TemperMiniMap, add: boolean) => void
  ToggleFixedOffset: (this: TemperMiniMap) => void

  GetFontSizeBySizeName: (
    this: TemperMiniMap,
    sizeName: string | number
  ) => FontSizeItem | undefined
  GetStyleByName: (this: TemperMiniMap, name: string) => FrameStyleItem | undefined
  AddBorderStyle: (
    this: TemperMiniMap,
    name: string,
    displayText: string,
    setupFunction: (this: void, ...args: unknown[]) => unknown,
    resetFunction: ((this: void, ...args: unknown[]) => unknown) | undefined
  ) => void
  AddFont: (this: TemperMiniMap, font: string, displayText: string) => void
  AddFontSize: (this: TemperMiniMap, fontSize: number, displayText: string, offsetY: number) => void
  InitMapSettings: (this: TemperMiniMap) => void
  InitSettings: (this: TemperMiniMap) => void
  InitPinSizes: (this: TemperMiniMap) => void
}

export const holder: TemperMiniMap = asTemperMiniMap({
  name: "TemperWorldMiniMap",
  zoneAlertMode: ZONE_ALERT_MODE,
  compassMode: COMPASS_MODE,
  fontFaces: FONT_FACES,
  isSpecialZoom: false,
  specialZoom: 1,
  isMounted: false,
  zoomMode: "zoom",
})
