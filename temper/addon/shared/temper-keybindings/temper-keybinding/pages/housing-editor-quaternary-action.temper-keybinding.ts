import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorQuaternaryAction = {
  id: "01a18481-2b93-780d-a041-288719668837",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-quaternary-action",
  key: "HOUSING_EDITOR_QUATERNARY_ACTION",
  bindings: [
    { slot: 1, key: "KEY_T" },
    { slot: 2, key: "KEY_GAMEPAD_RIGHT_TRIGGER" },
    { slot: 3, key: "KEY_F4" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
