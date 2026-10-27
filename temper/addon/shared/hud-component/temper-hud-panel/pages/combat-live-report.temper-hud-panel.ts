import type { TemperHudPanel } from "akasha/temper/addon/shared/hud-component/temper-hud-panel/temper-hud-panel.page-type.types.ts"

export const combatLiveReport = {
  id: "01a17ee1-cd31-7270-a8a7-2c2d7ea58a13",
  type: "page-type/temper-hud-panel",
  slug: "combat-live-report",
  title: "Live combat report",
  key: "TemperCombat_LiveReport",
  dock: "temper-hud-dock/left",
  displayOrder: 2,
  inputModes: ["keyboard"],
  createdAt: "2026-10-27T19:41:29.776Z",
  updatedAt: "2026-10-27T20:15:17.769Z",
} as const satisfies TemperHudPanel
