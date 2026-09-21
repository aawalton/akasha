import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

export type PoiNameDebugTable = Record<string, Record<number, number>>

export const INTERNAL_STATE: {
  isAddonDevOfLibZone: boolean
  mapNamesWereBuild: boolean
  poiNameDebugTable: PoiNameDebugTable | undefined
  poiDataTable: unknown
} = {
  isAddonDevOfLibZone: GetDisplayName() === "@Baertram",
  mapNamesWereBuild: false,
  poiNameDebugTable: undefined,
  poiDataTable: undefined,
}
