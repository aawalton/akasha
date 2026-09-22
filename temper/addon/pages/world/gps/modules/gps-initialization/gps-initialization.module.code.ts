import { LIB_IDENTIFIER } from "akasha/temper/addon/pages/world/gps/modules/gps-constants/gps-constants.module.code.ts"
import { INTERNAL } from "akasha/temper/addon/pages/world/gps/modules/gps-lib-state/gps-lib-state.module.code.ts"
import { MapAdapter } from "akasha/temper/addon/pages/world/gps/modules/gps-map-adapter/gps-map-adapter.module.code.ts"
import { TamrielOMeter } from "akasha/temper/addon/pages/world/gps/modules/gps-tamriel-o-meter/gps-tamriel-o-meter.module.code.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function initialize(this: void): undefined {
  const logger = INTERNAL.logger

  logger.Debug(`Initializing ${LIB_IDENTIFIER}...`)

  const mapAdapter = MapAdapter.New()
  const meter = TamrielOMeter.New(mapAdapter)

  INTERNAL.mapAdapter = mapAdapter
  INTERNAL.meter = meter

  SLASH_COMMANDS["/tempergpsreset"] = function (this: void): undefined {
    meter.Reset()
    INTERNAL.chat.Print("All measurements have been cleared")
  }

  logger.Debug("Initialization complete")
}

export function onAddOnLoaded(this: void): undefined {
  SetMapToPlayerLocation()
}
