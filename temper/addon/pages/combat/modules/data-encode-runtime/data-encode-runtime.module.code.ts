import { SHORT_NAME } from "akasha/temper/addon/pages/combat/modules/data-encode-charset/data-encode-charset.module.code.ts"
import type { TestResult } from "akasha/temper/addon/pages/combat/modules/data-encode-types/data-encode-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-debug-logger-global/temper-debug-logger-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

function resolveLogLevels(): {
  verbose: unknown
  debug: unknown
  info: unknown
  warning: unknown
  error: unknown
} {
  if (TemperDebugLogger !== undefined) {
    return {
      verbose: TemperDebugLogger.LOG_LEVEL_VERBOSE,
      debug: TemperDebugLogger.LOG_LEVEL_DEBUG,
      info: TemperDebugLogger.LOG_LEVEL_INFO,
      warning: TemperDebugLogger.LOG_LEVEL_WARNING,
      error: TemperDebugLogger.LOG_LEVEL_ERROR,
    }
  }
  return { verbose: "V", debug: "D", info: "I", warning: "W", error: "E" }
}

export const LOG_LEVELS = resolveLogLevels()

const LOGGER = TemperDebugLogger !== undefined ? TemperDebugLogger.Create(SHORT_NAME) : undefined

export const RUNTIME: { debug: boolean; testresult: TestResult | undefined } = {
  debug: GetDisplayName() === "@Solinur",
  testresult: undefined,
}

export function printLog(this: void, level: unknown, ...args: readonly unknown[]): undefined {
  if (LOGGER === undefined || RUNTIME.debug !== true) {
    return
  }
  if (type(LOGGER.Log) === "function") {
    LOGGER.Log(level, ...args)
  }
}
