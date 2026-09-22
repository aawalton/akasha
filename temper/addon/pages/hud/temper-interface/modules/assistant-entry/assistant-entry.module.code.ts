import { createBindings } from "akasha/temper/addon/pages/hud/temper-interface/modules/assistant-bindings/assistant-bindings.module.code.ts"
import { ASSISTANT_COLLECTIBLES } from "akasha/temper/addon/pages/hud/temper-interface/modules/assistant-collectibles/assistant-collectibles.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-interface/assistant-entry-declarations/assistant-entry-declarations.type-declaration.d.ts"

const ADDON_NAME = "TemperPersonalAssistant"

export function initPersonalAssistant(this: void): undefined {
  globalThis.TemperPersonalAssistants = ASSISTANT_COLLECTIBLES
  createBindings()
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_COLLECTIBLE_UPDATED, createBindings)
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_COLLECTION_UPDATED, createBindings)
  return undefined
}
