import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const moveBackward = {
  id: "01a18481-2b94-7488-9de4-520153ffb6b2",
  type: "page-type/temper-keybinding",
  slug: "move-backward",
  key: "MOVE_BACKWARD",
  bindings: [
    { slot: 1, key: "KEY_S" },
    { slot: 2, key: "KEY_DOWNARROW" },
    { slot: 3, key: "KEY_GAMEPAD_LSTICK_DOWN" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
