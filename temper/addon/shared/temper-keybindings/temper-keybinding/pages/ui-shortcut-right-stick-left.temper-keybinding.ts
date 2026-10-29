import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutRightStickLeft = {
  id: "01a18481-2b99-799e-9757-af84bfe82de9",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-right-stick-left",
  title: "Right Stick Left",
  key: "UI_SHORTCUT_RIGHT_STICK_LEFT",
  layer: "user-interface-shortcuts",
  category: "gamepad",
  bindings: [{ slot: 1, key: "KEY_NUMPAD4" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
