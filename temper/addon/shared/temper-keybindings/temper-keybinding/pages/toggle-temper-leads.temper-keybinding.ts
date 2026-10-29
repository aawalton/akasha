import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleTemperLeads = {
  id: "01a187af-33aa-72b2-b799-5207a53fba74",
  type: "page-type/temper-keybinding",
  slug: "toggle-temper-leads",
  title: "Toggle Display Leads Window",
  key: "TOGGLE_TEMPER_LEADS",
  layer: "general",
  category: "temper-leads",
  bindings: [{ slot: 1, key: "KEY_NUMPAD5" }],
  shared: false,
  changedAt: "2026-10-29T12:27:32.000Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
  createdAt: "2026-10-29T12:42:49.704Z",
} as const satisfies TemperKeybinding
