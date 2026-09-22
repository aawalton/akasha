export const LIB_IDENTIFIER = "TemperWorldMapData"

export const CALLBACK_TYPE = {
  EVENT_ZONE_CHANGED: "TemperWorldMapDataEventZoneChanged",
  EVENT_LINKED_WORLD_POSITION_CHANGED: "TemperWorldMapDataEventLinkedWorldPositionChanged",
  EVENT_PLAYER_ACTIVATED: "TemperWorldMapDataEventPlayerActivated",
  OnWorldMapChanged: "TemperWorldMapDataOnWorldMapChanged",
  WorldMapSceneStateChange: "TemperWorldMapDataWorldMapSceneStateChange",
} as const

export const MAPINDEX_MIN = 1
export const MAPINDEX_MAX = 53
export const MAX_NUM_MAPIDS = 2844
export const MAX_NUM_ZONEINDEXES = 1085
export const MAX_NUM_ZONEIDS = 1584
export const MAX_ATTEMPT_MAP_UPDATE_SECONDS = 15
