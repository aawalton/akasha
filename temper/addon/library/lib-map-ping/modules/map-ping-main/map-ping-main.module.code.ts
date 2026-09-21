import "akasha/temper/addon/library/lib-map-ping/modules/map-ping-public-api/map-ping-public-api.module.code.ts"
import { initApi } from "akasha/temper/addon/library/lib-map-ping/modules/map-ping-api/map-ping-api.module.code.ts"
import { initCompatibility } from "akasha/temper/addon/library/lib-map-ping/modules/map-ping-compatibility/map-ping-compatibility.module.code.ts"
import { initializeHandler } from "akasha/temper/addon/library/lib-map-ping/modules/map-ping-initialization/map-ping-initialization.module.code.ts"

initApi()
initializeHandler()
initCompatibility()
