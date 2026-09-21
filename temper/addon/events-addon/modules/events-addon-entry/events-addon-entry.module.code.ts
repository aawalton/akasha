import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"
import "akasha/temper/addon/events-addon/modules/events-addon-global/events-addon-global.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/addon/events-addon/modules/events-addon-loaded/events-addon-loaded.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/events-addon/modules/events-addon-names/events-addon-names.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
