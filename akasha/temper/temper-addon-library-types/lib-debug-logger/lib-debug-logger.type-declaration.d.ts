interface DebugLogger {
  Verbose: (...args: unknown[]) => void
  Debug: (...args: unknown[]) => void
  Info: (...args: unknown[]) => void
  Warn: (...args: unknown[]) => void
  Error: (...args: unknown[]) => void
}

interface LibDebugLogger {
  Create: (tag: string) => DebugLogger
}

declare const LibDebugLogger: LibDebugLogger | undefined

declare const DebugLogViewer: Record<string, unknown> | undefined
