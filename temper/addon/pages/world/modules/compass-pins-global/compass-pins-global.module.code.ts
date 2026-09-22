import { asCustomCompassPins } from "akasha/temper/addon/pages/world/modules/compass-pins-casts/compass-pins-casts.module.code.ts"
import {
  CUSTOM_COMPASS_LAYOUT_RESET as LAYOUT_RESET,
  CUSTOM_COMPASS_LAYOUT_UPDATE as LAYOUT_UPDATE,
} from "akasha/temper/addon/pages/world/modules/compass-pins-constants/compass-pins-constants.module.code.ts"
import { LIB } from "akasha/temper/addon/pages/world/modules/compass-pins-lib/compass-pins-lib.module.code.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"

globalThis.COMPASS_PINS = asCustomCompassPins(LIB)
globalThis.CUSTOM_COMPASS_LAYOUT_UPDATE = LAYOUT_UPDATE
globalThis.CUSTOM_COMPASS_LAYOUT_RESET = LAYOUT_RESET
