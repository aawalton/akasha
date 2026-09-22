import "akasha/temper/addon/pages/world/modules/world-global/world-global.module.code.ts"

import "akasha/temper/addon/pages/world/modules/navigation-entry/navigation-entry.module.code.ts"

import { onAddOnLoaded as initNavigation } from "akasha/temper/addon/pages/world/modules/navigation-loaded/navigation-loaded.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/world/modules/world-names/world-names.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"

function onAddOnLoaded(this: void): undefined {
  initNavigation()
  return undefined
}

registerAddonInit(ADDON_NAME, onAddOnLoaded)
