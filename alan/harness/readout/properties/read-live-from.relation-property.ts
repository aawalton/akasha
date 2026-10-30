import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const readLiveFrom = {
  id: "01a06559-e74c-7e30-bbec-7604ae4f8dc5",
  type: "page-type/relation-property",
  slug: "read-live-from",
  propertySlug: "read-live-from",
  definition: "the service a readout is read from when the readout is shown",
  targetPageType: "page-type/domain",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout naming a service to read live from is answered by no query.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T03:39:45.868Z",
  updatedAt: "2026-10-30T16:09:38.312Z",
} as const satisfies RelationProperty
