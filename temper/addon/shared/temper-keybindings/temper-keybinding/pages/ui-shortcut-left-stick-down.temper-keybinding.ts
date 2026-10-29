import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutLeftStickDown = {
  id: "01a18481-2b99-7282-8ac0-ea7c940fa64a",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-left-stick-down",
  title: "Left Stick Down",
  key: "UI_SHORTCUT_LEFT_STICK_DOWN",
  layer: "user-interface-shortcuts",
  category: "gamepad",
  bindings: [{ slot: 1, key: "KEY_S" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
