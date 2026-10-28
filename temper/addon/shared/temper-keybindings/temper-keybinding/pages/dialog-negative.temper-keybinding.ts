import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const dialogNegative = {
  id: "01a18481-2b91-7be5-8e06-36c73c5a6973",
  type: "page-type/temper-keybinding",
  slug: "dialog-negative",
  key: "DIALOG_NEGATIVE",
  bindings: [
    { slot: 1, key: "KEY_BACKSPACE" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_2" },
    { slot: 3, key: "KEY_F6" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
