import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleWalk = {
  id: "01a18481-2b98-7b69-bf6c-395c914cfe18",
  type: "page-type/temper-keybinding",
  slug: "toggle-walk",
  title: "Toggle Walk / Run",
  key: "TOGGLE_WALK",
  layer: "general",
  category: "movement",
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
