import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const playerToPlayerInteractAccept = {
  id: "01a18481-2b95-72f3-a6ca-37e750756c86",
  type: "page-type/temper-keybinding",
  slug: "player-to-player-interact-accept",
  title: "Accept Notification",
  key: "PLAYER_TO_PLAYER_INTERACT_ACCEPT",
  layer: "notifications",
  bindings: [
    { slot: 1, key: "KEY_F" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_1" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
