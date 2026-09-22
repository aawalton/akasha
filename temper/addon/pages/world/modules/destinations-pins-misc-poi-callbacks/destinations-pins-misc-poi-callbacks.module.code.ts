import {
  DEST_PIN_TEXT_COLOR_AYLEID,
  DEST_PIN_TEXT_COLOR_DEADLANDS,
  DEST_PIN_TEXT_COLOR_DWEMER,
  DEST_PIN_TEXT_COLOR_HIGHISLE,
  DEST_PIN_TEXT_COLOR_VAMPALTAR,
  DEST_PIN_TEXT_COLOR_WWSHRINE,
  DEST_PIN_TEXT_COLOR_WWVAMP,
} from "akasha/temper/addon/pages/world/modules/destinations-colors/destinations-colors.module.code.ts"
import { PIN_TYPES } from "akasha/temper/addon/pages/world/modules/destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import {
  ACH_STATE,
  sharedAchievementsPinData,
} from "akasha/temper/addon/pages/world/modules/destinations-pins-ach-callbacks/destinations-pins-ach-callbacks.module.code.ts"
import { getAchTypeName } from "akasha/temper/addon/pages/world/modules/destinations-pins-poi-types/destinations-pins-poi-types.module.code.ts"
import {
  AchIndex,
  rowNumber,
} from "akasha/temper/addon/pages/world/modules/destinations-pins-stores/destinations-pins-stores.module.code.ts"
import { DRTV } from "akasha/temper/addon/pages/world/modules/destinations-runtime-variables/destinations-runtime-variables.module.code.ts"
import "akasha/temper/addon/type/lib-map-pins/lib-map-pins.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"

function makeMiscPoiCallback(
  pinName: string,
  matchType: number,
  color: ZoColorDef
): (this: void) => undefined {
  return () => {
    if (GetMapType() >= MAPTYPE_WORLD) return
    DRTV.pinName = pinName
    sharedAchievementsPinData()
    const mapData = ACH_STATE.mapData
    if (mapData === undefined) return
    for (const pinData of mapData) {
      DRTV.pinType = rowNumber(pinData, AchIndex.TYPE)
      DRTV.pinTypeName = getAchTypeName(DRTV.pinType)
      if (DRTV.pinType === matchType) {
        DRTV.pinTag = [color.Colorize(zo_strformat("<<1>>", DRTV.pinTypeName))]
        LibMapPins.CreatePin(
          pinName,
          DRTV.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export const AyleidpinTypeCallback = makeMiscPoiCallback(
  PIN_TYPES.AYLEID,
  20,
  DEST_PIN_TEXT_COLOR_AYLEID
)
export const DeadlandspinTypeCallback = makeMiscPoiCallback(
  PIN_TYPES.DEADLANDS,
  25,
  DEST_PIN_TEXT_COLOR_DEADLANDS
)
export const HighIslepinTypeCallback = makeMiscPoiCallback(
  PIN_TYPES.HIGHISLE,
  26,
  DEST_PIN_TEXT_COLOR_HIGHISLE
)
export const DwemerRuinpinTypeCallback = makeMiscPoiCallback(
  PIN_TYPES.DWEMER,
  23,
  DEST_PIN_TEXT_COLOR_DWEMER
)
export const WWVamppinTypeCallback = makeMiscPoiCallback(
  PIN_TYPES.WWVAMP,
  21,
  DEST_PIN_TEXT_COLOR_WWVAMP
)
export const VampireAltarpinTypeCallback = makeMiscPoiCallback(
  PIN_TYPES.VAMPIRE_ALTAR,
  22,
  DEST_PIN_TEXT_COLOR_VAMPALTAR
)
export const WerewolfShrinepinTypeCallback = makeMiscPoiCallback(
  PIN_TYPES.WEREWOLF_SHRINE,
  24,
  DEST_PIN_TEXT_COLOR_WWSHRINE
)
