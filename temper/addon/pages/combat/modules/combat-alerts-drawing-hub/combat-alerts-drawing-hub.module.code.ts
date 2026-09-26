import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import type { OptionColor } from "akasha/temper/addon/pages/combat/modules/combat-alerts-options/combat-alerts-options.module.code.ts"

export type DrawingKey = number | string
export type DrawingColor = readonly number[]
export type OrientationPart = number | readonly number[]
export type DrawingOrientation = readonly OrientationPart[]

export interface DrawingIconOrientation {
  pitch: number | undefined
  yaw: number | undefined
  roll: number | undefined
}

export type DrawingUpdateFunc = (this: void, icon: DrawingIcon) => void
export type DrawingSetPosition = (
  this: void,
  icon: DrawingIcon,
  x?: number,
  y?: number,
  z?: number
) => void
export type DrawingSetOrientation = (
  this: void,
  icon: DrawingIcon,
  first?: OrientationPart,
  second?: OrientationPart,
  third?: OrientationPart
) => void
export type DrawingSetColor = (
  this: void,
  icon: DrawingIcon,
  r?: number,
  g?: number,
  b?: number,
  a?: number,
  childControlName?: string
) => void
export type DrawingSetTexture = (this: void, icon: DrawingIcon, path?: string) => void
export type DrawingSetTextureHidden = (this: void, icon: DrawingIcon, hidden: boolean) => void
export type DrawingSetText = (this: void, icon: DrawingIcon, text: string) => void
export type DrawingSetFontColor = (
  this: void,
  icon: DrawingIcon,
  r?: number,
  g?: number,
  b?: number,
  a?: number
) => void
export type DrawingSetBackdropColors = (
  this: void,
  icon: DrawingIcon,
  centerR?: number,
  centerG?: number,
  centerB?: number,
  centerA?: number,
  edgeR?: number,
  edgeG?: number,
  edgeB?: number,
  edgeA?: number
) => void
export type DrawingSetBackdropRoll = (this: void, icon: DrawingIcon, roll: number) => void
export type DrawingGetCompositeTexture = (this: void, icon: DrawingIcon) => TextureCompositeControl

export interface DrawingIcon {
  isSpace: boolean
  control: Control
  faceCamera: boolean
  x: number
  y: number
  z: number
  orientation: DrawingIconOrientation
  texture: string | undefined
  updateFunc: DrawingUpdateFunc | undefined
  SetPosition: DrawingSetPosition
  SetOrientation: DrawingSetOrientation
  SetColor?: DrawingSetColor
  SetTexture?: DrawingSetTexture
  SetTextureHidden?: DrawingSetTextureHidden
  SetText?: DrawingSetText
  SetFontColor?: DrawingSetFontColor
  SetBackdropColors?: DrawingSetBackdropColors
  SetBackdropRoll?: DrawingSetBackdropRoll
  GetCompositeTexture?: DrawingGetCompositeTexture
}

export interface SpaceLabelOptions {
  text?: string
  size?: number
  color?: DrawingColor
}

export interface SpaceTextureOptions {
  path?: string
  size?: number
  color?: DrawingColor
  left?: number
  right?: number
  top?: number
  bottom?: number
}

export interface SpaceBackdropOptions {
  width?: number
  height?: number
  centerColor?: DrawingColor
  edgeColor?: DrawingColor
  roll?: number
}

export interface SpaceCompositeOptions {
  size?: number
  init: (this: void, composite: TextureCompositeControl) => void
}

export interface SpaceOptions {
  label?: SpaceLabelOptions
  texture?: SpaceTextureOptions
  backdrop?: SpaceBackdropOptions
  composite?: SpaceCompositeOptions
}

export type DrawingLinePointsFunc = (
  this: void
) => LuaMultiReturn<[x1: number, y1: number, z1: number, x2: number, y2: number, z2: number]>

export type SuppressionFilter = (this: void, unitTag: string) => boolean

export interface AttachedIconData {
  priority: number
  texture: string | undefined
  size: number
  color: DrawingColor
  yOffset: number
  persistOutsideCombat: boolean | undefined
  callback: DrawingUpdateFunc | undefined
  spaceOptions: SpaceOptions | undefined
}

