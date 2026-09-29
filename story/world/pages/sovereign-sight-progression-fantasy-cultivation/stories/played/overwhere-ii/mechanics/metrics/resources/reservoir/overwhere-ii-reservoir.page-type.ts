import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiReservoir = {
  id: "01a0ed2c-3d51-7948-b4ec-9f82e3d68b49",
  type: "page-type/page-type",
  slug: "overwhere-ii-reservoir",
  definition: "the Water a character in Overwhere II holds in their reservoir, ready to spend",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Water is counted in draughts; an ordinary Surface reservoir holds ten, a First Depth twenty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each Depth past First doubles an ordinary reservoir.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala's reservoir holds a thousand draughts and refills from the Sea to full within an hour.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Talent's working spends the draughts its Talent page names; a great working up to its draw.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An ordinary reservoir refills in a night's sleep, or a tenth each hour of refinement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Emptied, a Talented aches in every tributary, and each act costs two for an hour.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala's reservoir unspent for a day spills Water as cold salt sweat.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Water never shows as a number; she feels it as depth and pressure.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
