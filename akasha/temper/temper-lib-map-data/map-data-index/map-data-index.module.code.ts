import { MAP_INDEX_DATA_00 } from "../map-data-index-00/map-data-index-00.module.code.ts"
import { MAP_INDEX_DATA_01 } from "../map-data-index-01/map-data-index-01.module.code.ts"
import { MAP_INDEX_DATA_02 } from "../map-data-index-02/map-data-index-02.module.code.ts"
import { MAP_INDEX_DATA_03 } from "../map-data-index-03/map-data-index-03.module.code.ts"

export const MAP_INDEX_DATA = {
  ...MAP_INDEX_DATA_00,
  ...MAP_INDEX_DATA_01,
  ...MAP_INDEX_DATA_02,
  ...MAP_INDEX_DATA_03,
}
