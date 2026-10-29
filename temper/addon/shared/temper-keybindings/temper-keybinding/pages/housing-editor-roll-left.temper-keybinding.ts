import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorRollLeft = {
  id: "01a18481-2b93-7844-a6aa-2fb9c2f59c5c",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-roll-left",
  title: "Roll Left",
  key: "HOUSING_EDITOR_ROLL_LEFT",
  layer: "housing-editor-placement-mode",
  bindings: [
    { slot: 1, key: "KEY_5" },
    { slot: 2, key: "KEY_GAMEPAD_LEFT_SHOULDER" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
