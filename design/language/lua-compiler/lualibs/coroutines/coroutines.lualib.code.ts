const coroutine = _G.coroutine ?? {}

export const __TS__Coroutines = {
  create: coroutine.create,
  resume: coroutine.resume,
  status: coroutine.status,
  yield: coroutine.yield,
}
