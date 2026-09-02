interface AddOnManager {
  AddRelevantFilter: (relevantFilter?: string) => void
  AreAddOnsEnabled: () => boolean
  ClearForceDisabledAddOnNotification: (disabledAddonIndex?: number) => void
  ClearUnusedAddOnSavedVariables: () => void
  ClearWarnOutOfDateAddOns: () => void
  GetAddOnDependencyInfo: (
    addOnIndex?: number,
    addOnDependencyIndex?: number
  ) => LuaMultiReturn<
    [
      name: string,
      exists: boolean,
      active: boolean,
      minVersion: number,
      version: number,
      isLibrary: boolean,
    ]
  >
  GetAddOnFilter: () => string
  GetAddOnInfo: (
    addOnIndex?: number
  ) => LuaMultiReturn<
    [
      name: string,
      title: string,
      author: string,
      description: string,
      enabled: boolean,
      state: AddOnLoadState,
      isOutOfDate: boolean,
      isLibrary: boolean,
    ]
  >
  GetAddOnNumDependencies: (addOnIndex?: number) => number
  GetAddOnRootDirectoryPath: (addOnIndex?: number) => string
  GetAddOnVersion: (addOnIndex?: number) => number
  GetForceDisabledAddOnInfo: (
    disabledAddonIndex?: number
  ) => LuaMultiReturn<[addonName: string, shouldShowNotification: boolean, addonTitle: string]>
  GetLoadOutOfDateAddOns: () => boolean
  GetNumAddOns: () => number
  GetNumForceDisabledAddOns: () => number
  GetTotalUnusedAddOnSavedVariablesDiskUsageMB: () => number
  GetTotalUserAddOnSavedVariablesDiskCapacityMB: () => number
  GetTotalUserAddOnSavedVariablesDiskUsageMB: () => number
  GetUserAddOnSavedVariablesDiskUsageMB: (addOnIndex?: number) => number
  RemoveAddOnFilter: () => void
  RequestAddOnSavedVariablesPrioritySave: (addOnName?: string) => void
  ResetRelevantFilters: () => void
  SetAddOnEnabled: (addOnIndex?: number, enabled?: boolean) => void
  SetAddOnFilter: (settingFilter?: string) => void
  SetAddOnsEnabled: (enabled?: boolean) => void
  ShouldWarnOutOfDateAddOns: () => boolean
  WasAddOnDetected: (addOnName?: string) => boolean
}
interface AnimationManager {
  CreateTimeline: () => unknown
  CreateTimelineFromVirtual: (timelineName?: string, animatedControl?: unknown) => unknown
}
interface AnimationTimeline {
  ApplyAllAnimationsToControl: (animatedControl?: unknown) => void
  ClearAllCallbacks: () => void
  ClearAnimatedControlFromAllAnimations: () => void
  GetAnimation: (animationIndex?: number) => unknown
  GetAnimationOffset: (animation?: unknown) => number
  GetAnimationTimeline: (timelineIndex?: number) => unknown
  GetAnimationTimelineOffset: (animation?: unknown) => number
  GetDuration: () => number
  GetFirstAnimation: () => unknown
  GetFirstAnimationOfType: (animationType?: AnimationType) => unknown
  GetFirstAnimationTimeline: () => unknown
  GetFullProgress: () => number
  GetHandler: (eventName?: string, name?: string) => (...args: unknown[]) => unknown
  GetLastAnimation: () => unknown
  GetLastAnimationTimeline: () => unknown
  GetMinDuration: () => number
  GetNumAnimationTimelines: () => number
  GetNumAnimations: () => number
  GetParent: () => unknown
  GetPlaybackLoopsRemaining: () => number
  GetProgress: () => number
  GetSkipAnimationsBehindPlayheadOnInitialPlay: () => boolean
  InsertAnimation: (
    animationType?: AnimationType,
    animatedControl?: unknown,
    offset?: number
  ) => unknown
  InsertAnimationFromVirtual: (animationVirtualName?: string, animatedControl?: unknown) => unknown
  InsertAnimationTimeline: (offset?: number, animatedControl?: unknown) => unknown
  InsertAnimationTimelineFromVirtual: (
    animationVirtualName?: string,
    animatedControl?: unknown
  ) => unknown
  InsertCallback: (
    functionRef?: (...args: unknown[]) => unknown,
    offset?: number
  ) => (...args: unknown[]) => unknown
  IsEnabled: () => boolean
  IsPaused: () => boolean
  IsPlaying: () => boolean
  IsPlayingBackward: () => boolean
  Pause: () => void
  PlayBackward: () => void
  PlayForward: () => void
  PlayFromEnd: (offsetMs?: number) => void
  PlayFromStart: (offsetMs?: number) => void
  PlayInstantlyToEnd: (ignoreCallbacks?: boolean) => void
  PlayInstantlyToStart: (ignoreCallbacks?: boolean) => void
  Resume: () => void
  SetAllAnimationOffsets: (offset?: number) => void
  SetAnimationOffset: (animation?: unknown, offset?: number) => void
  SetAnimationTimelineOffset: (animation?: unknown, offset?: number) => void
  SetCallbackOffset: (callback?: (...args: unknown[]) => unknown, offset?: number) => void
  SetEnabled: (enabled?: boolean) => void
  SetHandler: (
    eventName?: string,
    functionRef?: (...args: unknown[]) => unknown,
    name?: string,
    controlHandlerOrder?: ControlHandlerOrder,
    targetName?: string
  ) => void
  SetMinDuration: (minDuration?: number) => void
  SetOffsetInParent: (offset?: number) => void
  SetPlaybackLoopCount: (maxLoopCount?: number) => void
  SetPlaybackLoopsRemaining: (loopsRemaining?: number) => void
  SetPlaybackType: (playbackType?: AnimationPlayback, maxLoopCount?: number) => void
  SetProgress: (progress?: number) => void
  SetSkipAnimationsBehindPlayheadOnInitialPlay: (skipAnimations?: boolean) => void
  Stop: () => void
}
interface BackdropControl extends Control {
  GetBlendMode: () => TextureBlendMode
  GetCenterColor: () => LuaMultiReturn<[r: number, g: number, b: number, a: number]>
  GetCenterTextureFileName: () => string
  GetEdgeColor: () => LuaMultiReturn<[r: number, g: number, b: number, a: number]>
  GetEdgeTextureFileName: () => string
  IsPixelRoundingEnabled: () => boolean
  SetBlendMode: (blendMode?: TextureBlendMode) => void
  SetCenterColor: (r?: number, g?: number, b?: number, a?: number) => void
  SetCenterTexture: (
    filename?: string,
    tilingInterval?: number,
    addressMode?: TextureAddressMode
  ) => void
  SetCenterTextureFileName: (filename?: string) => void
  SetEdgeColor: (r?: number, g?: number, b?: number, a?: number) => void
  SetEdgeTexture: (
    filename?: string,
    edgeFileWidth?: number,
    edgeFileHeight?: number,
    cornerSize?: number,
    edgeFilePadding?: number
  ) => void
  SetEdgeTextureFileName: (filename?: string) => void
  SetInsets: (left?: number, top?: number, right?: number, bottom?: number) => void
  SetIntegralWrapping: (integralWrappingEnabled?: boolean) => void
  SetPixelRoundingEnabled: (enabled?: boolean) => void
  SetTextureReleaseOption: (releaseOption?: ReleaseReferenceOptions) => void
}
interface EditControl extends Control {
  AddValidCharacter: (validCharacter?: string) => void
  Clear: () => void
  ClearSelection: () => void
  CopyAllTextToClipboard: () => void
  GetAllowMarkupType: () => AllowMarkupType
  GetCopyEnabled: () => boolean
  GetCursorPosition: () => number
  GetDefaultText: () => string
  GetEditEnabled: () => boolean
  GetFont: () => string
  GetFontFaceName: () => string
  GetFontHeight: () => number
  GetFontSize: () => number
  GetFontStyle: () => string
  GetIMECompositionExclusionArea: () => LuaMultiReturn<
    [
      leftControlSpace: number,
      topControlSpace: number,
      rightControlSpace: number,
      bottomControlSpace: number,
    ]
  >
  GetMaxInputChars: () => number
  GetNewLineEnabled: () => boolean
  GetPasteEnabled: () => boolean
  GetScrollExtents: () => number
  GetSelectAllOnFocus: () => boolean
  GetText: () => string
  GetTextLength: () => number
  GetTextType: () => TextType
  GetTopLineIndex: () => number
  HasFocus: () => boolean
  HasSelection: () => boolean
  InsertText: (text?: string) => void
  IsComposingIMEText: () => boolean
  IsMultiLine: () => boolean
  IsPassword: () => boolean
  LoseFocus: () => void
  RemoveAllValidCharacters: () => void
  SelectAll: () => void
  SetAllowMarkupType: (allowMarkupType?: AllowMarkupType) => void
  SetAsPassword: (isPassword?: boolean) => void
  SetColor: (r?: number, g?: number, b?: number, a?: number) => void
  SetCopyEnabled: (enabled?: boolean) => void
  SetCursorPosition: (cursorPosition?: number) => void
  SetDefaultText: (defaultText?: string) => void
  SetDefaultTextColor: (r?: number, g?: number, b?: number, a?: number) => void
  SetEditEnabled: (enabled?: boolean) => void
  SetFont: (font?: string) => void
  SetMaxInputChars: (maxChars?: number) => void
  SetMultiLine: (isMultiLine?: boolean) => void
  SetNewLineEnabled: (enabled?: boolean) => void
  SetPasteEnabled: (enabled?: boolean) => void
  SetSelectAllOnFocus: (enabled?: boolean) => void
  SetSelection: (selectionStartIndex?: number, selectionEndIndex?: number) => void
  SetSelectionColor: (r?: number, g?: number, b?: number, a?: number) => void
  SetText: (text?: string, suppressCallbackHandler?: boolean) => void
  SetTextType: (textType?: TextType) => void
  SetTopLineIndex: (index?: number) => void
  SetVirtualKeyboardType: (keyboardType?: VirtualKeyboardType) => void
  TakeFocus: () => void
  WasLastChangeVirtualKeyboard: () => boolean
}
interface FontObject {
  GetFontInfo: () => LuaMultiReturn<[face: string, size: number, option: string]>
  SetFont: (fontDescriptor?: string) => void
}
interface LineControl extends Control {
  ClearGradientColors: () => void
  GetBlendMode: () => TextureBlendMode
  GetColor: () => LuaMultiReturn<[r: number, g: number, b: number, a: number]>
  GetDesaturation: () => number
  GetTextureCoords: () => LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>
  GetTextureCoordsInPixels: () => LuaMultiReturn<
    [left: number, right: number, top: number, bottom: number]
  >
  GetTextureFileDimensions: () => LuaMultiReturn<[pixelWidth: number, pixelHeight: number]>
  GetTextureFileName: () => string
  GetThickness: () => number
  IsPixelRoundingEnabled: () => boolean
  IsTextureLoaded: () => boolean
  SetBlendMode: (blendMode?: TextureBlendMode) => void
  SetColor: (r?: number, g?: number, b?: number, a?: number) => void
  SetDesaturation: (desaturation?: number) => void
  SetGradientColors: (
    orientation?: ControlOrientation,
    startR?: number,
    startG?: number,
    startB?: number,
    startA?: number,
    endR?: number,
    endG?: number,
    endB?: number,
    endA?: number
  ) => void
  SetPixelRoundingEnabled: (pixelRoundingEnabled?: boolean) => void
  SetTexture: (filename?: string) => void
  SetTextureCoords: (left?: number, right?: number, top?: number, bottom?: number) => void
  SetThickness: (thickness?: number) => void
  SetVertexColors: (
    vertexPoints?: number,
    red?: number,
    green?: number,
    blue?: number,
    alpha?: number
  ) => void
}
interface SliderControl extends Control {
  DoesAllowDraggingFromThumb: () => boolean
  GetEnabled: () => boolean
  GetMinMax: () => LuaMultiReturn<[min: number, max: number]>
  GetOrientation: () => ControlOrientation
  GetThumbTextureControl: () => unknown
  GetValue: () => number
  GetValueStep: () => number
  IsThumbFlushWithExtents: () => boolean
  SetAllowDraggingFromThumb: (allow?: boolean) => void
  SetBackgroundBottomTexture: (
    fileName?: string,
    texTop?: number,
    texLeft?: number,
    texBottom?: number,
    texRight?: number
  ) => void
  SetBackgroundMiddleTexture: (
    fileName?: string,
    texTop?: number,
    texLeft?: number,
    texBottom?: number,
    texRight?: number
  ) => void
  SetBackgroundTopTexture: (
    fileName?: string,
    texTop?: number,
    texLeft?: number,
    texBottom?: number,
    texRight?: number
  ) => void
  SetColor: (r?: number, g?: number, b?: number, a?: number) => void
  SetEnabled: (enable?: boolean) => void
  SetMinMax: (min?: number, max?: number) => void
  SetOrientation: (orientation?: ControlOrientation) => void
  SetThumbFlushWithExtents: (flush?: boolean) => void
  SetThumbTexture: (
    filename?: string,
    disabledFilename?: string,
    highlightedFilename?: string,
    thumbWidth?: number,
    thumbHeight?: number,
    texTop?: number,
    texLeft?: number,
    texBottom?: number,
    texRight?: number
  ) => void
  SetThumbTextureAndFlush: (
    filename?: string,
    disabledFilename?: string,
    highlightedFilename?: string,
    thumbWidth?: number,
    thumbHeight?: number,
    texTop?: number,
    texLeft?: number,
    texBottom?: number,
    texRight?: number,
    flush?: boolean
  ) => void
  SetThumbTextureHeight: (height?: number) => void
  SetValue: (value?: number) => void
  SetValueStep: (step?: number) => void
}
interface StatusBarControl extends Control {
  CalculateSizeWithoutLeadingEdgeForValue: (value?: number) => number
  ClearFadeOutLossAdjustedTopValue: () => void
  EnableFadeOut: (enabled?: boolean) => void
  EnableLeadingEdge: (enabled?: boolean) => void
  EnableScrollingOverlay: (enabled?: boolean) => void
  GetMinMax: () => LuaMultiReturn<[min: number, max: number]>
  GetValue: () => number
  IsPixelRoundingEnabled: () => boolean
  SetBarAlignment: (barAlignment?: BarAlignment) => void
  SetColor: (r?: number, g?: number, b?: number, a?: number) => void
  SetFadeOutGainColor: (r?: number, g?: number, b?: number, a?: number) => void
  SetFadeOutLossAdjustedTopValue: (topValue?: number) => void
  SetFadeOutLossColor: (r?: number, g?: number, b?: number, a?: number) => void
  SetFadeOutLossSetValueToAdjust: (adjustValue?: number) => void
  SetFadeOutTexture: (filename?: string) => void
  SetFadeOutTime: (fadeOutSeconds?: number, fadeOutDelaySeconds?: number) => void
  SetGradientColors: (
    startR?: number,
    startG?: number,
    startB?: number,
    startA?: number,
    endR?: number,
    endG?: number,
    endB?: number,
    endA?: number
  ) => void
  SetLeadingEdge: (textureFile?: string, width?: number, height?: number) => void
  SetLeadingEdgeTextureCoords: (
    left?: number,
    right?: number,
    top?: number,
    bottom?: number
  ) => void
  SetMinMax: (aMin?: number, aMax?: number) => void
  SetOrientation: (orientation?: ControlOrientation) => void
  SetPixelRoundingEnabled: (pixelRoundingEnabled?: boolean) => void
  SetTexture: (filename?: string) => void
  SetTextureCoords: (left?: number, right?: number, top?: number, bottom?: number) => void
  SetValue: (aValue?: number) => void
  SetupScrollingOverlay: (
    textureFile?: string,
    width?: number,
    height?: number,
    duration?: number
  ) => void
}
