import {
  ADDON_NAME,
  buildDefaults,
  PINS_COLLECTED,
  PINS_COMPASS,
  PINS_UNKNOWN,
  SAVED_VARIABLES_NAME,
} from "../skyshards-constants/skyshards-constants.module.code.ts"
import { registerCompassPins } from "../skyshards-pc-compass/skyshards-pc-compass.module.code.ts"
import {
  buildMapPinLayouts,
  registerMapPins,
} from "../skyshards-pc-pins/skyshards-pc-pins.module.code.ts"
import { createSettingsMenu } from "../skyshards-pc-settings/skyshards-pc-settings.module.code.ts"
import {
  alterSkyShardsIndicator,
  setSSP,
} from "../skyshards-pc-skill-panel/skyshards-pc-skill-panel.module.code.ts"
import { setDb, setMainworldColor } from "../skyshards-pc-state/skyshards-pc-state.module.code.ts"

function onSkyshardsUpdated(this: void, _eventCode: number): undefined {
  LibMapPins.RefreshPins(PINS_UNKNOWN)
  LibMapPins.RefreshPins(PINS_COLLECTED)
  COMPASS_PINS.RefreshPins(PINS_COMPASS)
}

export function onLoad(this: void, _eventCode: number, addOnName: string): undefined {
  if (addOnName !== ADDON_NAME) return

  EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_ADD_ON_LOADED)

  const db = ZO_SavedVars.NewCharacterIdSettings(
    SAVED_VARIABLES_NAME,
    4,
    undefined,
    buildDefaults()
  )
  setDb(db)
  setMainworldColor(ZO_ColorDef.New(db.mainworldSkyshards))

  if (
    SKILL_POINT_ALLOCATION_MANAGER != null &&
    SKILL_POINT_ALLOCATION_MANAGER.GetTotalNumSkillPoints != null
  ) {
    setSSP(true)
  }

  const layouts = buildMapPinLayouts()
  registerMapPins(layouts)

  registerCompassPins()

  createSettingsMenu()

  alterSkyShardsIndicator()

  RedirectTexture(
    "EsoUI/Art/MapPins/skyshard_seen.dds",
    "/esoui/art/icons/heraldrycrests_misc_blank_01.dds"
  )
  RedirectTexture(
    "EsoUI/Art/Compass/skyshard_seen.dds",
    "/esoui/art/icons/heraldrycrests_misc_blank_01.dds"
  )

  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_SKYSHARDS_UPDATED, onSkyshardsUpdated)
}
