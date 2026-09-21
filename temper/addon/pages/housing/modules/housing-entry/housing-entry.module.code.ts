import "akasha/temper/addon/pages/housing/modules/housing-publish/housing-publish.module.code.ts"

import "akasha/temper/addon/pages/housing/modules/housing-init/housing-init.module.code.ts"

import { ADDON_NAME } from "akasha/temper/addon/pages/housing/modules/housing-addon-names/housing-addon-names.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/addon/pages/housing/modules/housing-load/housing-load.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
