import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"

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
