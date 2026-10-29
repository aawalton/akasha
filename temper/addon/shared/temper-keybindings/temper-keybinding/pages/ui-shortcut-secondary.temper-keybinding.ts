import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutSecondary = {
  id: "01a18481-2b9a-72b8-8e57-633242a7dc55",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-secondary",
  title: "Secondary Action",
  key: "UI_SHORTCUT_SECONDARY",
  layer: "user-interface-shortcuts",
  category: "general",
  bindings: [
    { slot: 1, key: "KEY_R" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_3" },
    { slot: 3, key: "KEY_F2" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
