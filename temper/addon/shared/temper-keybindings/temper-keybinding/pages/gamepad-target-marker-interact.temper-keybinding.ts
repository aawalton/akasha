import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const gamepadTargetMarkerInteract = {
  id: "01a18481-2b92-71b2-a4b6-9c39606f265f",
  type: "page-type/temper-keybinding",
  slug: "gamepad-target-marker-interact",
  title: "Gamepad Target Marker Wheel",
  key: "GAMEPAD_TARGET_MARKER_INTERACT",
  layer: "general",
  category: "targeting",
  bindings: [{ slot: 1, key: "KEY_GAMEPAD_DPAD_DOWN_HOLD" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
