import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const trackArtist = {
  id: "01a0a5f1-d12c-7bb8-96c2-10781ad40828",
  type: "page-type/record-property",
  slug: "track-artist",
  propertySlug: "track-artist",
  definition: "an artist a provider credits on a track",
  properties: [
    { pageProperty: "relation-property/credited-artist", required: false, many: false },
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
      decisionKind: "decision-kind/departure",
      statement: "An artist credited here is named by its page's address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An artist credited here who has no page is named by the name the provider credits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A credit names a page or states a name, and never both.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No credit states the id the provider gives the artist.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A credit written as a name before its artist had a page stays a name until its track is synced.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
