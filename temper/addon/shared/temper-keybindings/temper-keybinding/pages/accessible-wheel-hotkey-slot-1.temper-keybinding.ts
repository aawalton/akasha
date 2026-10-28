import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const accessibleWheelHotkeySlot1 = {
  id: "01a18481-2b8d-7eab-aae7-ddd35b8a896b",
  type: "page-type/temper-keybinding",
  slug: "accessible-wheel-hotkey-slot-1",
  key: "ACCESSIBLE_WHEEL_HOTKEY_SLOT_1",
  bindings: [
    { slot: 1, key: "KEY_1" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_1" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
