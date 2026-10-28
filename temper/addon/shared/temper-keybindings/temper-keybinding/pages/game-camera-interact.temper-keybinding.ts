import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const gameCameraInteract = {
  id: "01a18481-2b92-771e-ab89-de2c96e149e5",
  type: "page-type/temper-keybinding",
  slug: "game-camera-interact",
  key: "GAME_CAMERA_INTERACT",
  bindings: [
    { slot: 1, key: "KEY_E" },
    { slot: 3, key: "KEY_F1" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
