import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const temperToggleArmory = {
  id: "01a198fa-1ccf-7f16-b31c-3350168e4e7a",
  type: "page-type/temper-keybinding",
  slug: "temper-toggle-armory",
  title: "Toggle Temper Armory",
  key: "TEMPER_TOGGLE_ARMORY",
  layer: "general",
  category: "temper",
  bindings: [{ slot: 1, key: "KEY_NUMPAD0" }],
  shared: true,
  changedAt: "2026-11-01T21:17:51.000Z",
  createdAt: "2026-11-01T21:18:10.638Z",
  updatedAt: "2026-11-01T21:18:10.638Z",
} as const satisfies TemperKeybinding
