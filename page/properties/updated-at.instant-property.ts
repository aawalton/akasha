import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const updatedAt = {
  id: "01a11c02-1cc2-7277-b4b3-fe9a8c427ce4",
  type: "page-type/instant-property",
  slug: "updated-at",
  propertySlug: "updated-at",
  definition: "the instant a page's committed values last changed",
  generator: "generator-kind/changed-instant",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Any change to a page's committed values moves this instant, whatever made it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to a page's uncommitted values alone leaves this instant as it was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file beside a page that changes alone leaves this instant as it was.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
