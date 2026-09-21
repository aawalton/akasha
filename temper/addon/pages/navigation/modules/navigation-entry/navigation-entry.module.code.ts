import "akasha/temper/addon/pages/navigation/modules/navigation-global/navigation-global.module.code.ts"

import "akasha/temper/addon/pages/navigation/modules/compass-pins-start/compass-pins-start.module.code.ts"
import "akasha/temper/addon/pages/navigation/modules/map-pins-start/map-pins-start.module.code.ts"
import "akasha/temper/addon/pages/navigation/modules/destinations-start/destinations-start.module.code.ts"
import "akasha/temper/addon/pages/navigation/modules/minimap-start/minimap-start.module.code.ts"

import { onAddOnLoaded } from "akasha/temper/addon/pages/navigation/modules/navigation-loaded/navigation-loaded.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/navigation/modules/navigation-names/navigation-names.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
