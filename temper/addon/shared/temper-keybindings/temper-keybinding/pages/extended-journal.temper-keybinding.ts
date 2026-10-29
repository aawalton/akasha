import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const extendedJournal = {
  id: "01a18481-2b92-7d5f-a4f7-e1a3e5a50001",
  type: "page-type/temper-keybinding",
  slug: "extended-journal",
  title: "Extended Journal",
  key: "EXTENDED_JOURNAL",
  layer: "general",
  category: "extended-journal",
  bindings: [{ slot: 1, key: "KEY_NUMPAD2" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
