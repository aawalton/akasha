import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const battlegroundScoreboardPreviousDummy = {
  id: "01a18481-2b90-7ec5-94b3-260d0cbe1d53",
  type: "page-type/temper-keybinding",
  slug: "battleground-scoreboard-previous-dummy",
  title: "Scoreboard Previous Player",
  key: "BATTLEGROUND_SCOREBOARD_PREVIOUS_DUMMY",
  layer: "battlegrounds",
  bindings: [
    { slot: 1, key: "KEY_MOUSEWHEEL_UP" },
    { slot: 2, key: "KEY_1" },
    { slot: 3, key: "KEY_GAMEPAD_LEFT_SHOULDER" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
