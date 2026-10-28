import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorRedoAction = {
  id: "01a18481-2b93-7af0-9958-5270294e5620",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-redo-action",
  key: "HOUSING_EDITOR_REDO_ACTION",
  bindings: [
    { slot: 1, key: "KEY_Y" },
    { slot: 2, key: "KEY_GAMEPAD_RIGHT_SHOULDER" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
