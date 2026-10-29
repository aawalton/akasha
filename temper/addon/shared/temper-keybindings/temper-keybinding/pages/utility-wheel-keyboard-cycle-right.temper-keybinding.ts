import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const utilityWheelKeyboardCycleRight = {
  id: "01a18481-2b9a-7b95-8112-f45995e14dff",
  type: "page-type/temper-keybinding",
  slug: "utility-wheel-keyboard-cycle-right",
  title: "Cycle Right",
  key: "UTILITY_WHEEL_KEYBOARD_CYCLE_RIGHT",
  layer: "utility-wheel",
  category: "keyboard",
  bindings: [{ slot: 1, key: "KEY_MOUSE_RIGHT" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
