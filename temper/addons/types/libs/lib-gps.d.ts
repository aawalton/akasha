interface LibGpsMapMeasurement {
  mapIndex: number
}

interface LibGpsMeasurement {
  ToLocal: (x: number, y: number) => LuaMultiReturn<[localX: number, localY: number]>
}

interface LibGps3 {
  GetCurrentMapMeasurement: (this: void) => LibGpsMapMeasurement | undefined
  GlobalToLocal: (x: number, y: number) => LuaMultiReturn<[localX: number, localY: number]>
  GetMapMeasurementByMapId: (mapId: number) => LibGpsMeasurement | undefined
  SetPlayerChoseCurrentMap: () => void
}

declare const LibGPS3: LibGps3 | undefined
