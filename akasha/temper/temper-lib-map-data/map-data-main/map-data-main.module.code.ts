import "../map-data-public-api/map-data-public-api.module.code.ts"
import { initEvents } from "../map-data-events/map-data-events.module.code.ts"
import { initLogger } from "../map-data-logger/map-data-logger.module.code.ts"
import { initMapQueries } from "../map-data-queries/map-data-queries.module.code.ts"
import { initMapUpdate } from "../map-data-update/map-data-update.module.code.ts"

initLogger()
initMapQueries()
initMapUpdate()
initEvents()
