import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const temperToggleWindow = {
  id: "01a18481-2b96-7aec-bb8d-6e0050240263",
  type: "page-type/temper-keybinding",
  slug: "temper-toggle-window",
  title: "Toggle Window",
  key: "TEMPER_TOGGLE_WINDOW",
  layer: "general",
  category: "temper",
  bindings: [{ slot: 1, key: "KEY_NUMPAD0" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
