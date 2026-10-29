import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const actionButton9 = {
  id: "01a18481-2b90-7932-89ee-3f140b7e317d",
  type: "page-type/temper-keybinding",
  slug: "action-button-9",
  title: "Quickslot Item",
  key: "ACTION_BUTTON_9",
  layer: "general",
  category: "combat",
  bindings: [
    { slot: 1, key: "KEY_Q" },
    { slot: 2, key: "KEY_GAMEPAD_DPAD_UP" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
