import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const battlegroundScoreboardPlayerOptionsDummy = {
  id: "01a18481-2b90-7006-b314-9e96ecc24485",
  type: "page-type/temper-keybinding",
  slug: "battleground-scoreboard-player-options-dummy",
  title: "Scoreboard Player Options",
  key: "BATTLEGROUND_SCOREBOARD_PLAYER_OPTIONS_DUMMY",
  layer: "battlegrounds",
  bindings: [
    { slot: 1, key: "KEY_R" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_3" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
