import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const votansToggleMapZoomMinus = {
  id: "01a18481-2b9a-7b5f-a36e-54bfb386bfcd",
  type: "page-type/temper-keybinding",
  slug: "votans-toggle-map-zoom-minus",
  title: "Zoom Step Out",
  key: "VOTANS_TOGGLE_MAP_ZOOM_MINUS",
  layer: "general",
  category: "mini-map",
  bindings: [{ slot: 1, key: "KEY_NUMPAD_MINUS" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
