import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutQuinary = {
  id: "01a18481-2b99-7d0c-8339-1b40d2f14d8c",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-quinary",
  title: "Quinary Action",
  key: "UI_SHORTCUT_QUINARY",
  layer: "user-interface-shortcuts",
  category: "general",
  bindings: [
    { slot: 1, key: "KEY_Y" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_2_HOLD" },
    { slot: 3, key: "KEY_F5" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
