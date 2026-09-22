import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"
import "akasha/temper/addon/pages/world/collections/modules/collections-addon-global/collections-addon-global.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/addon/pages/world/collections/modules/collections-addon-loaded/collections-addon-loaded.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/world/collections/modules/collections-addon-names/collections-addon-names.module.code.ts"
import "akasha/temper/addon/pages/world/collections/modules/journal-main/journal-main.module.code.ts"
import "akasha/temper/addon/pages/world/collections/modules/saved-vars-main/saved-vars-main.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
