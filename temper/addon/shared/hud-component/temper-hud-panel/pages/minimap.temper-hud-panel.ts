import type { TemperHudPanel } from "akasha/temper/addon/shared/hud-component/temper-hud-panel/temper-hud-panel.page-type.types.ts"

export const minimap = {
  id: "01a17ff5-933a-7940-95db-80a0cc89d285",
  type: "page-type/temper-hud-panel",
  slug: "minimap",
  title: "Minimap",
  key: "TemperMiniMapPanel",
  dock: "temper-hud-dock/top-right",
  displayOrder: 1,
  inputModes: ["keyboard"],
  createdAt: "2026-10-28T00:42:42.871Z",
  updatedAt: "2026-10-28T00:42:42.871Z",
} as const satisfies TemperHudPanel
