import "akasha/temper/antiquities-addon/modules/antiquities-addon-global/antiquities-addon-global.module.code.ts"

import "akasha/temper/antiquities-addon/leads-init/leads-init.module.code.ts"

import { registerAddonInit } from "akasha/temper/addon-init/modules/addon-init/addon-init.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/antiquities-addon/modules/antiquities-addon-loaded/antiquities-addon-loaded.module.code.ts"
import { ADDON_NAME } from "akasha/temper/antiquities-addon/modules/antiquities-addon-names/antiquities-addon-names.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
