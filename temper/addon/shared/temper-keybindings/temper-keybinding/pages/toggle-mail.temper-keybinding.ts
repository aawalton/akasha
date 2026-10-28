import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleMail = {
  id: "01a18481-2b98-723e-98d0-2b6f45cecfbb",
  type: "page-type/temper-keybinding",
  slug: "toggle-mail",
  key: "TOGGLE_MAIL",
  bindings: [{ slot: 1, key: "KEY_OEM_7_SINGLE_QUOTE" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
