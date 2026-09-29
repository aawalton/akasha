import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereILegacy = {
  id: "01a0ed17-2f4f-7e6b-803f-da64697e2bcf",
  type: "page-type/page-type",
  slug: "overwhere-i-legacy",
  definition: "a legacy in Overwhere I, with the ranks it climbs and what its workings cost",
  pluralSlug: "legacies",
  extends: ["page-type/world-legacy"],
  parts: [
    "text-property/overwhere-i-legacy-ranks",
    "number-property/overwhere-i-legacy-refill-minutes",
    "number-property/overwhere-i-legacy-element-cost",
    "page-type/overwhere-i-legacy-held",
  ],
  properties: [
    {
      pageProperty: "text-property/overwhere-i-legacy-ranks",
      required: true,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "number-property/overwhere-i-legacy-refill-minutes",
      required: false,
      many: false,
    },
    {
      pageProperty: "number-property/overwhere-i-legacy-element-cost",
      required: false,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A legacy is a System blessing one bearer holds, as the Wyrmscar Legacy is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A legacy's description says what it plainly is, and nothing of cost or rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a working costs and how fast a reserve fills are held as data here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A legacy's skills are skills of the world, each with its own mana cost.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
