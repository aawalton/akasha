import { INTERNAL, LIB } from "../map-data-lib-state/map-data-lib-state.module.code.ts"

function buildMapNames(this: void): undefined {
  let maxMapId: number | undefined
  for (let i = 1; i <= LIB.MAX_NUM_MAPIDS; i++) {
    const mapName = GetMapNameById(i)
    if (mapName !== "") {
      LIB.mapNames[i] = mapName
      if (maxMapId === undefined || maxMapId < i) maxMapId = i
    }
  }
  INTERNAL.dm("Debug", string.format("maxMapId: %s", maxMapId))
}

function buildMapNamesLookup(this: void): undefined {
  const builtTable: Record<string, number[]> = {}
  for (const [var1, var2] of pairs(LIB.mapNames)) {
    if (builtTable[var2] === undefined) builtTable[var2] = []
    if (!INTERNAL.ContainsIndex(builtTable, var1)) {
      const ids = builtTable[var2]
      if (ids !== undefined) ids.push(var1)
    }
  }
  LIB.mapNamesLookup = builtTable
  LIB.mapNames = {}
}

function buildZoneNames(this: void): undefined {
  let maxZoneIndex: number | undefined
  let maxZoneId: number | undefined
  for (let i = 1; i <= LIB.MAX_NUM_ZONEINDEXES; i++) {
    const zoneName = GetZoneNameByIndex(i)
    if (zoneName !== "") {
      const zoneId = GetZoneId(i)
      LIB.zoneNames[i] = zoneName
      if (maxZoneIndex === undefined || maxZoneIndex < i) maxZoneIndex = i
      if (maxZoneId === undefined || maxZoneId < zoneId) maxZoneId = zoneId
    }
  }
  INTERNAL.dm("Debug", string.format("maxZoneIndex: %s", maxZoneIndex))
  INTERNAL.dm("Debug", string.format("maxZoneId: %s", maxZoneId))
}

function buildZoneNamesLookup(this: void): undefined {
  const builtTable: Record<string, number> = {}
  for (const [var1, var2] of pairs(LIB.zoneNames)) {
    builtTable[var2] = var1
  }
  LIB.zoneNamesLookup = builtTable
  LIB.zoneNames = {}
}

function buildMapTextureNames(this: void): undefined {
  for (let i = 1; i <= LIB.MAX_NUM_MAPIDS; i++) {
    const textureName = GetMapTileTextureForMapId(i)
    if (textureName !== "") {
      const lowered = string.lower(textureName)
      const [noPrefix] = string.gsub(lowered, "^.*/maps/", "")
      const [noSuffix] = string.gsub(noPrefix, "%.dds$", "")
      LIB.textureNames[i] = noSuffix
    }
  }
}

function buildMapTextureNamesLookup(this: void): undefined {
  const builtTable: Record<string, number[]> = {}
  for (const [var1, var2] of pairs(LIB.textureNames)) {
    if (builtTable[var2] === undefined) builtTable[var2] = []
    if (!INTERNAL.ContainsIndex(builtTable, var1)) {
      const ids = builtTable[var2]
      if (ids !== undefined) ids.push(var1)
    }
  }
  LIB.textureNamesLookup = builtTable
  LIB.textureNames = {}
}

export function buildAllTables(this: void): undefined {
  buildMapNames()
  buildMapNamesLookup()
  buildZoneNames()
  buildZoneNamesLookup()
  buildMapTextureNames()
  buildMapTextureNamesLookup()
}

export function getPlayerPos(this: void): undefined {
  INTERNAL.dm("Debug", "-----")
  INTERNAL.dm("Debug", "GetPlayerPos")
  if (LIB.lastInteractionTarget !== undefined) {
    INTERNAL.dm("Debug", `Last Interaction Target: ${LIB.lastInteractionTarget}`)
  }
  if (LIB.reticleInteractionName !== undefined) {
    INTERNAL.dm("Debug", `Reticle Interaction Name: ${LIB.reticleInteractionName}`)
  }

  const currentLogSetting = INTERNAL.show_log
  INTERNAL.show_log = true
  INTERNAL.UpdateMapInfo()

  INTERNAL.dm("Debug", LIB.mapTexture)
  if (LIB.zoneName !== undefined) INTERNAL.dm("Debug", `zoneName: ${LIB.zoneName}`)
  if (LIB.mapName !== undefined) INTERNAL.dm("Debug", `mapName: ${LIB.mapName}`)
  if (LIB.subzoneName !== undefined) INTERNAL.dm("Debug", `subzoneName: ${LIB.subzoneName}`)
  if (LIB.subZoneId !== undefined) INTERNAL.dm("Debug", `subZoneId: ${LIB.subZoneId}`)
  if (LIB.zoneId !== undefined) INTERNAL.dm("Debug", `ZoneId: ${LIB.zoneId}`)
  if (LIB.mapIndex !== undefined) INTERNAL.dm("Debug", `MapIndex: ${LIB.mapIndex}`)
  if (LIB.mapId !== undefined) INTERNAL.dm("Debug", `mapId: ${LIB.mapId}`)
  if (LIB.parentZoneMapId !== undefined) {
    INTERNAL.dm("Debug", `parentZoneMapId: ${LIB.parentZoneMapId}`)
  }
  if (LIB.zoneIndex !== undefined) INTERNAL.dm("Debug", `zoneIndex: ${LIB.zoneIndex}`)
  INTERNAL.dm("Debug", `isDungeon: ${tostring(LIB.isDungeon)}`)
  INTERNAL.dm("Debug", `isMainZone: ${tostring(LIB.isMainZone)}`)
  INTERNAL.dm("Debug", `isSubzone: ${tostring(LIB.isSubzone)}`)
  INTERNAL.dm("Debug", `isWorld: ${tostring(LIB.isWorld)}`)
  INTERNAL.dm("Debug", `isCosmic: ${tostring(LIB.isCosmic)}`)
  INTERNAL.dm("Debug", `isMacroMap: ${tostring(LIB.isMacroMap)}`)
  if (LIB.currentFloor !== undefined && LIB.numFloors !== undefined) {
    const floorString = string.format("currentFloor: %d of %d", LIB.currentFloor, LIB.numFloors)
    INTERNAL.dm("Debug", floorString)
  }

  INTERNAL.dm("Debug", `X: ${LIB.normalizedX}`)
  INTERNAL.dm("Debug", `Y: ${LIB.normalizedY}`)
  INTERNAL.dm("Debug", `GPS X: ${LIB.libGPSX}`)
  INTERNAL.dm("Debug", `GPS Y: ${LIB.libGPSY}`)
  INTERNAL.dm("Debug", `worldX: ${LIB.worldX}`)
  INTERNAL.dm("Debug", `worldY: ${LIB.worldY}`)
  INTERNAL.dm("Debug", `worldZ: ${LIB.worldZ}`)

  INTERNAL.show_log = currentLogSetting
}
