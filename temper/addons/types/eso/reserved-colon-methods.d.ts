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
