import type { SelectProperty } from "@akasha/pages-system/select-property"

export const emailRuleMatchField = {
  id: "01a06860-549f-7cea-a615-3d15b6c3ddce",
  pageTypeSlug: "select-property",
  slug: "email-rule-match-field",
  propertySlug: "field",
  definition: "what about a piece of mail a clause tests",
  values: ["from", "to", "subject", "list"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field is named as the mail carries it rather than as its own page is slugged.",
    },
    {
      invariantKind: "departure",
      statement: "Every field here holds text, so every field takes the same comparisons.",
    },
    {
      invariantKind: "departure",
      statement: "A field the mail offers stands here whether or not a rule names it yet.",
    },
  ],
} as const satisfies SelectProperty

export type EmailRuleMatchField = (typeof emailRuleMatchField.values)[number]
