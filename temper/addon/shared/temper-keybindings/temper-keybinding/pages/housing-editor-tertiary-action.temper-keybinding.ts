import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorTertiaryAction = {
  id: "01a18481-2b94-7fed-bf46-f46b9d1a68c8",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-tertiary-action",
  title: "Tertiary Action",
  key: "HOUSING_EDITOR_TERTIARY_ACTION",
  layer: "housing-editor",
  bindings: [
    { slot: 1, key: "KEY_F" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_4" },
    { slot: 3, key: "KEY_F3" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
