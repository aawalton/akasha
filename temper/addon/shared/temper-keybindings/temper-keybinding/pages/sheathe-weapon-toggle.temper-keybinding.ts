import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const sheatheWeaponToggle = {
  id: "01a18481-2b95-72d0-b857-6c7d5ae9eccb",
  type: "page-type/temper-keybinding",
  slug: "sheathe-weapon-toggle",
  title: "Sheathe/Unsheathe",
  key: "SHEATHE_WEAPON_TOGGLE",
  layer: "general",
  category: "combat",
  bindings: [
    { slot: 1, key: "KEY_Z" },
    { slot: 2, key: "KEY_GAMEPAD_DPAD_UP_HOLD" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
