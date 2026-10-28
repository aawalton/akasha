import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorPitchForward = {
  id: "01a18481-2b93-7e52-8c7c-d386d531bedb",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-pitch-forward",
  key: "HOUSING_EDITOR_PITCH_FORWARD",
  bindings: [
    { slot: 1, key: "KEY_3" },
    { slot: 2, key: "KEY_GAMEPAD_DPAD_UP" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
