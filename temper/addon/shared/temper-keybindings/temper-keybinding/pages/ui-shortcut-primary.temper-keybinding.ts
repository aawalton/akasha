import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutPrimary = {
  id: "01a18481-2b99-7544-a436-74e7d6b16cc9",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-primary",
  key: "UI_SHORTCUT_PRIMARY",
  bindings: [
    { slot: 1, key: "KEY_E" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_1" },
    { slot: 3, key: "KEY_F1" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
