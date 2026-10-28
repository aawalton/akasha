import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uiShortcutShowQuestOnMap = {
  id: "01a18481-2b9a-77f7-a907-c6c29a74d60d",
  type: "page-type/temper-keybinding",
  slug: "ui-shortcut-show-quest-on-map",
  key: "UI_SHORTCUT_SHOW_QUEST_ON_MAP",
  bindings: [{ slot: 3, key: "KEY_M" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
