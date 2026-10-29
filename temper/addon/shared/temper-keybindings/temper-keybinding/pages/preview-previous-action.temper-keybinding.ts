import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const previewPreviousAction = {
  id: "01a187af-33aa-72b0-92a1-5a7be5aa9d85",
  type: "page-type/temper-keybinding",
  slug: "preview-previous-action",
  key: "PREVIEW_PREVIOUS_ACTION",
  layer: "previewstatenavigation",
  bindings: [
    { slot: 1, key: "KEY_GAMEPAD_DPAD_LEFT_HOLD" },
    { slot: 2, key: "KEY_2" },
  ],
  shared: false,
  changedAt: "2026-10-29T12:27:32.000Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
  createdAt: "2026-10-29T12:42:49.704Z",
} as const satisfies TemperKeybinding
