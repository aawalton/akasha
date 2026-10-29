import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const instanceKickLeaveInstance = {
  id: "01a187af-33aa-72ad-9ea2-d1dc8d9d093b",
  type: "page-type/temper-keybinding",
  slug: "instance-kick-leave-instance",
  key: "INSTANCE_KICK_LEAVE_INSTANCE",
  layer: "instance-kick-warning",
  bindings: [
    { slot: 1, key: "KEY_X" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_2" },
  ],
  shared: false,
  changedAt: "2026-10-29T12:27:32.000Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
  createdAt: "2026-10-29T12:42:49.704Z",
} as const satisfies TemperKeybinding
