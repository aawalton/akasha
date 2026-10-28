import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleFullscreen = {
  id: "01a18481-2b97-7a87-b03c-233c38d4f83f",
  type: "page-type/temper-keybinding",
  slug: "toggle-fullscreen",
  key: "TOGGLE_FULLSCREEN",
  bindings: [{ slot: 1, key: "KEY_ENTER", modifiers: ["KEY_ALT"] }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
