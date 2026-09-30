import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiiBlightstones = {
  id: "01a0ed27-2719-7108-8de8-eaeca1c12ca9",
  type: "page-type/page-type",
  slug: "overwhere-iii-blightstones",
  definition: "the blightstones a character in Overwhere III carries",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A corrupted beast yields a black blightstone where a clean one holds a glimmerstone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A blightstone cannot go into the System's keeping; it is carried by hand or in a bag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Carrying more than ten blightstones lays the Cursed affliction on the carrier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blightstone purified by holy magic becomes a clean glimmerstone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
