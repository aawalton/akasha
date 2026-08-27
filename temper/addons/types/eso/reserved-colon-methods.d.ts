interface ZoReservedControlColonMethods {
  SetSimpleAnchor(anchorTargetControl: Control, offsetX?: number, offsetY?: number): void
}

interface ZoReservedButtonColonMethods {
  SetNormalFontColor(r: number, g: number, b: number, a?: number): void
  SetPressedFontColor(r: number, g: number, b: number, a?: number): void
  SetMouseOverFontColor(r: number, g: number, b: number, a?: number): void
  SetDisabledFontColor(r: number, g: number, b: number, a?: number): void
}

interface ZoReservedEditColonMethods {
  HasFocus(): boolean
}

interface ZoReservedSceneFragmentColonMethods {
  SetAllowShowHideTimeUpdates(allow: boolean): void
  SetConditional(conditionalFunction: (this: void) => boolean): void
}

interface ZoReservedPanAndZoomColonMethods {
  ClearJumpToPinWhenAvailable(): void
  CanInitializeMap(): boolean
  SetMapZoomMinMax(minZoom: number, maxZoom: number): void
  ComputeMinZoom(): number
  ComputeCurvedZoom(targetNormalizedZoom: number): number
}

interface ZoReservedMapPinColonMethods {
  GetPinType(): number
  UpdateSize(): void
  UpdateLocation(): void
}

interface ZoReservedMapLocationManagerColonMethods {
  AddLocation(index: number): void
}

interface ZoReservedCraftingResultColonMethods {
  GetResultItemLink(): string | undefined
}
