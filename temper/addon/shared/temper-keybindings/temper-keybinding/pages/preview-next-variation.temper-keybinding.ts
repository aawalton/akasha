import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const previewNextVariation = {
  id: "01a187af-33aa-72af-a553-9c7b87ac5511",
  type: "page-type/temper-keybinding",
  slug: "preview-next-variation",
  key: "PREVIEW_NEXT_VARIATION",
  layer: "previewstatenavigation",
  bindings: [
    { slot: 1, key: "KEY_RIGHTARROW" },
    { slot: 2, key: "KEY_GAMEPAD_DPAD_RIGHT" },
    { slot: 3, key: "KEY_GAMEPAD_LSTICK_RIGHT" },
  ],
  shared: false,
  changedAt: "2026-10-29T12:27:32.000Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
  createdAt: "2026-10-29T12:42:49.704Z",
} as const satisfies TemperKeybinding
