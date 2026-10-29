import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorUndoAction = {
  id: "01a18481-2b94-7f71-91ac-c32adc8d1233",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-undo-action",
  title: "Undo Action",
  key: "HOUSING_EDITOR_UNDO_ACTION",
  layer: "housing-editor",
  bindings: [
    { slot: 1, key: "KEY_Z" },
    { slot: 2, key: "KEY_GAMEPAD_LEFT_SHOULDER" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
