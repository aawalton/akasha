import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const specialMoveBlock = {
  id: "01a18481-2b96-7468-b961-62e43ecbbbc2",
  type: "page-type/temper-keybinding",
  slug: "special-move-block",
  key: "SPECIAL_MOVE_BLOCK",
  bindings: [
    { slot: 1, key: "KEY_MOUSE_RIGHT" },
    { slot: 2, key: "KEY_GAMEPAD_LEFT_TRIGGER" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
