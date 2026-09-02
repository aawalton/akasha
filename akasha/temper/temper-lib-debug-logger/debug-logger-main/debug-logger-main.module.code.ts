import "../debug-logger-global/debug-logger-global.module.code.ts"

import { initApi } from "../debug-logger-api/debug-logger-api.module.code.ts"
import { initCallbacks } from "../debug-logger-callbacks/debug-logger-callbacks.module.code.ts"
import { initCompatibility } from "../debug-logger-compatibility/debug-logger-compatibility.module.code.ts"
import { initLogHandler } from "../debug-logger-log-handler/debug-logger-log-handler.module.code.ts"
import { initSettings } from "../debug-logger-settings/debug-logger-settings.module.code.ts"
import { initStartup } from "../debug-logger-startup/debug-logger-startup.module.code.ts"
import { initLogger } from "../debug-logger-tagged-logger/debug-logger-tagged-logger.module.code.ts"

initLogger()
initSettings()
initLogHandler()
initCallbacks()
initApi()
initCompatibility()
initStartup()
