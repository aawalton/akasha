import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const battlegroundScoreboardPreviousRoundDummy = {
  id: "01a187af-33a9-7522-ab0e-ad7e4037d736",
  type: "page-type/temper-keybinding",
  slug: "battleground-scoreboard-previous-round-dummy",
  key: "BATTLEGROUND_SCOREBOARD_PREVIOUS_ROUND_DUMMY",
  layer: "battlegrounds",
  bindings: [
    { slot: 1, key: "KEY_7" },
    { slot: 2, key: "KEY_GAMEPAD_LEFT_TRIGGER" },
  ],
  shared: false,
  changedAt: "2026-10-29T12:27:32.000Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
  createdAt: "2026-10-29T12:42:49.704Z",
} as const satisfies TemperKeybinding
