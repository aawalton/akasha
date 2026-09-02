import type { LogEntry, Settings } from "../debug-logger-types/debug-logger-types.module.code.ts"

declare global {
  var LibDebugLoggerSettings: Settings | undefined
  var LibDebugLoggerLog: LogEntry[] | undefined
}
