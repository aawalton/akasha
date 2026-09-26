import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const panelPlace = {
  id: "01a0c4cc-9091-7ea4-a3aa-6a4d2c413b4f",
  type: "page-type/page-type",
  slug: "panel-place",
  definition: "where in a played story's layout a panel is drawn",
  extends: ["page-type/domain"],
  parts: ["panel-place/above", "panel-place/aside", "panel-place/run"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel states the place that panel is drawn in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The order panels are drawn in within a place is the order the game names them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No place names the panels drawn in it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
