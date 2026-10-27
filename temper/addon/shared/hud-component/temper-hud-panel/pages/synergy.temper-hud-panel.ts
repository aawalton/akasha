import type { TemperHudPanel } from "akasha/temper/addon/shared/hud-component/temper-hud-panel/temper-hud-panel.page-type.types.ts"

export const synergy = {
  id: "01a17ec6-f0fe-7ff2-8199-85eb99e161e3",
  type: "page-type/temper-hud-panel",
  slug: "synergy",
  title: "Synergy prompt",
  key: "ZO_SynergyTopLevelContainer",
  dock: "temper-hud-dock/bottom",
  displayOrder: 3,
  inputModes: ["keyboard"],
  createdAt: "2026-10-27T19:12:09.468Z",
  updatedAt: "2026-10-27T20:15:17.769Z",
} as const satisfies TemperHudPanel
