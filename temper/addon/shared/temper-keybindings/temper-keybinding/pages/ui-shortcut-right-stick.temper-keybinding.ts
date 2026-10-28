import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutRightStick = {
  id: "01a18481-2b9a-7327-85da-746fb4d5bc03",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-right-stick",
  key: "UI_SHORTCUT_RIGHT_STICK",
  bindings: [
    { slot: 1, key: "KEY_NUMPAD5" },
    { slot: 2, key: "KEY_GAMEPAD_RIGHT_STICK" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
