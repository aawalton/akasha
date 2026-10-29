import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const battlegroundRecapLeave = {
  id: "01a187af-33a9-7520-a773-cf2f86fe2b3b",
  type: "page-type/temper-keybinding",
  slug: "battleground-recap-leave",
  key: "BATTLEGROUND_RECAP_LEAVE",
  layer: "battlegroundroundrecap",
  bindings: [
    { slot: 1, key: "KEY_F" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_4" },
  ],
  shared: false,
  changedAt: "2026-10-29T12:27:32.000Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
  createdAt: "2026-10-29T12:42:49.704Z",
} as const satisfies TemperKeybinding
