import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const porttofriendshouseOpen = {
  id: "01a18481-2b95-7bbb-bbc2-84ac55678945",
  type: "page-type/temper-keybinding",
  slug: "porttofriendshouse-open",
  title: "Toggle Port Window",
  key: "PORTTOFRIENDSHOUSE_OPEN",
  layer: "general",
  category: "temper-houses",
  bindings: [{ slot: 1, key: "KEY_NUMPAD3" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
