import { registerAchievementSearch } from "akasha/temper/addon/pages/characters/modules/pithka-achievement-actions/pithka-achievement-actions.module.code.ts"
import { toggleTracker } from "akasha/temper/addon/pages/characters/modules/pithka-controls/pithka-controls.module.code.ts"
import {
  createGroupFinder,
  GROUP_FINDER,
} from "akasha/temper/addon/pages/characters/modules/pithka-group-finder/pithka-group-finder.module.code.ts"
import {
  initializeGroupFinderWindow,
  toggleGroupFinderWindow,
} from "akasha/temper/addon/pages/characters/modules/pithka-group-finder-window/pithka-group-finder-window.module.code.ts"
import { buildNavBar } from "akasha/temper/addon/pages/characters/modules/pithka-nav-bar/pithka-nav-bar.module.code.ts"
import {
  getValue,
  initializeSavedVars,
  setValue,
} from "akasha/temper/addon/pages/characters/modules/pithka-saved-vars/pithka-saved-vars.module.code.ts"
import {
  fetchEndless,
  fetchTrials,
  registerScoreEvents,
} from "akasha/temper/addon/pages/characters/modules/pithka-scores/pithka-scores.module.code.ts"
import { createScreens } from "akasha/temper/addon/pages/characters/modules/pithka-screens/pithka-screens.module.code.ts"
import {
  initializeCommonView,
  initializeQrTray,
} from "akasha/temper/addon/pages/characters/modules/pithka-trays/pithka-trays.module.code.ts"
import "akasha/temper/addon/pages/characters/pithka-declarations/pithka-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const INITIALIZE_DELAY_MS = 500

let initialized = false

function initialize(this: void): undefined {
  if (initialized) return
  initializeSavedVars()
  GROUP_FINDER.instance = createGroupFinder()
  SCENE_MANAGER.RegisterTopLevel(TemperCharactersPithka_GUI, false)
  const screens = createScreens()
  initializeGroupFinderWindow()
  initializeQrTray()
  buildNavBar(screens)
  initializeCommonView()
  setValue("currentScreen", getValue("currentScreen"))
  fetchTrials()
  fetchEndless()
  SLASH_COMMANDS["/4m"] = toggleTracker
  SLASH_COMMANDS["/pat"] = toggleTracker
  SLASH_COMMANDS["/pgf"] = toggleGroupFinderWindow
  initialized = true
}

export function registerPithka(this: void): undefined {
  ZO_CreateStringId("SI_BINDING_NAME_TOGGLE_PITHKA", "Toggle Achievement Tracker")
  ZO_CreateStringId("SI_BINDING_NAME_TOGGLE_PITHKA_GROUP_FINDER", "Toggle Group Finder")
  registerAchievementSearch()
  registerScoreEvents()
  EVENT_MANAGER.RegisterForEvent(
    "TemperCharactersPithka_PlayerActivated",
    EVENT_PLAYER_ACTIVATED,
    () => {
      zo_callLater(initialize, INITIALIZE_DELAY_MS)
    }
  )
}
