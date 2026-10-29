import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const siegeFire = {
  id: "01a18481-2b95-712c-a461-153b341de681",
  type: "page-type/temper-keybinding",
  slug: "siege-fire",
  title: "Fire Siege Weapon",
  key: "SIEGE_FIRE",
  layer: "siege",
  bindings: [
    { slot: 1, key: "KEY_MOUSE_LEFT" },
    { slot: 2, key: "KEY_9" },
    { slot: 3, key: "KEY_GAMEPAD_RIGHT_TRIGGER" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
