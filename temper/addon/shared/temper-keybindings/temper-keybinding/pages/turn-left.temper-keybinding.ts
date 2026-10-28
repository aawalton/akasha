import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const turnLeft = {
  id: "01a18481-2b98-786b-8b75-60817299c2db",
  type: "page-type/temper-keybinding",
  slug: "turn-left",
  key: "TURN_LEFT",
  bindings: [
    { slot: 1, key: "KEY_A" },
    { slot: 2, key: "KEY_LEFTARROW" },
    { slot: 3, key: "KEY_GAMEPAD_LSTICK_LEFT" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
