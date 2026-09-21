import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/library-type/lib-debug-logger/lib-debug-logger.type-declaration.d.ts"

export function createLogger(this: void, identifier: string): DebugLogger {
  if (LibDebugLogger === undefined) {
    error(`${identifier} requires LibDebugLogger`)
  }
  return LibDebugLogger(identifier)
}
