import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiiTrait = {
  id: "01a0ed1c-2acc-7ca1-9213-f2a458640f73",
  type: "page-type/page-type",
  slug: "overwhere-iii-trait",
  definition: "a trait in Overwhere III, with the ranks it climbs and what it lends and costs",
  pluralSlug: "traits",
  extends: ["page-type/world-trait"],
  parts: [
    "text-property/overwhere-iii-trait-ranks",
    "number-property/overwhere-iii-trait-draw",
    "number-property/overwhere-iii-trait-reach-feet",
    "number-property/overwhere-iii-trait-strain",
    "number-property/overwhere-iii-trait-rank-uses",
    "number-property/overwhere-iii-trait-node-factor",
    "page-type/overwhere-iii-trait-held",
  ],
  properties: [
    {
      pageProperty: "text-property/overwhere-iii-trait-ranks",
      required: true,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/overwhere-iii-trait-draw", required: false, many: false },
    {
      pageProperty: "number-property/overwhere-iii-trait-reach-feet",
      required: false,
      many: false,
    },
    { pageProperty: "number-property/overwhere-iii-trait-strain", required: false, many: false },
    {
      pageProperty: "number-property/overwhere-iii-trait-rank-uses",
      required: false,
      many: false,
    },
    {
      pageProperty: "number-property/overwhere-iii-trait-node-factor",
      required: false,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait is a lasting gift the System lists apart from skills, as Keen Vision is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait's description says what it plainly is, and nothing of cost or rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a trait lends a working, how far it reaches and what excess costs are data.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait's ranks are the System's own skill levels, lowest first.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
