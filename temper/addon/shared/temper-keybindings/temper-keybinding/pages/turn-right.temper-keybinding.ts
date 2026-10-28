import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const turnRight = {
  id: "01a18481-2b98-7f94-ba92-d1b13a392ee8",
  type: "page-type/temper-keybinding",
  slug: "turn-right",
  key: "TURN_RIGHT",
  bindings: [
    { slot: 1, key: "KEY_D" },
    { slot: 2, key: "KEY_RIGHTARROW" },
    { slot: 3, key: "KEY_GAMEPAD_LSTICK_RIGHT" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
