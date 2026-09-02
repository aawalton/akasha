import { ALCHEMY_STATION } from "../alchemy-station/alchemy-station.module.code.ts"
import type { Lib } from "../alchemy-station-types/alchemy-station-types.module.code.ts"

declare global {
  var LibAlchemyStation: Lib
}

globalThis.LibAlchemyStation = ALCHEMY_STATION
