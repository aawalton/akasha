interface SelectableLabelControl extends LabelControl {
  SetSelected: (this: unknown, selected: boolean) => void
}

interface ZoScrollbarControl extends Control {
  GetMinMax: (this: ZoScrollbarControl) => LuaMultiReturn<[min: number, max: number]>
  GetValue: (this: ZoScrollbarControl) => number
}

declare const COLOR_PICKER_GAMEPAD: {
  Show: (
    callback: (this: void, r: number, g: number, b: number, a: number) => void,
    r: number,
    g: number,
    b: number,
    a?: number
  ) => void
}

declare const TEXT_TYPE_ITERATION_BEGIN: number

declare const TEXT_TYPE_ITERATION_END: number

interface TimelineAnimation extends ZoTimeline {
  SetPlaybackType: (this: TimelineAnimation, playbackType: number, maxLoopCount: number) => void
  SetHandler: (
    this: TimelineAnimation,
    event: string,
    handler: ((...args: unknown[]) => void) | undefined
  ) => void
  PlayFromStart: (this: TimelineAnimation) => void
  GetProgress: (this: TimelineAnimation) => number
  SetProgress: (this: TimelineAnimation, progress: number) => void
  IsPlaying: (this: TimelineAnimation) => boolean
  GetAnimation: (this: TimelineAnimation, index: number) => unknown
}

declare const ZO_Scroll_SetHideScrollbarOnDisable: (
  this: void,
  scrollControl: Control,
  hide: boolean
) => void

declare const ZO_VerticalScrollbarBase_OnMouseExit: (this: void, ...args: unknown[]) => void

declare const ZO_SORT_BY_NAME_NUMERIC: Record<string, unknown>

interface LamWidgetControl extends Control {
  scrollbar?: ZoScrollbarControl
  uniformControlHeight?: number
  controlHeight?: number
}
