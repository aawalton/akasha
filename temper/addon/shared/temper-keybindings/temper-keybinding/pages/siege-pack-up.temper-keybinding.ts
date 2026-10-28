import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const siegePackUp = {
  id: "01a18481-2b95-7577-8c8e-84e3d9f54ac2",
  type: "page-type/temper-keybinding",
  slug: "siege-pack-up",
  key: "SIEGE_PACK_UP",
  bindings: [
    { slot: 1, key: "KEY_X" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_4" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
