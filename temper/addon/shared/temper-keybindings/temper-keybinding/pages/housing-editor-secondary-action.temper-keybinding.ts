import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorSecondaryAction = {
  id: "01a18481-2b93-75d4-ab90-8b6f0ece3e96",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-secondary-action",
  title: "Secondary Action",
  key: "HOUSING_EDITOR_SECONDARY_ACTION",
  layer: "housing-editor",
  bindings: [
    { slot: 1, key: "KEY_R" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_3" },
    { slot: 3, key: "KEY_F2" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
