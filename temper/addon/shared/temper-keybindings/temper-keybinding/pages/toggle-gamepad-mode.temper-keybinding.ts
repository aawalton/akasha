import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleGamepadMode = {
  id: "01a18481-2b97-7f12-bf18-d88f604c7488",
  type: "page-type/temper-keybinding",
  slug: "toggle-gamepad-mode",
  title: "Toggle Gamepad Mode",
  key: "TOGGLE_GAMEPAD_MODE",
  layer: "general",
  category: "user-interface",
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
