import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import "../collections-addon-global/collections-addon-global.module.code.ts"
import { onAddOnLoaded } from "../collections-addon-loaded/collections-addon-loaded.module.code.ts"
import { ADDON_NAME } from "../collections-addon-names/collections-addon-names.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
