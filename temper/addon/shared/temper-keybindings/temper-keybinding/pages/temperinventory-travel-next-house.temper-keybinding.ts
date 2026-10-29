import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const temperinventoryTravelNextHouse = {
  id: "01a18481-2b96-759c-9990-884d001878f9",
  type: "page-type/temper-keybinding",
  slug: "temperinventory-travel-next-house",
  title: "Travel the Inventory House Circuit",
  key: "TEMPERINVENTORY_TRAVEL_NEXT_HOUSE",
  layer: "general",
  category: "temper-items",
  bindings: [{ slot: 1, key: "KEY_END" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
