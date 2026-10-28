import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const rollDodge = {
  id: "01a18481-2b95-7108-9b70-905b9c4f72d9",
  type: "page-type/temper-keybinding",
  slug: "roll-dodge",
  key: "ROLL_DODGE",
  bindings: [
    { slot: 1, key: "KEY_GAMEPAD_BOTH_LEFT_TRIGGER_BUTTON_1" },
    { slot: 2, key: "KEY_MOUSE_MIDDLE" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
