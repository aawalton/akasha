export function createLogger(this: void, identifier: string): DebugLogger {
  if (LibDebugLogger === undefined) {
    error(`${identifier} requires LibDebugLogger`)
  }
  return LibDebugLogger(identifier)
}
