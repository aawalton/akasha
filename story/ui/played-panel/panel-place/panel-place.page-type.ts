import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const panelPlace = {
  id: "01a0c4cc-9091-7ea4-a3aa-6a4d2c413b4f",
  type: "page-type/page-type",
  slug: "panel-place",
  definition: "where in a played story's layout a panel is drawn",
  extends: ["page-type/domain"],
  parts: [
    "panel-place/above",
    "panel-place/run",
    "panel-place/character",
    "panel-place/journal",
    "panel-place/map",
    "panel-place/chat",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel states the place that panel is drawn in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Panels are drawn within a place in the order of their positions.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No place names the panels drawn in it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-21T16:28:55.825Z",
  updatedAt: "2026-10-27T18:40:49.096Z",
} as const satisfies PageType
