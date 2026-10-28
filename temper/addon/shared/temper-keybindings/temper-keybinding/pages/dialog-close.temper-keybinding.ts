import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const dialogClose = {
  id: "01a18481-2b91-7f4d-b078-96da8e1f7b54",
  type: "page-type/temper-keybinding",
  slug: "dialog-close",
  key: "DIALOG_CLOSE",
  bindings: [
    { slot: 1, key: "KEY_ESCAPE" },
    { slot: 2, key: "KEY_GAMEPAD_START" },
    { slot: 3, key: "KEY_GAMEPAD_BACK" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
