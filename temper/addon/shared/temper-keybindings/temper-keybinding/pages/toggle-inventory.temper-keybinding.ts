import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleInventory = {
  id: "01a18481-2b98-7be1-843e-ec3f81e4282c",
  type: "page-type/temper-keybinding",
  slug: "toggle-inventory",
  key: "TOGGLE_INVENTORY",
  bindings: [{ slot: 1, key: "KEY_I" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
