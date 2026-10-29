import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const actionButton4 = {
  id: "01a18481-2b8f-7613-80c4-6fd09e012650",
  type: "page-type/temper-keybinding",
  slug: "action-button-4",
  title: "Ability 2",
  key: "ACTION_BUTTON_4",
  layer: "general",
  category: "combat",
  bindings: [{ slot: 1, key: "KEY_2" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
