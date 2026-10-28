import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleJournal = {
  id: "01a18481-2b98-73fe-b19b-b760bbedc0fb",
  type: "page-type/temper-keybinding",
  slug: "toggle-journal",
  key: "TOGGLE_JOURNAL",
  bindings: [{ slot: 1, key: "KEY_J" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
