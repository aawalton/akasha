import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const battlegroundScoreboardNextDummy = {
  id: "01a18481-2b90-7b6f-9a97-d0846833cc64",
  type: "page-type/temper-keybinding",
  slug: "battleground-scoreboard-next-dummy",
  title: "Scoreboard Next Player",
  key: "BATTLEGROUND_SCOREBOARD_NEXT_DUMMY",
  layer: "battlegrounds",
  bindings: [
    { slot: 1, key: "KEY_MOUSEWHEEL_DOWN" },
    { slot: 2, key: "KEY_3" },
    { slot: 3, key: "KEY_GAMEPAD_RIGHT_SHOULDER" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
