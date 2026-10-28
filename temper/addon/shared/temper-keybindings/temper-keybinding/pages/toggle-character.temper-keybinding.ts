import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleCharacter = {
  id: "01a18481-2b97-7192-b748-418893d59784",
  type: "page-type/temper-keybinding",
  slug: "toggle-character",
  key: "TOGGLE_CHARACTER",
  bindings: [{ slot: 1, key: "KEY_C" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
