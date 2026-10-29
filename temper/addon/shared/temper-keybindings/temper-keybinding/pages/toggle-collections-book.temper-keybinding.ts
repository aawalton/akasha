import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleCollectionsBook = {
  id: "01a18481-2b97-7a94-b069-3158f2b45cbe",
  type: "page-type/temper-keybinding",
  slug: "toggle-collections-book",
  title: "Collections",
  key: "TOGGLE_COLLECTIONS_BOOK",
  layer: "general",
  category: "user-interface",
  bindings: [{ slot: 1, key: "KEY_U" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
