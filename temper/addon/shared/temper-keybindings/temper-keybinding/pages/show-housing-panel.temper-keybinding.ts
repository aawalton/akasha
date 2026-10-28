import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const showHousingPanel = {
  id: "01a18481-2b95-7da7-b122-cead43461282",
  type: "page-type/temper-keybinding",
  slug: "show-housing-panel",
  key: "SHOW_HOUSING_PANEL",
  bindings: [
    { slot: 1, key: "KEY_F5" },
    { slot: 2, key: "KEY_GAMEPAD_BOTH_DPAD_RIGHT_BUTTON_2" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
