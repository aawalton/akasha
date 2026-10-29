import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleNotifications = {
  id: "01a18481-2b98-732c-8fe3-be5f1fd02a4f",
  type: "page-type/temper-keybinding",
  slug: "toggle-notifications",
  title: "Notifications",
  key: "TOGGLE_NOTIFICATIONS",
  layer: "general",
  category: "user-interface",
  bindings: [{ slot: 1, key: "KEY_N" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
