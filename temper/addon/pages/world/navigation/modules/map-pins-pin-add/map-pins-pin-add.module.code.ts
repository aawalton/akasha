import { ACHIEVEMENT_ITEMS } from "akasha/temper/addon/pages/world/navigation/modules/map-pins-achievement-items/map-pins-achievement-items.module.code.ts"
import { ACHIEVEMENTS } from "akasha/temper/addon/pages/world/navigation/modules/map-pins-achievements/map-pins-achievements.module.code.ts"
import { BOSSES } from "akasha/temper/addon/pages/world/navigation/modules/map-pins-bosses/map-pins-bosses.module.code.ts"
import { MAP_PIN_CALLBACK } from "akasha/temper/addon/pages/world/navigation/modules/map-pins-callbacks/map-pins-callbacks.module.code.ts"
import { CUSTOM_PINS } from "akasha/temper/addon/pages/world/navigation/modules/map-pins-config/map-pins-config.module.code.ts"
import type { SubzonePinTable } from "akasha/temper/addon/pages/world/navigation/modules/map-pins-data-types/map-pins-data-types.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/world/navigation/modules/map-pins-names/map-pins-names.module.code.ts"
import {
  asAchievementItemTable,
  asNestedPinTable,
  asNumber,
  asPinTag,
  asSubzonePinTable,
} from "akasha/temper/addon/pages/world/navigation/modules/map-pins-narrow/map-pins-narrow.module.code.ts"
import { SKY_SHARDS } from "akasha/temper/addon/pages/world/navigation/modules/map-pins-sky-shards/map-pins-sky-shards.module.code.ts"
import {
  getPinManager,
  getPinTypeId,
  STATE,
} from "akasha/temper/addon/pages/world/navigation/modules/map-pins-state/map-pins-state.module.code.ts"
import { getSubzone } from "akasha/temper/addon/pages/world/navigation/modules/map-pins-subzone/map-pins-subzone.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const bosses = asSubzonePinTable(BOSSES)
const skyShards = asSubzonePinTable(SKY_SHARDS)
const achievements = asNestedPinTable(ACHIEVEMENTS)
const achievementItems = asAchievementItemTable(ACHIEVEMENT_ITEMS)

export function mapPinAddCallback(this: void, i: number): undefined {
  const def = CUSTOM_PINS[i]
  if (def === undefined) {
    d("MapPins: " + tostring(i) + " is wrong pin type.")
    return
  }
  if (
    STATE.updatingMapPin[i] === true ||
    GetMapType() > MAPTYPE_ZONE ||
    !getPinManager().IsCustomPinEnabled(STATE.pinId[i] ?? -1)
  ) {
    return
  }
  const mapContentType = GetMapContentType()
  if (i === 5 && mapContentType === MAP_CONTENT_DUNGEON && IsUnitUsingVeteranDifficulty("player")) {
    return
  }
  if (!IsPlayerActivated()) {
    STATE.updatingMapPin[i] = true
    EVENT_MANAGER.RegisterForEvent(
      ADDON_NAME + "_MapPin_" + tostring(i),
      EVENT_PLAYER_ACTIVATED,
      (): undefined => {
        EVENT_MANAGER.UnregisterForEvent(ADDON_NAME + "_Pin_" + tostring(i), EVENT_PLAYER_ACTIVATED)
        STATE.updatingMapPin[i] = false
        mapPinAddCallback(i)
      }
    )
    return
  }
  STATE.updatingMapPin[i] = true

  const subzone = getSubzone()
  const callback = MAP_PIN_CALLBACK[i]
  if (callback !== undefined) {
    callback(i, subzone)
  } else if (i <= 4) {
    let mapData: SubzonePinTable[string] | undefined
    if (i === 1 || i === 2) {
      mapData = bosses[subzone]
    } else if (i === 3 || i === 4) {
      mapData = skyShards[subzone]
    }
    if (mapData !== undefined) {
      for (const [, pinData] of ipairs(mapData)) {
        let completed: number | undefined
        let required: number | undefined
        if (i === 3 || i === 4) {
          completed = GetSkyshardDiscoveryStatus(
            GetZoneSkyshardId(
              GetSkyshardAchievementZoneId(asNumber(pinData[2])),
              asNumber(pinData[3])
            )
          )
          required = 2
        } else {
          ;[, completed, required] = GetAchievementCriterion(
            asNumber(pinData[2]),
            asNumber(pinData[3])
          )
        }
        if ((completed === required) === def.done) {
          getPinManager().CreatePin(
            getPinTypeId(i),
            asPinTag({ [1]: i, [2]: pinData[2], [3]: pinData[3], [4]: pinData[4] }),
            asNumber(pinData[0]),
            asNumber(pinData[1])
          )
        }
      }
    }
  } else if (i >= 30) {
    const zoneData = achievements[subzone]
    if (zoneData !== undefined) {
      const mapData = zoneData[i]
      if (mapData !== undefined) {
        for (const [, pinData] of ipairs(mapData)) {
          let completed: boolean
          const criterionIndex = pinData[3]
          if (criterionIndex !== undefined) {
            const [, c1, r1] = GetAchievementCriterion(
              asNumber(pinData[2]),
              asNumber(criterionIndex)
            )
            completed = c1 >= r1
          } else {
            completed = IsAchievementComplete(asNumber(pinData[2]))
          }
          const achItems = achievementItems[asNumber(pinData[2])]
          const haveItem =
            achItems !== undefined && achItems[asNumber(criterionIndex)] !== undefined
          if (completed === def.done && haveItem === def.done) {
            getPinManager().CreatePin(
              getPinTypeId(i),
              asPinTag({ [1]: i, [2]: pinData[2], [3]: pinData[3] }),
              asNumber(pinData[0]),
              asNumber(pinData[1])
            )
          }
        }
      }
    }
  }
  STATE.updatingMapPin[i] = false
}
