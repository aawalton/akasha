import type { TemperHudPanel } from "akasha/temper/addon/shared/hud-component/temper-hud-panel/temper-hud-panel.page-type.types.ts"

export const playerAttributes = {
  id: "01a17ec6-f0fe-7c41-8ec5-06b10fbf46f9",
  type: "page-type/temper-hud-panel",
  slug: "player-attributes",
  title: "Health, magicka and stamina",
  key: "ZO_PlayerAttribute",
  dock: "temper-hud-dock/bottom",
  displayOrder: 2,
  inputModes: ["keyboard"],
  createdAt: "2026-10-27T19:12:09.468Z",
  updatedAt: "2026-10-27T20:15:17.769Z",
} as const satisfies TemperHudPanel
