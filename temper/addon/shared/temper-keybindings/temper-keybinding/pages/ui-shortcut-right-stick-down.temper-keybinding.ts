import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutRightStickDown = {
  id: "01a18481-2b99-7f08-87ff-b2d39693bd73",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-right-stick-down",
  title: "Right Stick Down",
  key: "UI_SHORTCUT_RIGHT_STICK_DOWN",
  layer: "user-interface-shortcuts",
  category: "gamepad",
  bindings: [{ slot: 1, key: "KEY_NUMPAD2" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
