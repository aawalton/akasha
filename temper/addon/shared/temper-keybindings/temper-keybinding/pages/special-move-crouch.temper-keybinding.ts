import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const specialMoveCrouch = {
  id: "01a18481-2b96-7df5-823e-3df6883452bf",
  type: "page-type/temper-keybinding",
  slug: "special-move-crouch",
  key: "SPECIAL_MOVE_CROUCH",
  bindings: [
    { slot: 1, key: "KEY_CTRL" },
    { slot: 2, key: "KEY_GAMEPAD_RIGHT_STICK" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
