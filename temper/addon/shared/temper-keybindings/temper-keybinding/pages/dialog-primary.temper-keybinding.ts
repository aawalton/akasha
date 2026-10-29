import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const dialogPrimary = {
  id: "01a18481-2b91-719e-a23e-fdf6d2a07ddc",
  type: "page-type/temper-keybinding",
  slug: "dialog-primary",
  title: "Primary Dialog Action",
  key: "DIALOG_PRIMARY",
  layer: "dialogs",
  bindings: [
    { slot: 1, key: "KEY_E" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_1" },
    { slot: 3, key: "KEY_F1" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
