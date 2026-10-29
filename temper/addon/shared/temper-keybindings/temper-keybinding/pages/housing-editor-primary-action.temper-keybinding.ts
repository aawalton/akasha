import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorPrimaryAction = {
  id: "01a18481-2b93-7b2c-8505-d8383ac2396f",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-primary-action",
  title: "Primary Action",
  key: "HOUSING_EDITOR_PRIMARY_ACTION",
  layer: "housing-editor",
  bindings: [
    { slot: 1, key: "KEY_MOUSE_LEFT" },
    { slot: 2, key: "KEY_E" },
    { slot: 3, key: "KEY_F1" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
