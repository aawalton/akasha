import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiiBlightstones = {
  id: "01a0ed27-2719-7108-8de8-eaeca1c12ca9",
  type: "page-type/page-type",
  slug: "overwhere-iii-blightstones",
  definition: "the seed stones a character in Overwhere III carries",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Blight pulled from a living wound clots into a seed stone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A corrupted beast yields a blightstone rather than a seed stone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seed stone cannot go into the System's keeping; it is carried by hand or in a bag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One Cleansing Weave cracks a seed stone into a glimmer speck.",
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
