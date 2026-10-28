import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleFirstPerson = {
  id: "01a18481-2b97-7026-978e-285364dcc118",
  type: "page-type/temper-keybinding",
  slug: "toggle-first-person",
  key: "TOGGLE_FIRST_PERSON",
  bindings: [{ slot: 1, key: "KEY_V" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
