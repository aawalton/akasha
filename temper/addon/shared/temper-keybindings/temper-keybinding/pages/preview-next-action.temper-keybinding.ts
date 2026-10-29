import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const previewNextAction = {
  id: "01a187af-33aa-72ae-a97b-407df84c9a42",
  type: "page-type/temper-keybinding",
  slug: "preview-next-action",
  key: "PREVIEW_NEXT_ACTION",
  layer: "previewstatenavigation",
  bindings: [
    { slot: 1, key: "KEY_GAMEPAD_DPAD_RIGHT_HOLD" },
    { slot: 2, key: "KEY_4" },
  ],
  shared: false,
  changedAt: "2026-10-29T12:27:32.000Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
  createdAt: "2026-10-29T12:42:49.704Z",
} as const satisfies TemperKeybinding
