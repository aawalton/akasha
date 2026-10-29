import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutLeftStickUp = {
  id: "01a18481-2b99-7c1f-939b-5c75e5fe08cf",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-left-stick-up",
  title: "Left Stick Up",
  key: "UI_SHORTCUT_LEFT_STICK_UP",
  layer: "user-interface-shortcuts",
  category: "gamepad",
  bindings: [{ slot: 1, key: "KEY_W" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
