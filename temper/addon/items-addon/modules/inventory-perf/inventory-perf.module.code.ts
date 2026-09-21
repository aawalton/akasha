import { getInventoryConfig } from "akasha/temper/addon/items-addon/modules/inventory-config/inventory-config.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/items-addon/modules/inventory-constants/inventory-constants.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

function getPerfTracingLevel(): "none" | "minimal" {
  const level = getInventoryConfig().logging?.perfTracing
  return level === "minimal" ? "minimal" : "none"
}

export function finishPerfTrace(startMs: number): { loadTimeMs: number } {
  const endMs = GetGameTimeMilliseconds()
  const loadTimeMs = endMs - startMs
  const result = { loadTimeMs }

  if (getPerfTracingLevel() === "minimal") {
    const msg = `[${ADDON_NAME}] Loaded in ${loadTimeMs}ms`
    const eventName = ADDON_NAME + "_PerfLog"
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
