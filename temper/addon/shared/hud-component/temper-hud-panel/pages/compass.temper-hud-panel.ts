import type { TemperHudPanel } from "akasha/temper/addon/shared/hud-component/temper-hud-panel/temper-hud-panel.page-type.types.ts"

export const compass = {
  id: "01a17ec6-f0fe-705f-b9ff-2cf2dcd8906e",
  type: "page-type/temper-hud-panel",
  slug: "compass",
  title: "Compass",
  key: "ZO_CompassFrame",
  dock: "temper-hud-dock/top",
  displayOrder: 1,
  createdAt: "2026-10-27T19:12:09.468Z",
  updatedAt: "2026-10-27T19:12:09.468Z",
} as const satisfies TemperHudPanel
