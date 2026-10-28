import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const gameCameraGamepadZoom = {
  id: "01a18481-2b92-77df-9fc9-58a2c71c7739",
  type: "page-type/temper-keybinding",
  slug: "game-camera-gamepad-zoom",
  key: "GAME_CAMERA_GAMEPAD_ZOOM",
  bindings: [{ slot: 1, key: "KEY_GAMEPAD_DPAD_DOWN" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
