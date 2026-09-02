import { SHORT_NAME } from "../data-encode-charset/data-encode-charset.module.code.ts"
import type { TestResult } from "../data-encode-types/data-encode-types.module.code.ts"

function resolveLogLevels(): {
  verbose: unknown
  debug: unknown
  info: unknown
  warning: unknown
  error: unknown
} {
  if (LibDebugLogger !== undefined) {
    return {
      verbose: LibDebugLogger.LOG_LEVEL_VERBOSE,
      debug: LibDebugLogger.LOG_LEVEL_DEBUG,
      info: LibDebugLogger.LOG_LEVEL_INFO,
      warning: LibDebugLogger.LOG_LEVEL_WARNING,
      error: LibDebugLogger.LOG_LEVEL_ERROR,
    }
  }
  return { verbose: "V", debug: "D", info: "I", warning: "W", error: "E" }
}

export const LOG_LEVELS = resolveLogLevels()

const LOGGER = LibDebugLogger !== undefined ? LibDebugLogger.Create(SHORT_NAME) : undefined

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
