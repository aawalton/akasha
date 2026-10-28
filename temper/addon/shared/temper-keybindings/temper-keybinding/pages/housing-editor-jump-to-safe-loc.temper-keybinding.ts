import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorJumpToSafeLoc = {
  id: "01a18481-2b93-7e51-8337-0fdcd7f1c485",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-jump-to-safe-loc",
  key: "HOUSING_EDITOR_JUMP_TO_SAFE_LOC",
  bindings: [
    { slot: 1, key: "KEY_H" },
    { slot: 2, key: "KEY_GAMEPAD_RIGHT_STICK" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
