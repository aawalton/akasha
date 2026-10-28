import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutInputUp = {
  id: "01a18481-2b98-7269-932c-f4523eb76265",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-input-up",
  key: "UI_SHORTCUT_INPUT_UP",
  bindings: [
    { slot: 1, key: "KEY_UPARROW" },
    { slot: 2, key: "KEY_GAMEPAD_DPAD_UP" },
    { slot: 3, key: "KEY_GAMEPAD_LSTICK_UP" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
