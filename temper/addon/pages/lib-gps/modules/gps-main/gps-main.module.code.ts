import "akasha/temper/addon/pages/lib-gps/modules/gps-public-api/gps-public-api.module.code.ts"
import { initApi } from "akasha/temper/addon/pages/lib-gps/modules/gps-api/gps-api.module.code.ts"
import { initCompatibility } from "akasha/temper/addon/pages/lib-gps/modules/gps-compatibility/gps-compatibility.module.code.ts"
import { initialize } from "akasha/temper/addon/pages/lib-gps/modules/gps-initialization/gps-initialization.module.code.ts"

initApi()
initialize()
initCompatibility()
