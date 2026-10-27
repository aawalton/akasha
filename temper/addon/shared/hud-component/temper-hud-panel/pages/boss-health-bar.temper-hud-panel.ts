import type { TemperHudPanel } from "akasha/temper/addon/shared/hud-component/temper-hud-panel/temper-hud-panel.page-type.types.ts"

export const bossHealthBar = {
  id: "01a17ee1-9fef-799f-857a-88d9d38a6c50",
  type: "page-type/temper-hud-panel",
  slug: "boss-health-bar",
  title: "Boss health bar",
  key: "TemperCombatAlertsBossHealthBarContainer",
  dock: "temper-hud-dock/left",
  displayOrder: 1,
  createdAt: "2026-10-27T19:41:18.190Z",
  updatedAt: "2026-10-27T19:41:18.190Z",
} as const satisfies TemperHudPanel
