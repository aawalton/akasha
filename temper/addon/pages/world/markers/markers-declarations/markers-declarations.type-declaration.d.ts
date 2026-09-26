declare var TemperWorldMarkersToplevel: TopLevelWindow
declare var TemperWorldMarkersCameraToplevel: TopLevelWindow

declare var TemperWorldMarkerProgressMeter: TopLevelWindow
declare var TemperWorldMarkerProgressMeterBar: StatusBarControl
declare var TemperWorldMarkerProgressMeterEstimated: LabelControl
declare var TemperWorldMarkerProgressMeterElapsed: LabelControl

declare var TemperWorldMarkerPlaceToplevel: TopLevelWindow
declare var TemperWorldMarkerPlaceToplevelTexturePicker: Control
declare var TemperWorldMarkerPlaceToplevelColourPicker: Control
declare var TemperWorldMarkerPlaceToplevelSizeSlider: SliderControl
declare var TemperWorldMarkerPlaceToplevelSize: LabelControl
declare var TemperWorldMarkerPlaceToplevelOffsetSlider: SliderControl
declare var TemperWorldMarkerPlaceToplevelOffset: LabelControl
declare var TemperWorldMarkerPlaceToplevelTextEdit: EditControl

declare var TemperWorldMarkerEditorToplevel: TopLevelWindow
declare var TemperWorldMarkerEditorToplevelCursor: TextureControl
declare var TemperWorldMarkerEditorToplevelMapSelectorPicker: Control
declare var TemperWorldMarkerEditorToplevelMapSelectorGamepadButton: ButtonControl

interface LamRefreshable extends Control {
  UpdateValue: (this: LamRefreshable) => void
  UpdateChoices: (this: LamRefreshable, choices: readonly string[]) => void
}

interface TemperWorldMarkersApi {
  highlightAnimationProvider: ZoReversibleAnimationProvider
  toggleQuickMenu: (this: void) => undefined
  placeIcon: (this: void) => undefined
  placeQuickMenuIcon: (this: void) => undefined
  placeQuickMenuIconAtCursor: (this: void) => undefined
  removeClosestIcon: (this: void) => undefined
  removeIconAtCursor: (this: void) => undefined
  sendTempMarker: (this: void) => undefined
}
