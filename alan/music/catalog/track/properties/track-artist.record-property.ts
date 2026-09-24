import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const trackArtist = {
  id: "01a0a5f1-d12c-7bb8-96c2-10781ad40828",
  type: "page-type/record-property",
  slug: "track-artist",
  propertySlug: "track-artist",
  definition: "an artist a provider credits on a track",
  properties: [
    { pageProperty: "relation-property/credited-artist", required: false, many: false },
    { pageProperty: "text-property/external-id", required: false, many: false },
    { pageProperty: "text-property/artist-name", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A track credits the artists in the order the provider names them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track credits an artist the release that track sits on does not credit.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An artist credited here is the artist page naming the same provider id.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
