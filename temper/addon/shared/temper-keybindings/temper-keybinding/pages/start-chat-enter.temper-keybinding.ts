import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const startChatEnter = {
  id: "01a18481-2b96-720f-bdd8-c699b19acc04",
  type: "page-type/temper-keybinding",
  slug: "start-chat-enter",
  title: "Start Chat",
  key: "START_CHAT_ENTER",
  layer: "general",
  category: "user-interface",
  bindings: [
    { slot: 1, key: "KEY_ENTER" },
    { slot: 2, key: "KEY_GAMEPAD_BOTH_BACK_START" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
