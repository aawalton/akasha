interface LibMapData {
  IsOverlandMap: () => boolean
  mapTexture: string | undefined
  isWorld: boolean | undefined
  mapIndex: number | undefined
  mapId: number | undefined
  isMacroMap: boolean | undefined
  isDungeon: boolean | undefined
  isMainZone: boolean | undefined
  zoneId: number
  worldX: number
  worldY: number
  worldZ: number
  normalizedX: number
  normalizedY: number
  libGPSX: number
  libGPSY: number
  parentZoneMapId: number
  reticleInteractionName: string | undefined
  GetParentMapIdFromZoneId: (zoneId: number) => number
}

declare const LibMapData: LibMapData

interface LibMapDataInternal {
  UpdateMapInfo: () => void
}

declare const LibMapData_Internal: LibMapDataInternal
