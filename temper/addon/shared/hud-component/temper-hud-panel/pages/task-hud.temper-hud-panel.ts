import type { TemperHudPanel } from "akasha/temper/addon/shared/hud-component/temper-hud-panel/temper-hud-panel.page-type.types.ts"

export const taskHud = {
  id: "01a17ec6-f0ff-707a-9adc-18e492c552ef",
  type: "page-type/temper-hud-panel",
  slug: "task-hud",
  title: "Temper tasks",
  key: "TemperTaskHUD_v2",
  dock: "temper-hud-dock/top-right",
  displayOrder: 2,
  createdAt: "2026-10-27T19:12:09.468Z",
  updatedAt: "2026-10-27T19:12:09.468Z",
} as const satisfies TemperHudPanel
