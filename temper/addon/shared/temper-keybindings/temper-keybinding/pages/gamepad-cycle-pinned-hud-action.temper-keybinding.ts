import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const gamepadCyclePinnedHudAction = {
  id: "01a187af-33a9-7523-b148-0ff1766f4216",
  type: "page-type/temper-keybinding",
  slug: "gamepad-cycle-pinned-hud-action",
  title: "Gamepad Cycle Pinned HUD Action",
  key: "GAMEPAD_CYCLE_PINNED_HUD_ACTION",
  layer: "general",
  category: "user-interface",
  bindings: [{ slot: 1, key: "KEY_GAMEPAD_BOTH_DPAD_RIGHT_BUTTON_3" }],
  shared: false,
  changedAt: "2026-10-29T12:27:32.000Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
  createdAt: "2026-10-29T12:42:49.704Z",
} as const satisfies TemperKeybinding
