import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutInputDown = {
  id: "01a18481-2b98-7780-b459-03d14127bc39",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-input-down",
  title: "D-Pad Down",
  key: "UI_SHORTCUT_INPUT_DOWN",
  layer: "user-interface-shortcuts",
  category: "gamepad",
  bindings: [
    { slot: 1, key: "KEY_DOWNARROW" },
    { slot: 2, key: "KEY_GAMEPAD_DPAD_DOWN" },
    { slot: 3, key: "KEY_GAMEPAD_LSTICK_DOWN" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
