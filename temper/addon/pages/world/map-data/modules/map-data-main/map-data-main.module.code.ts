import { initEvents } from "akasha/temper/addon/pages/world/map-data/modules/map-data-events/map-data-events.module.code.ts"
import { initLogger } from "akasha/temper/addon/pages/world/map-data/modules/map-data-logger/map-data-logger.module.code.ts"
import { initMapQueries } from "akasha/temper/addon/pages/world/map-data/modules/map-data-queries/map-data-queries.module.code.ts"
import { initMapUpdate } from "akasha/temper/addon/pages/world/map-data/modules/map-data-update/map-data-update.module.code.ts"

initLogger()
initMapQueries()
initMapUpdate()
initEvents()
