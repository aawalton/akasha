import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const carriedTo = {
  id: "01a0d993-b26e-7708-85dc-5e5f04e23dfb",
  type: "page-type/multi-relation-property",
  slug: "carried-to",
  propertySlug: "carried-to",
  definition: "the router apps the value of a readout is carried to",
  targetPageType: "page-type/router-app",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A site is reached at the hostname of the first tunnel route its router app names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout naming no site is carried nowhere.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-25T17:18:50.478Z",
  updatedAt: "2026-10-30T16:09:00.276Z",
} as const satisfies MultiRelationProperty
