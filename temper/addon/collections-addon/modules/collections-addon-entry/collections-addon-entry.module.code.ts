import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"
import "akasha/temper/addon/collections-addon/modules/collections-addon-global/collections-addon-global.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/addon/collections-addon/modules/collections-addon-loaded/collections-addon-loaded.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/collections-addon/modules/collections-addon-names/collections-addon-names.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
