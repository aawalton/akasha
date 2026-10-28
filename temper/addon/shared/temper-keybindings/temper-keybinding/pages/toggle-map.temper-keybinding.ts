import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleMap = {
  id: "01a18481-2b98-7c64-ac47-df8697ce4b21",
  type: "page-type/temper-keybinding",
  slug: "toggle-map",
  key: "TOGGLE_MAP",
  bindings: [{ slot: 1, key: "KEY_M" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
