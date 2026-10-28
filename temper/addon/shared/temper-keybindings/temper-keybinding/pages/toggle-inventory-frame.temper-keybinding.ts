import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleInventoryFrame = {
  id: "01a18481-2b97-710d-b88b-b27cabda2786",
  type: "page-type/temper-keybinding",
  slug: "toggle-inventory-frame",
  key: "TOGGLE_INVENTORY_FRAME",
  bindings: [{ slot: 1, key: "KEY_NUMPAD1" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
