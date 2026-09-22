import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const carriedBy = {
  id: "01a0c52d-5525-787c-804a-bd4a8378c2f1",
  type: "page-type/record-property",
  slug: "carried-by",
  propertySlug: "carried-by",
  definition: "a release carrying a track, and where on that release the track sits",
  properties: [
    { pageProperty: "relation-property/release", required: true, many: false },
    { pageProperty: "number-property/disc-number", required: false, many: false },
    { pageProperty: "number-property/position", required: false, many: false },
    { pageProperty: "text-property/external-id", required: true, many: false },
    { pageProperty: "url-property/external-link", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A track states one of these for every release carrying that track.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every one of these names one release.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every one of these states the id Spotify gives the track on the release it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A track's place on the release one of these names is its disc and its position together.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
