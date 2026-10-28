import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutQuickSlots = {
  id: "01a18481-2b99-7b3a-a1aa-13f3674955e9",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-quick-slots",
  key: "UI_SHORTCUT_QUICK_SLOTS",
  bindings: [
    { slot: 1, key: "KEY_Q" },
    { slot: 2, key: "KEY_GAMEPAD_LEFT_TRIGGER_HOLD" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
