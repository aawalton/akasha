import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutLeftShoulder = {
  id: "01a18481-2b99-702b-a0f3-228b0d6978f4",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-left-shoulder",
  key: "UI_SHORTCUT_LEFT_SHOULDER",
  bindings: [
    { slot: 1, key: "KEY_1" },
    { slot: 2, key: "KEY_GAMEPAD_LEFT_SHOULDER" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
