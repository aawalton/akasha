import type { TemperHudPanel } from "akasha/temper/addon/shared/hud-component/temper-hud-panel/temper-hud-panel.page-type.types.ts"

export const hudTrackers = {
  id: "01a17ec6-f0fe-7c7f-9742-d7d8c798a5ff",
  type: "page-type/temper-hud-panel",
  slug: "hud-trackers",
  title: "Quest and activity trackers",
  key: "ZO_HUDTrackers",
  dock: "temper-hud-dock/top-right",
  displayOrder: 1,
  measuredBy: "ZO_HUDTrackersScrollContainerScrollChild",
  createdAt: "2026-10-27T19:12:09.468Z",
  updatedAt: "2026-10-27T19:40:20.910Z",
} as const satisfies TemperHudPanel
