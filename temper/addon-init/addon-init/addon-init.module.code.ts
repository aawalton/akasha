import "akasha/temper/temper-eso-types/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-events/eso-events.type-declaration.d.ts"

export function registerAddonInit(addonName: string, init: () => undefined): undefined {
  EVENT_MANAGER.RegisterForEvent(
    addonName,
    EVENT_ADD_ON_LOADED,
    function (this: void, _event: number, loaded: string): undefined {
      if (loaded !== addonName) return
      EVENT_MANAGER.UnregisterForEvent(addonName, EVENT_ADD_ON_LOADED)
      init()
    }
  )
}
