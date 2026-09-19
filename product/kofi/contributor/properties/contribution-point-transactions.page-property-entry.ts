import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const contributionPointTransactions = {
  id: "01a0ba91-e892-7379-95c1-ab471bc6af43",
  type: "page-type/page-property-entry",
  slug: "contribution-point-transactions",
  propertySlug: "transactions",
  definition: "every movement of a contributor's points, one to a line",
  properties: [
    { pageProperty: "instant-property/contribution-point-at", required: true, many: false },
    { pageProperty: "number-property/contribution-points", required: true, many: false },
    { pageProperty: "text-property/stripe-charge-id", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A transaction sits beside the contributor it moved rather than in a file of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Transactions sit in the order the points moved.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No transaction is changed or taken away once that transaction lands.",
    },
  ],
  types: "ts",
} as const satisfies PagePropertyEntry
