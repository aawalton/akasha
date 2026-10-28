import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const utilityWheelGamepadCycleLeft = {
  id: "01a18481-2b9a-74ad-8f2a-5b9b36c08be7",
  type: "page-type/temper-keybinding",
  slug: "utility-wheel-gamepad-cycle-left",
  key: "UTILITY_WHEEL_GAMEPAD_CYCLE_LEFT",
  bindings: [
    { slot: 1, key: "KEY_GAMEPAD_LEFT_TRIGGER" },
    { slot: 2, key: "KEY_T" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
