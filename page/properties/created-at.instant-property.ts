import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const createdAt = {
  id: "01a11c02-1cc1-7a9a-ba3c-c377f6d15cf2",
  type: "page-type/instant-property",
  slug: "created-at",
  propertySlug: "created-at",
  definition: "the instant a page was created",
  generator: "generator-kind/created-instant",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page being created states no instant of its own creation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page moved or renamed keeps the instant it was created.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
