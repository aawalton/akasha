import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIvConditionHeld = {
  id: "01a0f1ba-b37f-7349-b950-6b7ae332f61e",
  type: "page-type/page-type",
  slug: "overwhere-iv-condition-held",
  definition: "one condition a character in Overwhere IV is under",
  pluralSlug: "conditions-held",
  extends: ["page-type/world-condition"],
  parts: [
    "relation-property/overwhere-iv-condition-held-character",
    "relation-property/overwhere-iv-condition-held-condition",
  ],
  properties: [
    {
      pageProperty: "relation-property/overwhere-iv-condition-held-character",
      required: true,
      many: false,
    },
    {
      pageProperty: "relation-property/overwhere-iv-condition-held-condition",
      required: true,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding names the character and the world's condition the status shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A condition gained or lost is written or removed here before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
