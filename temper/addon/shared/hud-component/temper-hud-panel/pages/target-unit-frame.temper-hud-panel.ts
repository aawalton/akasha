import type { TemperHudPanel } from "akasha/temper/addon/shared/hud-component/temper-hud-panel/temper-hud-panel.page-type.types.ts"

export const targetUnitFrame = {
  id: "01a17ec6-f0ff-7414-9808-2b8c95c8ff24",
  type: "page-type/temper-hud-panel",
  slug: "target-unit-frame",
  title: "Target unit frame",
  key: "ZO_TargetUnitFrame",
  dock: "temper-hud-dock/top",
  displayOrder: 2,
  inputModes: ["keyboard"],
  createdAt: "2026-10-27T19:12:09.468Z",
  updatedAt: "2026-10-27T20:15:17.769Z",
} as const satisfies TemperHudPanel
