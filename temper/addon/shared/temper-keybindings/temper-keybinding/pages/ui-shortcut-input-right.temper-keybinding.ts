import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutInputRight = {
  id: "01a18481-2b98-75b8-9217-05ed26aa325d",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-input-right",
  title: "D-Pad Right",
  key: "UI_SHORTCUT_INPUT_RIGHT",
  layer: "user-interface-shortcuts",
  category: "gamepad",
  bindings: [
    { slot: 1, key: "KEY_RIGHTARROW" },
    { slot: 2, key: "KEY_GAMEPAD_DPAD_RIGHT" },
    { slot: 3, key: "KEY_GAMEPAD_LSTICK_RIGHT" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
