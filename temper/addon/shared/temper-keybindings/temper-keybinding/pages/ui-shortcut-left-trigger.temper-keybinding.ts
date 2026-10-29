import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutLeftTrigger = {
  id: "01a18481-2b99-7d3f-ba29-5fdeaf17e607",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-left-trigger",
  title: "Left Trigger",
  key: "UI_SHORTCUT_LEFT_TRIGGER",
  layer: "user-interface-shortcuts",
  category: "gamepad",
  bindings: [
    { slot: 1, key: "KEY_7" },
    { slot: 2, key: "KEY_GAMEPAD_LEFT_TRIGGER" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
