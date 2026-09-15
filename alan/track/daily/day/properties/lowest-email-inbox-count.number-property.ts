import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const lowestEmailInboxCount = {
  id: "01a06828-59d2-7157-9085-6ef017a64ed4",
  type: "page-type/number-property",
  slug: "lowest-email-inbox-count",
  propertySlug: "lowest-email-inbox-count",
  definition: "the fewest pieces of mail Alan's inbox held at any point in the day",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The day keeps the lowest count reached rather than the count last taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A count taken later is written only where the count is lower than the count held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A zero says the inbox reached empty rather than saying nothing was read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading of a hundred means a hundred or beyond.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The count stops at a hundred.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lowest inbox count is captured by trace.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
