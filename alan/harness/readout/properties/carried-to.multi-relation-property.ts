import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const carriedTo = {
  id: "01a0d993-b26e-7708-85dc-5e5f04e23dfb",
  type: "page-type/multi-relation-property",
  slug: "carried-to",
  propertySlug: "carried-to",
  definition: "the sites a readout's reading is carried to",
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
} as const satisfies MultiRelationProperty
