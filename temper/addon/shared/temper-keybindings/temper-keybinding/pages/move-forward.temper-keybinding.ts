import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const moveForward = {
  id: "01a18481-2b94-7633-9ddc-00e9fca0ad43",
  type: "page-type/temper-keybinding",
  slug: "move-forward",
  title: "Move Forward",
  key: "MOVE_FORWARD",
  layer: "general",
  category: "movement",
  bindings: [
    { slot: 1, key: "KEY_W" },
    { slot: 2, key: "KEY_UPARROW" },
    { slot: 3, key: "KEY_GAMEPAD_LSTICK_UP" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
