import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const utilityWheelGamepadCycleRight = {
  id: "01a18481-2b9a-7be0-ac38-2dde2195d180",
  type: "page-type/temper-keybinding",
  slug: "utility-wheel-gamepad-cycle-right",
  title: "Cycle Right",
  key: "UTILITY_WHEEL_GAMEPAD_CYCLE_RIGHT",
  layer: "utility-wheel",
  category: "gamepad",
  bindings: [
    { slot: 1, key: "KEY_GAMEPAD_RIGHT_TRIGGER" },
    { slot: 2, key: "KEY_Y" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
