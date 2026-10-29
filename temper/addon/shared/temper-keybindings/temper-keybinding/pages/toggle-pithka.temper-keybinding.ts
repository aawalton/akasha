import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const togglePithka = {
  id: "01a18481-2b98-7a82-9bd7-c463c7cea027",
  type: "page-type/temper-keybinding",
  slug: "toggle-pithka",
  title: "Toggle Achievement Tracker",
  key: "TOGGLE_PITHKA",
  layer: "general",
  category: "pithka-s-achievement-tracker",
  bindings: [{ slot: 1, key: "KEY_F11" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
