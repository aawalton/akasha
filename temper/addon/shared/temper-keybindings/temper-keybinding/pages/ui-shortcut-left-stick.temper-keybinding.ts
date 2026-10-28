import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutLeftStick = {
  id: "01a18481-2b99-708e-9b7d-869345b0a30e",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-left-stick",
  key: "UI_SHORTCUT_LEFT_STICK",
  bindings: [
    { slot: 1, key: "KEY_5" },
    { slot: 2, key: "KEY_GAMEPAD_LEFT_STICK" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
