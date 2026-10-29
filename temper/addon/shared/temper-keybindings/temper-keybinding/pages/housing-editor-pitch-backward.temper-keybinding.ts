import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorPitchBackward = {
  id: "01a18481-2b93-7772-a238-b5c8b0383ade",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-pitch-backward",
  title: "Pitch Backward",
  key: "HOUSING_EDITOR_PITCH_BACKWARD",
  layer: "housing-editor-placement-mode",
  bindings: [
    { slot: 1, key: "KEY_4" },
    { slot: 2, key: "KEY_GAMEPAD_DPAD_DOWN" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
