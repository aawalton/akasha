import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function logError(this: void, msg: string, ...args: unknown[]): undefined {
  d(`|cFF6666LibPrice: ${string.format(msg, ...args)}`)
  return undefined
}
