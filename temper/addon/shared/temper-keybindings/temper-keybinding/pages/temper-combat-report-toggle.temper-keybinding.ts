import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const temperCombatReportToggle = {
  id: "01a18481-2b96-70d7-9c4b-0aea59ea097e",
  type: "page-type/temper-keybinding",
  slug: "temper-combat-report-toggle",
  title: "Toggle Fight Report",
  key: "TEMPER_COMBAT_REPORT_TOGGLE",
  layer: "general",
  category: "combatmetrics",
  bindings: [{ slot: 1, key: "KEY_F12" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
