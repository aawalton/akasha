import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiiTraitHeld = {
  id: "01a0ed1c-2acb-7e5c-994b-d200e4718ba2",
  type: "page-type/page-type",
  slug: "overwhere-iii-trait-held",
  definition: "one trait a character in Overwhere III holds, at the rank it has reached",
  pluralSlug: "traits-held",
  extends: ["page-type/character-trait"],
  parts: [
    "relation-property/overwhere-iii-trait-held-trait",
    "number-property/overwhere-iii-trait-held-rank",
    "number-property/overwhere-iii-trait-held-uses",
  ],
  properties: [
    {
      pageProperty: "relation-property/overwhere-iii-trait-held-trait",
      required: true,
      many: false,
    },
    { pageProperty: "number-property/overwhere-iii-trait-held-rank", required: true, many: false },
    { pageProperty: "number-property/overwhere-iii-trait-held-uses", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding names the character, the trait, the rank reached and the uses since.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The progression mechanic counts the uses and raises the rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change is written on its page before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
