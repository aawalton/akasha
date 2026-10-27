import type { TemperHudPanel } from "akasha/temper/addon/shared/hud-component/temper-hud-panel/temper-hud-panel.page-type.types.ts"

export const actionBar = {
  id: "01a17ec6-f0fc-7a9d-971f-4d373bbfe881",
  type: "page-type/temper-hud-panel",
  slug: "action-bar",
  title: "Action bar",
  key: "ZO_ActionBar1",
  dock: "temper-hud-dock/bottom",
  displayOrder: 1,
  neverMoves: true,
  createdAt: "2026-10-27T19:12:09.468Z",
  updatedAt: "2026-10-27T19:12:09.468Z",
} as const satisfies TemperHudPanel
