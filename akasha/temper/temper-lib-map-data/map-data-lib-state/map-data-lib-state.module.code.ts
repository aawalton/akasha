import { asInternal, asLib } from "../map-data-casts/map-data-casts.module.code.ts"
import {
  CALLBACK_TYPE,
  LIB_IDENTIFIER,
  MAPINDEX_MAX,
  MAPINDEX_MIN,
  MAX_ATTEMPT_MAP_UPDATE_SECONDS,
  MAX_NUM_MAPIDS,
  MAX_NUM_ZONEIDS,
  MAX_NUM_ZONEINDEXES,
} from "../map-data-constants/map-data-constants.module.code.ts"
import { MAP_DATA } from "../map-data-table/map-data-table.module.code.ts"
import type { Internal, Lib } from "../map-data-types/map-data-types.module.code.ts"

export const INTERNAL: Internal = asInternal({
  show_log: false,
  loggerName: LIB_IDENTIFIER,
  logger: undefined,
})

export const LIB: Lib = asLib({
  ...MAP_DATA,

  callbackType: { ...CALLBACK_TYPE },
  callbackObject: ZO_CallbackObject.New(),

  mapType: undefined,
  mapNames: {},
  mapNamesLookup: {},
  zoneNames: {},
  zoneNamesLookup: {},
  textureNames: {},
  textureNamesLookup: {},
  zoneIndex: undefined,
  mapIndex: undefined,
  mapId: undefined,
  parentZoneMapId: undefined,
  mapTexture: undefined,
  isMainZone: undefined,
  isSubzone: undefined,
  newSubzone: false,
  isWorld: undefined,
  isCosmic: undefined,
  isMacroMap: undefined,
  isDungeon: undefined,
  zoneName: undefined,
  mapName: undefined,
  subzoneName: undefined,
  subZoneId: undefined,
  currentFloor: undefined,
  numFloors: undefined,
  reticleInteractionName: undefined,
  lastInteractionTarget: undefined,
  questShared: false,
  pseudoMapIndex: undefined,
  lastMapTexture: undefined,
  lastMapId: undefined,
  wasSetMapToPlayerLocationCalled: false,
  setMapToPlayerLocationQueueInProgress: false,
  onPrepareForJumpInProgress: false,
  onAddonLoadInProgress: true,
  SetMapToPlayerLocationQueueStart: 0,

  zoneId: undefined,
  worldX: undefined,
  worldY: undefined,
  worldZ: undefined,
  normalizedX: undefined,
  normalizedY: undefined,
  libGPSX: undefined,
  libGPSY: undefined,

  MAPINDEX_MIN,
  MAPINDEX_MAX,
  MAX_NUM_MAPIDS,
  MAX_NUM_ZONEINDEXES,
  MAX_NUM_ZONEIDS,
  MAX_ATTEMPT_MAP_UPDATE_SECONDS,
})
