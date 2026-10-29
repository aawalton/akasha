import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleHudUi = {
  id: "01a18481-2b97-7565-8aa2-ffb2495fd8c3",
  type: "page-type/temper-keybinding",
  slug: "toggle-hud-ui",
  title: "Toggle In-Game Cursor",
  key: "TOGGLE_HUD_UI",
  layer: "general",
  category: "user-interface",
  bindings: [
    { slot: 1, key: "KEY_OEM_PERIOD" },
    { slot: 2, key: "KEY_B" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
