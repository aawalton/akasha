import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const cameraZoomOut = {
  id: "01a18481-2b90-7094-9ef0-9906ac2a492a",
  type: "page-type/temper-keybinding",
  slug: "camera-zoom-out",
  key: "CAMERA_ZOOM_OUT",
  bindings: [{ slot: 1, key: "KEY_MOUSEWHEEL_DOWN" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
