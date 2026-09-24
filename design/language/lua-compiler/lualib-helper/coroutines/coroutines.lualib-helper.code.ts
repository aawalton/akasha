import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

const offered = (_G.coroutine ?? {}) as typeof coroutine

export const __TS__Coroutines = {
  create: offered.create,
  resume: offered.resume,
  status: offered.status,
  yield: offered.yield,
}
