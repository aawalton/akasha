import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import { DEFAULTS } from "akasha/temper/addon/pages/world/navigation/modules/destinations-defaults/destinations-defaults.module.code.ts"
import { getSettingsString } from "akasha/temper/addon/pages/world/navigation/modules/destinations-lang-strings/destinations-lang-strings.module.code.ts"
import { PIN_TYPES } from "akasha/temper/addon/pages/world/navigation/modules/destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import { getCharacterSavedVariables } from "akasha/temper/addon/pages/world/navigation/modules/destinations-saved-variables/destinations-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"

function addFilter(pinType: string, colorizer: ZoColorDef, stringKey: string): undefined {
  MAP_PINS.AddPinFilter(
    pinType,
    colorizer.Colorize(getSettingsString(stringKey)),
    undefined,
    getCharacterSavedVariables().filters
  )
}

export function addPinFilters(): undefined {
  const cssv = getCharacterSavedVariables()
  const codes = DEFAULTS.miscColorCodes

  if (cssv.settings.MapFiltersPOIs) {
    addFilter(
      PIN_TYPES.UNKNOWN,
      codes.mapFilterTextUndone1,
      "SI_TEMPER_DESTINATIONS_FILTER_UNKNOWN"
    )
  }

  if (cssv.settings.MapFiltersAchievements) {
    addFilter(
      PIN_TYPES.LB_GTTP_CP,
      codes.mapFilterTextUndone2,
      "SI_TEMPER_DESTINATIONS_FILTER_OTHER"
    )
    addFilter(
      PIN_TYPES.LB_GTTP_CP_DONE,
      codes.mapFilterTextDone2,
      "SI_TEMPER_DESTINATIONS_FILTER_OTHER_DONE"
    )
    addFilter(PIN_TYPES.MAIQ, codes.mapFilterTextUndone1, "SI_TEMPER_DESTINATIONS_FILTER_MAIQ")
    addFilter(
      PIN_TYPES.MAIQ_DONE,
      codes.mapFilterTextDone1,
      "SI_TEMPER_DESTINATIONS_FILTER_MAIQ_DONE"
    )
    addFilter(
      PIN_TYPES.PEACEMAKER,
      codes.mapFilterTextUndone2,
      "SI_TEMPER_DESTINATIONS_FILTER_PEACEMAKER"
    )
    addFilter(
      PIN_TYPES.PEACEMAKER_DONE,
      codes.mapFilterTextDone2,
      "SI_TEMPER_DESTINATIONS_FILTER_PEACEMAKER_DONE"
    )
    addFilter(
      PIN_TYPES.NOSEDIVER,
      codes.mapFilterTextUndone1,
      "SI_TEMPER_DESTINATIONS_FILTER_NOSEDIVER"
    )
    addFilter(
      PIN_TYPES.NOSEDIVER_DONE,
      codes.mapFilterTextDone1,
      "SI_TEMPER_DESTINATIONS_FILTER_NOSEDIVER_DONE"
    )
    addFilter(
      PIN_TYPES.EARTHLYPOS,
      codes.mapFilterTextUndone2,
      "SI_TEMPER_DESTINATIONS_FILTER_EARTHLYPOS"
    )
    addFilter(
      PIN_TYPES.EARTHLYPOS_DONE,
      codes.mapFilterTextDone2,
      "SI_TEMPER_DESTINATIONS_FILTER_EARTHLYPOS_DONE"
    )
    addFilter(PIN_TYPES.ON_ME, codes.mapFilterTextUndone1, "SI_TEMPER_DESTINATIONS_FILTER_ON_ME")
    addFilter(
      PIN_TYPES.ON_ME_DONE,
      codes.mapFilterTextDone1,
      "SI_TEMPER_DESTINATIONS_FILTER_ON_ME_DONE"
    )
    addFilter(PIN_TYPES.BRAWL, codes.mapFilterTextUndone2, "SI_TEMPER_DESTINATIONS_FILTER_BRAWL")
    addFilter(
      PIN_TYPES.BRAWL_DONE,
      codes.mapFilterTextDone2,
      "SI_TEMPER_DESTINATIONS_FILTER_BRAWL_DONE"
    )
    addFilter(PIN_TYPES.PATRON, codes.mapFilterTextUndone1, "SI_TEMPER_DESTINATIONS_FILTER_PATRON")
    addFilter(
      PIN_TYPES.PATRON_DONE,
      codes.mapFilterTextDone1,
      "SI_TEMPER_DESTINATIONS_FILTER_PATRON_DONE"
    )
    addFilter(
      PIN_TYPES.WROTHGAR_JUMPER,
      codes.mapFilterTextUndone2,
      "SI_TEMPER_DESTINATIONS_FILTER_WROTHGAR_JUMPER"
    )
    addFilter(
      PIN_TYPES.WROTHGAR_JUMPER_DONE,
      codes.mapFilterTextDone2,
      "SI_TEMPER_DESTINATIONS_FILTER_WROTHGAR_JUMPER_DONE"
    )
    addFilter(
      PIN_TYPES.RELIC_HUNTER,
      codes.mapFilterTextUndone1,
      "SI_TEMPER_DESTINATIONS_FILTER_RELIC_HUNTER"
    )
    addFilter(
      PIN_TYPES.RELIC_HUNTER_DONE,
      codes.mapFilterTextDone1,
      "SI_TEMPER_DESTINATIONS_FILTER_RELIC_HUNTER_DONE"
    )
    addFilter(
      PIN_TYPES.CHAMPION,
      codes.mapFilterTextUndone2,
      "SI_TEMPER_DESTINATIONS_FILTER_CHAMPION"
    )
    addFilter(
      PIN_TYPES.CHAMPION_DONE,
      codes.mapFilterTextDone2,
      "SI_TEMPER_DESTINATIONS_FILTER_CHAMPION_DONE"
    )
    addFilter(
      PIN_TYPES.BREAKING,
      codes.mapFilterTextUndone1,
      "SI_TEMPER_DESTINATIONS_FILTER_BREAKING_ENTERING"
    )
    addFilter(
      PIN_TYPES.BREAKING_DONE,
      codes.mapFilterTextDone1,
      "SI_TEMPER_DESTINATIONS_FILTER_BREAKING_ENTERING_DONE"
    )
    addFilter(
      PIN_TYPES.CUTPURSE,
      codes.mapFilterTextUndone2,
      "SI_TEMPER_DESTINATIONS_FILTER_CUTPURSE_ABOVE"
    )
    addFilter(
      PIN_TYPES.CUTPURSE_DONE,
      codes.mapFilterTextDone2,
      "SI_TEMPER_DESTINATIONS_FILTER_CUTPURSE_ABOVE_DONE"
    )
  }

  if (cssv.settings.MapFiltersCollectibles) {
    addFilter(
      PIN_TYPES.COLLECTIBLES,
      codes.mapFilterTextUndone1,
      "SI_TEMPER_DESTINATIONS_FILTER_COLLECTIBLE"
    )
    addFilter(
      PIN_TYPES.COLLECTIBLESDONE,
      codes.mapFilterTextDone1,
      "SI_TEMPER_DESTINATIONS_FILTER_COLLECTIBLE_DONE"
    )
  }

  if (cssv.settings.MapFiltersFishing) {
    addFilter(
      PIN_TYPES.FISHING,
      codes.mapFilterTextUndone2,
      "SI_TEMPER_DESTINATIONS_FILTER_FISHING"
    )
    addFilter(
      PIN_TYPES.FISHINGDONE,
      codes.mapFilterTextDone2,
      "SI_TEMPER_DESTINATIONS_FILTER_FISHING_DONE"
    )
  }

  if (cssv.settings.MapFiltersMisc) {
    addFilter(PIN_TYPES.AYLEID, codes.mapFilterTextDone1, "SI_TEMPER_DESTINATIONS_FILTER_AYLEID")
    addFilter(
      PIN_TYPES.DEADLANDS,
      codes.mapFilterTextDone1,
      "SI_TEMPER_DESTINATIONS_FILTER_DEADLANDS_ENTRANCE"
    )
    addFilter(
      PIN_TYPES.HIGHISLE,
      codes.mapFilterTextDone1,
      "SI_TEMPER_DESTINATIONS_FILTER_HIGHISLE_DRUIDICSHRINE"
    )
    addFilter(PIN_TYPES.WWVAMP, codes.mapFilterTextUndone1, "SI_TEMPER_DESTINATIONS_FILTER_WWVAMP")
    addFilter(
      PIN_TYPES.VAMPIRE_ALTAR,
      codes.mapFilterTextDone2,
      "SI_TEMPER_DESTINATIONS_FILTER_VAMPIRE_ALTAR"
    )
    addFilter(
      PIN_TYPES.WEREWOLF_SHRINE,
      codes.mapFilterTextUndone2,
      "SI_TEMPER_DESTINATIONS_FILTER_WEREWOLF_SHRINE"
    )
    addFilter(PIN_TYPES.DWEMER, codes.mapFilterTextDone1, "SI_TEMPER_DESTINATIONS_FILTER_DWEMER")
  }
}
