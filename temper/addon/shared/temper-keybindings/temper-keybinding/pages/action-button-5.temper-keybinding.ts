import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const actionButton5 = {
  id: "01a18481-2b8f-70a0-9eda-5f17d9e6ca5f",
  type: "page-type/temper-keybinding",
  slug: "action-button-5",
  title: "Ability 3",
  key: "ACTION_BUTTON_5",
  layer: "general",
  category: "combat",
  bindings: [{ slot: 1, key: "KEY_3" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
