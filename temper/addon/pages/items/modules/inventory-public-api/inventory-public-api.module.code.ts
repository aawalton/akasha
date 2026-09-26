import "akasha/temper/addon/type/temper-items-global/temper-items-global.type-declaration.d.ts"

import { toggleInventoryBrowser } from "akasha/temper/addon/pages/items/modules/inventory-browser/inventory-browser.module.code.ts"
import { getInventoryActionSummary } from "akasha/temper/addon/pages/items/modules/inventory-plan/inventory-plan.module.code.ts"
import {
  toggleHoveredItemLock,
  toggleHoveredItemSell,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-keybind/inventory-rules-keybind.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"

globalThis.TemperItems = {
  ToggleHoveredItemSell: toggleHoveredItemSell,
  ToggleHoveredItemLock: toggleHoveredItemLock,
  ToggleInventoryBrowser: toggleInventoryBrowser,
  getInventoryActionSummary,
  getSavedVariables,
}
