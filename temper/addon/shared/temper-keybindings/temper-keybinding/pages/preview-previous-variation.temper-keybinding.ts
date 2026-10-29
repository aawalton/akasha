import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const previewPreviousVariation = {
  id: "01a187af-33aa-72b1-8078-4ed2b37c507a",
  type: "page-type/temper-keybinding",
  slug: "preview-previous-variation",
  key: "PREVIEW_PREVIOUS_VARIATION",
  layer: "previewstatenavigation",
  bindings: [
    { slot: 1, key: "KEY_LEFTARROW" },
    { slot: 2, key: "KEY_GAMEPAD_DPAD_LEFT" },
    { slot: 3, key: "KEY_GAMEPAD_LSTICK_LEFT" },
  ],
  shared: false,
  changedAt: "2026-10-29T12:27:32.000Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
  createdAt: "2026-10-29T12:42:49.704Z",
} as const satisfies TemperKeybinding
