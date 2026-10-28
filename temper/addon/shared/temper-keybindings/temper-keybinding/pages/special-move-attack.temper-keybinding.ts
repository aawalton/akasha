import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const specialMoveAttack = {
  id: "01a18481-2b96-7b3a-aadb-2d01a21c48cb",
  type: "page-type/temper-keybinding",
  slug: "special-move-attack",
  key: "SPECIAL_MOVE_ATTACK",
  bindings: [
    { slot: 1, key: "KEY_MOUSE_LEFT" },
    { slot: 2, key: "KEY_GAMEPAD_RIGHT_TRIGGER" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
