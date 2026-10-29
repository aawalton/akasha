import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleTamrielTomes = {
  id: "01a18481-2b98-7747-a8cc-3d70573572e6",
  type: "page-type/temper-keybinding",
  slug: "toggle-tamriel-tomes",
  title: "Tamriel Tomes",
  key: "TOGGLE_TAMRIEL_TOMES",
  layer: "general",
  category: "user-interface",
  bindings: [{ slot: 1, key: "KEY_F4" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
