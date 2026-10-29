import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleMount = {
  id: "01a18481-2b98-7e3a-9672-4f486a0882de",
  type: "page-type/temper-keybinding",
  slug: "toggle-mount",
  title: "Toggle Mount",
  key: "TOGGLE_MOUNT",
  layer: "general",
  category: "movement",
  bindings: [
    { slot: 1, key: "KEY_H" },
    { slot: 2, key: "KEY_GAMEPAD_DPAD_RIGHT_HOLD" },
    { slot: 3, key: "KEY_F6" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
