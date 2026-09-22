import {
  ADDON_NAME,
  CRAFTING_NAMESPACE,
} from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-constants/crafting-constants.module.code.ts"
import { onAddOnLoaded } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-events/crafting-events.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-sets/modules/sets-main/sets-main.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/modules/crafting-public-api/crafting-public-api.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/modules/knowledge-main/knowledge-main.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/modules/potion-init/potion-init.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/modules/writ-init/writ-init.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/modules/zone-main/zone-main.module.code.ts"

registerAddonInit(ADDON_NAME, onAddOnLoaded, CRAFTING_NAMESPACE)
