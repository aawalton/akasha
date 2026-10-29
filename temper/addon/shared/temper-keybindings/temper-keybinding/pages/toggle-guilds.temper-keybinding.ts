import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleGuilds = {
  id: "01a18481-2b97-70cd-b0a1-b6e21ef458ce",
  type: "page-type/temper-keybinding",
  slug: "toggle-guilds",
  title: "Guilds",
  key: "TOGGLE_GUILDS",
  layer: "general",
  category: "user-interface",
  bindings: [{ slot: 1, key: "KEY_G" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
