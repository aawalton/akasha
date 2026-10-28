import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleActivityHudTracker = {
  id: "01a18481-2b97-7f3e-9140-17feb2c2bb42",
  type: "page-type/temper-keybinding",
  slug: "toggle-activity-hud-tracker",
  key: "TOGGLE_ACTIVITY_HUD_TRACKER",
  bindings: [
    { slot: 1, key: "KEY_NUMPAD_STAR" },
    { slot: 2, key: "KEY_GAMEPAD_BOTH_DPAD_RIGHT_BUTTON_2" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
