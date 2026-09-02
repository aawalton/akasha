import { addAchievementCompassPins } from "../destinations-compass-achievement-pins/destinations-compass-achievement-pins.module.code.ts"
import { collectibleFishCompassPins } from "../destinations-compass-collectible-fish-pins/destinations-compass-collectible-fish-pins.module.code.ts"
import { addMiscCompassPins } from "../destinations-compass-misc-pins/destinations-compass-misc-pins.module.code.ts"
import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import type { DestinationsPinLayouts } from "../destinations-pins-pin-layouts/destinations-pins-pin-layouts.module.code.ts"
import { getCharacterSavedVariables } from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"

export function addCompassPins(layouts: DestinationsPinLayouts): undefined {
  const filters = getCharacterSavedVariables().filters
  COMPASS_PINS.AddCustomPin(PIN_TYPES.LB_GTTP_CP, addAchievementCompassPins, layouts.other, filters)
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.LB_GTTP_CP_DONE,
    addAchievementCompassPins,
    layouts.other_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(PIN_TYPES.MAIQ, addAchievementCompassPins, layouts.Maiq, filters)
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.MAIQ_DONE,
    addAchievementCompassPins,
    layouts.Maiq_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.PEACEMAKER,
    addAchievementCompassPins,
    layouts.Peacemaker,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.PEACEMAKER_DONE,
    addAchievementCompassPins,
    layouts.Peacemaker_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.NOSEDIVER,
    addAchievementCompassPins,
    layouts.Nosediver,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.NOSEDIVER_DONE,
    addAchievementCompassPins,
    layouts.Nosediver_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.EARTHLYPOS,
    addAchievementCompassPins,
    layouts.EarthlyPos,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.EARTHLYPOS_DONE,
    addAchievementCompassPins,
    layouts.EarthlyPos_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(PIN_TYPES.ON_ME, addAchievementCompassPins, layouts.OnMe, filters)
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.ON_ME_DONE,
    addAchievementCompassPins,
    layouts.OnMe_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(PIN_TYPES.BRAWL, addAchievementCompassPins, layouts.Brawl, filters)
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.BRAWL_DONE,
    addAchievementCompassPins,
    layouts.Brawl_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(PIN_TYPES.PATRON, addAchievementCompassPins, layouts.Patron, filters)
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.PATRON_DONE,
    addAchievementCompassPins,
    layouts.Patron_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.WROTHGAR_JUMPER,
    addAchievementCompassPins,
    layouts.WrothgarJumper,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.WROTHGAR_JUMPER_DONE,
    addAchievementCompassPins,
    layouts.WrothgarJumper_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.RELIC_HUNTER,
    addAchievementCompassPins,
    layouts.RelicHunter,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.RELIC_HUNTER_DONE,
    addAchievementCompassPins,
    layouts.RelicHunter_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.CHAMPION,
    addAchievementCompassPins,
    layouts.Champion,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.CHAMPION_DONE,
    addAchievementCompassPins,
    layouts.Champion_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.BREAKING,
    addAchievementCompassPins,
    layouts.Breaking,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.BREAKING_DONE,
    addAchievementCompassPins,
    layouts.Breaking_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.CUTPURSE,
    addAchievementCompassPins,
    layouts.Cutpurse,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.CUTPURSE_DONE,
    addAchievementCompassPins,
    layouts.Cutpurse_Done,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.COLLECTIBLES,
    collectibleFishCompassPins,
    layouts.Collectible,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.COLLECTIBLESDONE,
    collectibleFishCompassPins,
    layouts.CollectibleDone,
    filters
  )
  COMPASS_PINS.AddCustomPin(PIN_TYPES.FISHING, collectibleFishCompassPins, layouts.Fish, filters)
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.FISHINGDONE,
    collectibleFishCompassPins,
    layouts.FishDone,
    filters
  )
  COMPASS_PINS.AddCustomPin(PIN_TYPES.AYLEID, addMiscCompassPins, layouts.Ayleid, filters)
  COMPASS_PINS.AddCustomPin(PIN_TYPES.DEADLANDS, addMiscCompassPins, layouts.Deadlands, filters)
  COMPASS_PINS.AddCustomPin(PIN_TYPES.HIGHISLE, addMiscCompassPins, layouts.HighIsle, filters)
  COMPASS_PINS.AddCustomPin(PIN_TYPES.WWVAMP, addMiscCompassPins, layouts.WWVamp, filters)
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.VAMPIRE_ALTAR,
    addMiscCompassPins,
    layouts.VampireAltar,
    filters
  )
  COMPASS_PINS.AddCustomPin(
    PIN_TYPES.WEREWOLF_SHRINE,
    addMiscCompassPins,
    layouts.WereWolfShrine,
    filters
  )
  COMPASS_PINS.AddCustomPin(PIN_TYPES.DWEMER, addMiscCompassPins, layouts.Dwemer, filters)
}
