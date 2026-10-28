import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutRightTrigger = {
  id: "01a18481-2b9a-7914-9749-31deabdc1fc0",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-right-trigger",
  key: "UI_SHORTCUT_RIGHT_TRIGGER",
  bindings: [
    { slot: 1, key: "KEY_9" },
    { slot: 2, key: "KEY_GAMEPAD_RIGHT_TRIGGER" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