export interface UnitIconsEntry {
  key?: DrawingKey
  active?: string
  icons: Record<string, AttachedIconData>
}

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    SetAttachedIconForUnit: (
      this: void,
      unitTag: string,
      uniqueName: string,
      priority: number,
      texture?: string,
      size?: number,
      color?: DrawingColor,
      persistOutsideCombat?: boolean,
      callback?: DrawingUpdateFunc,
      spaceOptions?: SpaceOptions
    ) => void
    RemoveAttachedIconForUnit: (this: void, unitTag: string, uniqueName: string) => void
    RemoveAllAttachedIcons: (this: void, uniqueName: string) => void
    AddIndividualIcon: (
      this: void,
      atName: string,
      type?: string,
      custom?: string,
      size?: number,
      color?: OptionColor,
      text?: string,
      textSize?: number,
      textColor?: OptionColor
    ) => void
    RemoveIndividualIcon: (this: void, atName: string) => void
    SetLineColor: (
      this: void,
      r: number,
      g: number,
      b: number,
      a?: number,
      edgeA?: number,
      showLabel?: boolean,
      lineNum?: number
    ) => void
    DrawLineBetweenPlayers: (
      this: void,
      unitTag1: string,
      unitTag2: string,
      distanceCallback?: (this: void, distance: number) => void,
      lineNum?: number
    ) => void
    DrawLineWithProvider: (
      this: void,
      endpointsProvider: DrawingLinePointsFunc,
      lineNum?: number
    ) => void
    RemoveLine: (this: void, lineNum?: number) => void
    EnableIcon: (this: void, name: string) => void
    DisableIcon: (this: void, name: string) => void
    EnableIconGroup: (this: void, iconGroupName: string) => void
    DisableIconGroup: (this: void, iconGroupName: string) => void
  }

  interface CrutchDrawingAnimation {
    PulseUpdate: (
      this: void,
      composite: TextureCompositeControl,
      t: number,
      color?: DrawingColor
    ) => void
    PulseInitial: (
      this: void,
      composite: TextureCompositeControl,
      texturePath: string,
      initialSize: number,
      color: DrawingColor
    ) => void
    BoostUpdate: (this: void, composite: TextureCompositeControl, t: number) => void
    BoostInitial: (
      this: void,
      composite: TextureCompositeControl,
      colorFrom?: DrawingColor,
      colorTo?: DrawingColor
    ) => void
  }

  interface CrutchDrawingModel {
    RemoveGrave: (this: void, unitTag: string) => void
    Grave: (
      this: void,
      unitTag?: string,
      intro?: string,
      name?: string,
      birth?: string,
      death?: string
    ) => void
    AreGravesEnabled: (this: void) => boolean
  }

  interface CrutchDrawing {
    activeIcons: Record<DrawingKey, DrawingIcon>
    unitIcons: Record<string, UnitIconsEntry>
    SetPosition: DrawingSetPosition
    SetColor: DrawingSetColor
    SetOrientation: DrawingSetOrientation
    SetTexture: DrawingSetTexture
    SetTextureHidden: DrawingSetTextureHidden
    ConvertToPitchYawRollIfNeeded: (
      this: void,
      first?: OrientationPart,
      second?: OrientationPart,
      third?: OrientationPart
    ) => LuaMultiReturn<
      [pitch: number | undefined, yaw: number | undefined, roll: number | undefined]
    >
    CreateControlCommon: (
      this: void,
      isSpace: boolean,
      control: Control,
      key: DrawingKey,
      texture: string | undefined,
      x: number,
      y: number,
      z: number,
      faceCamera: boolean,
      pitch: number | undefined,
      yaw: number | undefined,
      roll: number | undefined,
      updateFunc: DrawingUpdateFunc | undefined,
      setPositionFunc: DrawingSetPosition,
      setOrientationFunc: DrawingSetOrientation,
      setColorFunc?: DrawingSetColor,
      setTextureFunc?: DrawingSetTexture,
      setTextureHiddenFunc?: DrawingSetTextureHidden,
      setTextFunc?: DrawingSetText,
      setFontColorFunc?: DrawingSetFontColor,
      setBackdropColorsFunc?: DrawingSetBackdropColors,
      setBackdropRollFunc?: DrawingSetBackdropRoll,
      getCompositeFunc?: DrawingGetCompositeTexture
    ) => void
    CreateWorldTexture: (
      this: void,
      texture: string,
      x: number,
      y: number,
      z: number,
      width: number,
      height: number,
      color: DrawingColor,
      useDepthBuffer: boolean,
      faceCamera: boolean,
      orientation?: DrawingOrientation,
      updateFunc?: DrawingUpdateFunc
    ) => DrawingKey
    RemoveWorldTexture: (this: void, key: DrawingKey) => void
    TestCircle: (this: void, radius?: number, x?: number, y?: number, z?: number) => void
    MaybeStartPolling: (this: void, updateImmediately?: boolean) => void
    MaybeStopPolling: (this: void) => void
    ForceRestartPolling: (this: void) => void
    CreateRenderSpaceTexture: (
      this: void,
      texture: string,
      x: number,
      y: number,
      z: number,
      width: number,
      height: number,
      color: DrawingColor,
      useDepthBuffer: boolean,
      orientation: readonly number[]
    ) => LuaMultiReturn<[TextureControl, number]>
    ReleaseRenderSpaceTexture: (this: void, key: DrawingKey) => void
    CreateSpaceTexture: (
      this: void,
      texture: string,
      x: number,
      y: number,
      z: number,
      width: number,
      height: number,
      color: DrawingColor,
      orientation: readonly number[]
    ) => LuaMultiReturn<[Control, string]>
    ReleaseSpaceControl: (this: void, key: DrawingKey) => void
    CreateSpaceControl: (
      this: void,
      x: number,
      y: number,
      z: number,
      faceCamera: boolean,
      orientation: DrawingOrientation | undefined,
      options: SpaceOptions,
      updateFunc?: DrawingUpdateFunc
    ) => string
    CreateSpaceLabel: (
      this: void,
      text: string,
      x: number,
      y: number,
      z: number,
      fontSize: number,
      color: DrawingColor,
      faceCamera: boolean,
      orientation?: DrawingOrientation,
      updateFunc?: DrawingUpdateFunc
    ) => string
    TestSpacePoop: (this: void) => void
    TestPoopText: (this: void) => void
    TestMarker: (this: void) => void
    CreatePlacedPositionMarker: (
      this: void,
      texture: string,
      x: number,
      y: number,
      z: number,
      size?: number,
      color?: DrawingColor
    ) => DrawingKey
    RemovePlacedPositionMarker: (this: void, key: DrawingKey) => void
    CreatePlacedIcon: (
      this: void,
      texture: string,
      x: number,
      y: number,
      z: number,
      size?: number,
      color?: DrawingColor,
      updateFunc?: DrawingUpdateFunc
    ) => DrawingKey
    RemovePlacedIcon: (this: void, key: DrawingKey) => void
    CreateOrientedTexture: (
      this: void,
      texture: string,
      x?: number,
      y?: number,
      z?: number,
      size?: number,
      color?: DrawingColor,
      orientation?: DrawingOrientation,
      updateFunc?: DrawingUpdateFunc,
      useDepthBuffers?: boolean
    ) => DrawingKey
    RemoveOrientedTexture: (this: void, key: DrawingKey) => void
    CreateGroundCircle: (
      this: void,
      x?: number,
      y?: number,
      z?: number,
      radius?: number,
      color?: DrawingColor,
      orientation?: DrawingOrientation,
      updateFunc?: DrawingUpdateFunc,
      useDepthBuffers?: boolean
    ) => DrawingKey
    RemoveGroundCircle: (this: void, key: DrawingKey) => void
    CreateLine: (
      this: void,
      x1: number,
      y1: number,
      z1: number,
      x2: number,
      y2: number,
      z2: number,
      width?: number,
      color?: DrawingColor,
      useDepthBuffers?: boolean,
      updateFunc?: DrawingUpdateFunc,
      getPointsFunc?: DrawingLinePointsFunc
    ) => DrawingKey
    RemoveLine: (this: void, key: DrawingKey) => void
    ShouldUnitBeShown: (this: void, unitTag: string) => boolean
    EvaluateSuppressionFor: (this: void, unitTag: string) => void
    EvaluateAllSuppression: (this: void) => void
    RegisterSuppressionFilter: (this: void, name: string, filterFunc: SuppressionFilter) => void
    UnregisterSuppressionFilter: (this: void, name: string) => void
    CreateGroupRoleIcons: (this: void) => void
    OverrideDeadColor: (this: void, unitTag: string, color: DrawingColor | undefined) => void
    RefreshGroup: (this: void) => void
    UnregisterAttachedIcons: (this: void) => void
    DestroyIndividualIcons: (this: void) => void
    MaybeSetIndividualIcon: (this: void, unitTag: string) => void
    TestPulse: (this: void) => void
    TestPulse2D: (this: void) => void
    TestBoost: (this: void) => void
    AttachControl: (this: void, control: Control, unitTag: string, key: DrawingKey) => void
    UnattachControl: (this: void, control: Control, key: DrawingKey) => void
  }
}
