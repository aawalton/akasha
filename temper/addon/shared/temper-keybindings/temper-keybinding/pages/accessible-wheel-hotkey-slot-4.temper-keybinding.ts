import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const accessibleWheelHotkeySlot4 = {
  id: "01a18481-2b8e-767d-af6e-25daeedfa82a",
  type: "page-type/temper-keybinding",
  slug: "accessible-wheel-hotkey-slot-4",
  title: "Slot 4",
  key: "ACCESSIBLE_WHEEL_HOTKEY_SLOT_4",
  layer: "togglable-quickwheel-hotkeys",
  bindings: [
    { slot: 1, key: "KEY_4" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_2" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
