import { buildItemFactsForSlot } from "akasha/temper/addon/pages/items/modules/inventory-build-item-facts/inventory-build-item-facts.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import { createFilterBar } from "akasha/temper/items/filters/addon/modules/filter-bar/filter-bar.module.code.ts"
import { createFilterController } from "akasha/temper/items/filters/addon/modules/panel-filter-binding/panel-filter-binding.module.code.ts"
import { buildFilterIndex } from "akasha/temper/items/filters/core/modules/search-filter-registry/search-filter-registry.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-inventory/eso-inventory.type-declaration.d.ts"
export function initializeFilterBar(): undefined {
  const index = buildFilterIndex()

  const controller = createFilterController({
    index,
    factsSource: (slotData) =>
      slotData.bagId !== undefined && slotData.slotIndex !== undefined
        ? buildItemFactsForSlot(slotData.bagId, slotData.slotIndex)
        : undefined,
    inventoryTypes: [
      INVENTORY_BACKPACK,
      INVENTORY_BANK,
      INVENTORY_GUILD_BANK,
      INVENTORY_HOUSE_BANK,
      INVENTORY_CRAFT_BAG,
      INVENTORY_QUEST_ITEM,
    ],
  })

  EVENT_MANAGER.RegisterForEvent(
    "TemperItemsFilterBarGuildBank",
    EVENT_GUILD_BANK_ITEMS_READY,
    function (this: void): undefined {
      controller.reinstallSurface(INVENTORY_GUILD_BANK)
    }
  )

  createFilterBar({
    controller,
    loadPosition: () => {
      const saved = getSavedVariables().inventoryFilterPanel
      if (saved === undefined) return undefined
      return { left: saved.left, top: saved.top }
    },
    savePosition: (position) => {
      getSavedVariables().inventoryFilterPanel = { left: position.left, top: position.top }
    },
    surfaceAnchors: [
      {
        isActive: () => IsGuildBankOpen(),
        anchorTargets: ["ZO_GuildBankBackpack"],
      },
    ],
  })
}
