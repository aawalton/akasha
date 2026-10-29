import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleContacts = {
  id: "01a18481-2b97-7506-8c59-cadcebc58387",
  type: "page-type/temper-keybinding",
  slug: "toggle-contacts",
  title: "Friends",
  key: "TOGGLE_CONTACTS",
  layer: "general",
  category: "user-interface",
  bindings: [{ slot: 1, key: "KEY_O" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
