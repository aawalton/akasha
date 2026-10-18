import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const readoutGroups = {
  id: "01a14f32-dce0-7e8d-b1d5-d952d298e083",
  type: "page-type/record-property",
  slug: "readout-groups",
  propertySlug: "groups",
  definition: "the groups a readout is drawn in, each with the readout's place and label there",
  properties: [
    { pageProperty: "relation-property/readout-group", required: true, many: false },
    { pageProperty: "number-property/place", required: true, many: false },
    { pageProperty: "text-property/label", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout has a place in each group that draws the readout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout stating no label for a group is drawn there under its own label.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-18T13:28:15.838Z",
  updatedAt: "2026-10-18T13:28:15.838Z",
} as const satisfies RecordProperty
