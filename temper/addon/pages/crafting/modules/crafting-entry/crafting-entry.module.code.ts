import { ADDON_NAME } from "akasha/temper/addon/pages/crafting/modules/crafting-constants/crafting-constants.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/addon/pages/crafting/modules/crafting-events/crafting-events.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"
import "akasha/temper/addon/pages/crafting/modules/crafting-public-api/crafting-public-api.module.code.ts"
import "akasha/temper/addon/pages/crafting/modules/potion-init/potion-init.module.code.ts"
import "akasha/temper/addon/pages/crafting/modules/writ-init/writ-init.module.code.ts"
import "akasha/temper/addon/pages/crafting/modules/zone-main/zone-main.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded)
