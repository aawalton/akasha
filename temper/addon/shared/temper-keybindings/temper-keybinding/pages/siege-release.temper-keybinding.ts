import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const siegeRelease = {
  id: "01a18481-2b95-7c58-9e5f-6a1ea1b4e601",
  type: "page-type/temper-keybinding",
  slug: "siege-release",
  title: "Exit Siege Weapon",
  key: "SIEGE_RELEASE",
  layer: "siege",
  bindings: [
    { slot: 1, key: "KEY_BACKSPACE" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_2" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
