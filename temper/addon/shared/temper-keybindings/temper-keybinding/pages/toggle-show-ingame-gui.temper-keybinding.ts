import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleShowIngameGui = {
  id: "01a18481-2b98-7173-bceb-0d507ad6cc71",
  type: "page-type/temper-keybinding",
  slug: "toggle-show-ingame-gui",
  title: "UI On/Off",
  key: "TOGGLE_SHOW_INGAME_GUI",
  layer: "general",
  category: "user-interface",
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
