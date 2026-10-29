import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorNegativeAction = {
  id: "01a18481-2b93-77b6-943a-673c99047d2b",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-negative-action",
  title: "Negative Action",
  key: "HOUSING_EDITOR_NEGATIVE_ACTION",
  layer: "housing-editor",
  bindings: [
    { slot: 1, key: "KEY_X" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_2" },
    { slot: 3, key: "KEY_F6" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
