import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiVigour = {
  id: "01a0ed2c-3d51-7883-8b62-76dc7fe7428d",
  type: "page-type/page-type",
  slug: "overwhere-ii-vigour",
  definition: "how much hurt a character in Overwhere II can take before going down",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An ordinary adult has ten vigour; a Talented body five more for each Depth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala has thirty, from the Water in her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm takes vigour as the harm check answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A night's sleep gives back a third of her most vigour; Goody Brannoc's care doubles it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Refined bodies heal a cut in hours and a broken bone in days.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At one vigour she is downed: conscious, hurting, and unable to fight on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Vigour never shows as a number.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
