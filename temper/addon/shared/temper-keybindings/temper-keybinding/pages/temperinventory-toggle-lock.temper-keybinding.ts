import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const temperinventoryToggleLock = {
  id: "01a18481-2b96-705e-9980-58d02a4e7fff",
  type: "page-type/temper-keybinding",
  slug: "temperinventory-toggle-lock",
  title: "Toggle Temper Lock on Hovered Item",
  key: "TEMPERINVENTORY_TOGGLE_LOCK",
  layer: "general",
  category: "temper-items",
  bindings: [{ slot: 1, key: "KEY_SCROLLLOCK" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
