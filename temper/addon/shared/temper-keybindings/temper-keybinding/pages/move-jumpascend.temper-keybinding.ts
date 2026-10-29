import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const moveJumpascend = {
  id: "01a18481-2b94-7c78-bde0-6c58ecfb5fa8",
  type: "page-type/temper-keybinding",
  slug: "move-jumpascend",
  title: "Jump",
  key: "MOVE_JUMPASCEND",
  layer: "general",
  category: "movement",
  bindings: [{ slot: 1, key: "KEY_SPACEBAR" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
