import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const battlegroundScoreboardNextRoundDummy = {
  id: "01a187af-33a9-7521-ac02-0834fa61d5f4",
  type: "page-type/temper-keybinding",
  slug: "battleground-scoreboard-next-round-dummy",
  key: "BATTLEGROUND_SCOREBOARD_NEXT_ROUND_DUMMY",
  layer: "battlegrounds",
  bindings: [
    { slot: 1, key: "KEY_9" },
    { slot: 2, key: "KEY_GAMEPAD_RIGHT_TRIGGER" },
  ],
  shared: false,
  changedAt: "2026-10-29T12:27:32.000Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
  createdAt: "2026-10-29T12:42:49.704Z",
} as const satisfies TemperKeybinding
