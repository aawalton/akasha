import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleGameCameraUiMode = {
  id: "01a18481-2b97-7919-b7e1-a471c6523006",
  type: "page-type/temper-keybinding",
  slug: "toggle-game-camera-ui-mode",
  title: "Character Windows",
  key: "TOGGLE_GAME_CAMERA_UI_MODE",
  layer: "general",
  category: "user-interface",
  bindings: [{ slot: 2, key: "KEY_GAMEPAD_START" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
