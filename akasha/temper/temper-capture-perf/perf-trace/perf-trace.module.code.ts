import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-globals"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"

export function startPerfTrace(): number {
  return GetGameTimeMilliseconds()
}

function getPerfTracingLevel(): "none" | "minimal" {
  const globals: unknown = globalThis
  if (!isObjectRecord(globals)) return "none"
  const invSv = globals["TemperInventory_SavedVariables"]
  if (!isObjectRecord(invSv)) return "none"
  const defaultTable = invSv["Default"]
  if (!isObjectRecord(defaultTable)) return "none"
  for (const key of Object.keys(defaultTable)) {
    if (key.startsWith("@")) {
      const accountTable = defaultTable[key]
      if (!isObjectRecord(accountTable)) continue
      const accountWide = accountTable["$AccountWide"]
      if (!isObjectRecord(accountWide)) continue
      const logging = accountWide["logging"]
      if (!isObjectRecord(logging)) return "none"
      const level = logging["perfTracing"]
      return level === "minimal" ? "minimal" : "none"
    }
  }
  return "none"
}

export function finishPerfTrace(addonName: string, startMs: number): { loadTimeMs: number } {
  const endMs = GetGameTimeMilliseconds()
  const loadTimeMs = endMs - startMs
  const result = { loadTimeMs }

  if (getPerfTracingLevel() === "minimal") {
    const msg = `[${addonName}] Loaded in ${loadTimeMs}ms`
    const eventName = addonName + "_PerfLog"
    EVENT_MANAGER.RegisterForEvent(
      eventName,
      EVENT_PLAYER_ACTIVATED,
      function (this: void): undefined {
        EVENT_MANAGER.UnregisterForEvent(eventName, EVENT_PLAYER_ACTIVATED)
        d(msg)
      }
    )
  }

  return result
}
