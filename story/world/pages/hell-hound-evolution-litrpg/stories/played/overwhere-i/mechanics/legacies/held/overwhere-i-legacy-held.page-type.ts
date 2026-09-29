import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereILegacyHeld = {
  id: "01a0ed17-2f4e-73a6-940e-85672d8c9fb8",
  type: "page-type/page-type",
  slug: "overwhere-i-legacy-held",
  definition: "one legacy a character in Overwhere I holds, at the rank it has reached",
  pluralSlug: "legacies-held",
  extends: ["page-type/world-legacy"],
  parts: [
    "relation-property/overwhere-i-legacy-held-character",
    "relation-property/overwhere-i-legacy-held-legacy",
    "number-property/overwhere-i-legacy-held-rank",
    "number-property/overwhere-i-legacy-held-reserve",
  ],
  properties: [
    {
      pageProperty: "relation-property/overwhere-i-legacy-held-character",
      required: true,
      many: false,
    },
    {
      pageProperty: "relation-property/overwhere-i-legacy-held-legacy",
      required: true,
      many: false,
    },
    { pageProperty: "number-property/overwhere-i-legacy-held-rank", required: true, many: false },
    {
      pageProperty: "number-property/overwhere-i-legacy-held-reserve",
      required: true,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A holding names the character, the legacy, the rank reached and the reserve held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The growth check raises the rank, and the reserve rises with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change is written on its page before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
