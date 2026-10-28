import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleBattlegroundScoreboardDummy = {
  id: "01a18481-2b97-7c75-b309-fa13823a2f31",
  type: "page-type/temper-keybinding",
  slug: "toggle-battleground-scoreboard-dummy",
  key: "TOGGLE_BATTLEGROUND_SCOREBOARD_DUMMY",
  bindings: [
    { slot: 1, key: "KEY_F5" },
    { slot: 2, key: "KEY_GAMEPAD_BOTH_DPAD_RIGHT_BUTTON_2" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
