import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const specialMoveInterrupt = {
  id: "01a18481-2b96-746f-8b4f-e0195e3386a2",
  type: "page-type/temper-keybinding",
  slug: "special-move-interrupt",
  key: "SPECIAL_MOVE_INTERRUPT",
  bindings: [
    { slot: 1, key: "KEY_MOUSE_LEFTRIGHT" },
    { slot: 2, key: "KEY_GAMEPAD_LEFT_TRIGGER_THEN_RIGHT_TRIGGER" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
