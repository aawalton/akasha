function clampMs(this: void, ms: number): number {
  if (ms !== ms) return 0
  if (ms < 0) return 0
  return ms
}

export const __TS__Timers = {
  nextHandle: 0,
  cancelled: new LuaTable<number, boolean | undefined>(),
  intervalNames: new LuaTable<number, string | undefined>(),
  clampMs: clampMs,
}
