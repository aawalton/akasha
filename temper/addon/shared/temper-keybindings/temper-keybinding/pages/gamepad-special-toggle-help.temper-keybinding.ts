import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const gamepadSpecialToggleHelp = {
  id: "01a187af-33a9-7524-8bdb-7b4c1d8d771d",
  type: "page-type/temper-keybinding",
  slug: "gamepad-special-toggle-help",
  key: "GAMEPAD_SPECIAL_TOGGLE_HELP",
  layer: "specialtogglehelp",
  bindings: [
    { slot: 1, key: "KEY_F1" },
    { slot: 2, key: "KEY_GAMEPAD_BACK_HOLD" },
  ],
  shared: false,
  changedAt: "2026-10-29T12:27:32.000Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
  createdAt: "2026-10-29T12:42:49.704Z",
} as const satisfies TemperKeybinding
