import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorRollRight = {
  id: "01a18481-2b93-7161-b919-c82de56b596b",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-roll-right",
  key: "HOUSING_EDITOR_ROLL_RIGHT",
  bindings: [
    { slot: 1, key: "KEY_6" },
    { slot: 2, key: "KEY_GAMEPAD_RIGHT_SHOULDER" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
