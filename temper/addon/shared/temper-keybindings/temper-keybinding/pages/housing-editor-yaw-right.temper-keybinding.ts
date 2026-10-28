import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorYawRight = {
  id: "01a18481-2b94-76af-a1cc-0c780f93a2e3",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-yaw-right",
  key: "HOUSING_EDITOR_YAW_RIGHT",
  bindings: [
    { slot: 1, key: "KEY_2" },
    { slot: 2, key: "KEY_GAMEPAD_DPAD_RIGHT" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
