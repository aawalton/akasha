import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleGroup = {
  id: "01a18481-2b97-7073-89c8-9609d3d92e97",
  type: "page-type/temper-keybinding",
  slug: "toggle-group",
  title: "Group",
  key: "TOGGLE_GROUP",
  layer: "general",
  category: "user-interface",
  bindings: [{ slot: 1, key: "KEY_P" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
