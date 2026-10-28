import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const gamepadCyclePreferredEnemyTarget = {
  id: "01a18481-2b92-7ce8-a750-07e62dd969a0",
  type: "page-type/temper-keybinding",
  slug: "gamepad-cycle-preferred-enemy-target",
  key: "GAMEPAD_CYCLE_PREFERRED_ENEMY_TARGET",
  bindings: [{ slot: 1, key: "KEY_GAMEPAD_BACK_HOLD" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
