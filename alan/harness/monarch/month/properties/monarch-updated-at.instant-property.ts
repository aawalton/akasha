import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const monarchUpdatedAt = {
  id: "01a0680b-2b00-7002-b471-2e8c6a3d2103",
  type: "page-type/instant-property",
  slug: "monarch-updated-at",
  propertySlug: "monarch-updated-at",
  definition: "the last time Monarch changes a Monarch transaction",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The poll refetches a transaction whose moment has moved past the moment held here.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:12:37.504Z",
  updatedAt: "2026-10-30T15:46:27.122Z",
} as const satisfies InstantProperty
