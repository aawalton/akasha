import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const startChatSlash = {
  id: "01a18481-2b96-781b-a2f8-69ef1bb6ba7a",
  type: "page-type/temper-keybinding",
  slug: "start-chat-slash",
  title: "Start Chat Slash",
  key: "START_CHAT_SLASH",
  layer: "general",
  category: "user-interface",
  bindings: [{ slot: 1, key: "KEY_OEM_2_FORWARD_SLASH" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
