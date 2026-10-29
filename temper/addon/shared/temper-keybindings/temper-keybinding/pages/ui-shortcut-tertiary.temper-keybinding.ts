import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutTertiary = {
  id: "01a18481-2b9a-7d2d-a453-2cc1d1f50253",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-tertiary",
  title: "Tertiary Action",
  key: "UI_SHORTCUT_TERTIARY",
  layer: "user-interface-shortcuts",
  category: "general",
  bindings: [
    { slot: 1, key: "KEY_F" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_4" },
    { slot: 3, key: "KEY_F3" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
