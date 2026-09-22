import "akasha/temper/addon/pages/world/modules/world-global/world-global.module.code.ts"

import "akasha/temper/addon/pages/world/gps/modules/gps-main/gps-main.module.code.ts"
import "akasha/temper/addon/pages/world/map-data/modules/map-data-main/map-data-main.module.code.ts"
import "akasha/temper/addon/pages/world/navigation/modules/navigation-entry/navigation-entry.module.code.ts"
import "akasha/temper/addon/pages/world/antiquities/modules/antiquities-entry/antiquities-entry.module.code.ts"
import "akasha/temper/addon/pages/world/collections/modules/collections-entry/collections-entry.module.code.ts"

import { onAddOnLoaded as initAntiquities } from "akasha/temper/addon/pages/world/antiquities/modules/antiquities-loaded/antiquities-loaded.module.code.ts"
import { onAddOnLoaded as initCollections } from "akasha/temper/addon/pages/world/collections/modules/collections-loaded/collections-loaded.module.code.ts"
import { onAddOnLoaded as initGps } from "akasha/temper/addon/pages/world/gps/modules/gps-initialization/gps-initialization.module.code.ts"
import { onAddOnLoaded as initMapData } from "akasha/temper/addon/pages/world/map-data/modules/map-data-events/map-data-events.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/world/modules/world-names/world-names.module.code.ts"
import { onAddOnLoaded as initNavigation } from "akasha/temper/addon/pages/world/navigation/modules/navigation-loaded/navigation-loaded.module.code.ts"
import { initQuests } from "akasha/temper/addon/pages/world/quests/modules/quests-entry/quests-entry.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"

function onAddOnLoaded(this: void): undefined {
  initGps()
  initMapData()
  initNavigation()
  initQuests()
  initAntiquities()
  initCollections()
  return undefined
}

registerAddonInit(ADDON_NAME, onAddOnLoaded)
