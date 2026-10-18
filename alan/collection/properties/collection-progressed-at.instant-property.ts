import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const collectionProgressedAt = {
  id: "01a14fcf-6bd8-79ed-b06c-8409a4a09715",
  type: "page-type/instant-property",
  slug: "collection-progressed-at",
  propertySlug: "progressed-at",
  definition: "the instant a collection's own progress last changed",
  generator: "generator-kind/progressed-instant",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection whose own progress never changed states no instant.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-18T16:19:16.055Z",
  updatedAt: "2026-10-18T16:19:16.055Z",
} as const satisfies InstantProperty
