import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-debug-logger-global/temper-debug-logger-global.type-declaration.d.ts"

export function createLogger(this: void, identifier: string): DebugLogger {
  if (TemperDebugLogger === undefined) {
    error(`${identifier} requires LibDebugLogger`)
  }
  return TemperDebugLogger(identifier)
}
