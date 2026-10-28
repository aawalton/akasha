import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleSystem = {
  id: "01a18481-2b98-7341-a55c-29c61e745516",
  type: "page-type/temper-keybinding",
  slug: "toggle-system",
  key: "TOGGLE_SYSTEM",
  bindings: [{ slot: 1, key: "KEY_ESCAPE" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
