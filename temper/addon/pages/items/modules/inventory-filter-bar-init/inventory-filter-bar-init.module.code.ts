import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { buildItemFactsForSlot } from "akasha/temper/addon/pages/items/modules/inventory-build-item-facts/inventory-build-item-facts.module.code.ts"

import { createFilterBar } from "akasha/temper/items/filters/addon/modules/filter-bar/filter-bar.module.code.ts"
import {
  type CraftingInventory,
  createCraftingFilterController,
  createFilterController,
} from "akasha/temper/items/filters/addon/modules/panel-filter-binding/panel-filter-binding.module.code.ts"
import { buildFilterIndex } from "akasha/temper/items/filters/core/modules/search-filter-registry/search-filter-registry.module.code.ts"
import type {
  AnyTemperFilter,
  FilterId,
} from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-deconstruction/eso-deconstruction.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-inventory/eso-inventory.type-declaration.d.ts"

const DECONSTRUCTION_PANEL_NAME = "TemperItemsDeconstructionFilterPanel"
const DECONSTRUCTION_INVENTORY_NAMES = [
  "ZO_SmithingTopLevelDeconstructionPanelInventory",
  "ZO_UniversalDeconstructionTopLevel_KeyboardPanelInventory",
]

function isCraftingInventory(value: unknown): value is CraftingInventory {
  return isRecord(value) && typeof value.AddItemData === "function"
}

function deconstructionInventoryOf(host: unknown): CraftingInventory | undefined {
  if (!isRecord(host)) return undefined
  const panel = host.deconstructionPanel
  if (!isRecord(panel)) return undefined
  const inventory = panel.inventory
  return isCraftingInventory(inventory) ? inventory : undefined
}

function deconstructionInventories(): readonly CraftingInventory[] {
  const found: CraftingInventory[] = []
  for (const host of [SMITHING, UNIVERSAL_DECONSTRUCTION]) {
    const inventory = deconstructionInventoryOf(host)
    if (inventory !== undefined) found.push(inventory)
  }
  return found
}

function initializeDeconstructionFilterBar(
  index: ReadonlyMap<FilterId, AnyTemperFilter>
): undefined {
  createFilterBar({
    controller: createCraftingFilterController({
      index,
      factsSource: (bagId, slotIndex) => buildItemFactsForSlot(bagId, slotIndex),
      inventories: () => deconstructionInventories(),
    }),
    panelName: DECONSTRUCTION_PANEL_NAME,
    shownBeside: DECONSTRUCTION_INVENTORY_NAMES,
  })
}

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
    surfaceAnchors: [
      {
        isActive: () => IsGuildBankOpen(),
        anchorTargets: ["ZO_GuildBankBackpack"],
      },
    ],
  })

  initializeDeconstructionFilterBar(index)
}
