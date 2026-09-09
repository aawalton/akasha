interface DebugLogger {
  Verbose: (...args: unknown[]) => void
  Debug: (...args: unknown[]) => void
  Info: (...args: unknown[]) => void
  Warn: (...args: unknown[]) => void
  Error: (...args: unknown[]) => void
  Log: (level: unknown, ...args: readonly unknown[]) => void
  Create: (this: DebugLogger, namespace: string) => DebugLogger
  SetMinLevelOverride: (this: DebugLogger, level: string) => void
}

interface LibDebugLogger {
  (this: void, tag: string): DebugLogger
  Create: (tag: string) => DebugLogger
  LOG_LEVEL_VERBOSE: string
  LOG_LEVEL_DEBUG: string
  LOG_LEVEL_INFO: string
  LOG_LEVEL_WARNING: string
  LOG_LEVEL_ERROR: string
  GetMinLogLevel: (this: LibDebugLogger) => string
}

declare const LibDebugLogger: LibDebugLogger | undefined

declare const DebugLogViewer: Record<string, unknown> | undefined
