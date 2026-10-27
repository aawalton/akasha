import type { TemperHudPanel } from "akasha/temper/addon/shared/hud-component/temper-hud-panel/temper-hud-panel.page-type.types.ts"

export const nextBossTimetable = {
  id: "01a17ee1-4e74-741c-b00e-04090898c4bc",
  type: "page-type/temper-hud-panel",
  slug: "next-boss-timetable",
  title: "Next boss timetable",
  key: "TemperNextBossTimeTable",
  dock: "temper-hud-dock/top-left",
  displayOrder: 2,
  inputModes: ["keyboard"],
  createdAt: "2026-10-27T19:40:57.331Z",
  updatedAt: "2026-10-27T20:15:17.769Z",
} as const satisfies TemperHudPanel
