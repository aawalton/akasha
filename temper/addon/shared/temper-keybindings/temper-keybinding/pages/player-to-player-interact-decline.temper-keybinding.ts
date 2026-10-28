import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const playerToPlayerInteractDecline = {
  id: "01a18481-2b95-7cef-8d62-a76c407b2a49",
  type: "page-type/temper-keybinding",
  slug: "player-to-player-interact-decline",
  key: "PLAYER_TO_PLAYER_INTERACT_DECLINE",
  bindings: [
    { slot: 1, key: "KEY_X" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_2" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
