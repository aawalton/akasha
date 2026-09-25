type PoiNameDebugTable = Record<string, Record<number, number>>

export const INTERNAL_STATE: {
  isZoneDataAuthor: boolean
  mapNamesWereBuild: boolean
  poiNameDebugTable: PoiNameDebugTable | undefined
  poiDataTable: unknown
} = {
  isZoneDataAuthor: false,
  mapNamesWereBuild: false,
  poiNameDebugTable: undefined,
  poiDataTable: undefined,
}
