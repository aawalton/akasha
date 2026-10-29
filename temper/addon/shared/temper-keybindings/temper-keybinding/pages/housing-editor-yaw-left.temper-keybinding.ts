import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorYawLeft = {
  id: "01a18481-2b94-74d4-939b-c20501891ec7",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-yaw-left",
  title: "Yaw Left",
  key: "HOUSING_EDITOR_YAW_LEFT",
  layer: "housing-editor-placement-mode",
  bindings: [
    { slot: 1, key: "KEY_1" },
    { slot: 2, key: "KEY_GAMEPAD_DPAD_LEFT" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
