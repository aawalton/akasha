import "akasha/temper/addon/pages/world/antiquities/modules/antiquities-addon-global/antiquities-addon-global.module.code.ts"

import "akasha/temper/addon/pages/world/antiquities/modules/leads-init/leads-init.module.code.ts"

import { ADDON_NAME } from "akasha/temper/addon/pages/world/antiquities/modules/antiquities-addon-names/antiquities-addon-names.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/addon/pages/world/antiquities/modules/antiquities-loaded/antiquities-loaded.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
