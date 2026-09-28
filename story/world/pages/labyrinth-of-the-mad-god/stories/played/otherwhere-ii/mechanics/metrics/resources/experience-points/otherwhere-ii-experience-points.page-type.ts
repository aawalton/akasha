import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIiExperiencePoints = {
  id: "01a0e99f-283d-71a5-9508-45efeda0d810",
  type: "page-type/page-type",
  slug: "otherwhere-ii-experience-points",
  definition: "the experience a character in Otherwhere holds toward their next level",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The value is what is held toward the next level, and its most is that level's cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Experience is never shown to the character as a number.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
