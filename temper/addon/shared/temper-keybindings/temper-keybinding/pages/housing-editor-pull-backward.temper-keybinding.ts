import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorPullBackward = {
  id: "01a18481-2b93-75a6-94d7-3df0596b5b53",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-pull-backward",
  title: "Pull Backward",
  key: "HOUSING_EDITOR_PULL_BACKWARD",
  layer: "housing-editor-placement-mode",
  bindings: [
    { slot: 1, key: "KEY_MOUSEWHEEL_DOWN" },
    { slot: 2, key: "KEY_7" },
    { slot: 3, key: "KEY_GAMEPAD_LEFT_TRIGGER" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
