import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleMarket = {
  id: "01a18481-2b98-704b-a404-d83580aeb7dc",
  type: "page-type/temper-keybinding",
  slug: "toggle-market",
  title: "Crown Store",
  key: "TOGGLE_MARKET",
  layer: "general",
  category: "user-interface",
  bindings: [{ slot: 1, key: "KEY_OEM_COMMA" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
