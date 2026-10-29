import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const specialMoveWeaponSwap = {
  id: "01a18481-2b96-788a-b91c-349454678f88",
  type: "page-type/temper-keybinding",
  slug: "special-move-weapon-swap",
  title: "Weapon Swap",
  key: "SPECIAL_MOVE_WEAPON_SWAP",
  layer: "general",
  category: "combat",
  bindings: [
    { slot: 1, key: "KEY_OEM_3_TICK" },
    { slot: 3, key: "KEY_GAMEPAD_DPAD_LEFT" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
