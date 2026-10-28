import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutInputLeft = {
  id: "01a18481-2b98-7b81-9b47-6ccf67ed2253",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-input-left",
  key: "UI_SHORTCUT_INPUT_LEFT",
  bindings: [
    { slot: 1, key: "KEY_LEFTARROW" },
    { slot: 2, key: "KEY_GAMEPAD_DPAD_LEFT" },
    { slot: 3, key: "KEY_GAMEPAD_LSTICK_LEFT" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
