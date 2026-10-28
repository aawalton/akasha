import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorQuinaryAction = {
  id: "01a18481-2b93-7955-b5c3-4bb8b995abea",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-quinary-action",
  key: "HOUSING_EDITOR_QUINARY_ACTION",
  bindings: [
    { slot: 1, key: "KEY_Q" },
    { slot: 2, key: "KEY_GAMEPAD_LEFT_TRIGGER" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
