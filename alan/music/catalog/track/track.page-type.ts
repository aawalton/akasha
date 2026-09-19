import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const track = {
  id: "01a0a57b-23fe-7c3a-92e1-06b28a781b17",
  type: "page-type/page-type",
  slug: "track",
  definition: "one recording as a release carries it",
  extends: ["page-type/collection-external"],
  parts: [
    "boolean-property/explicit",
    "number-property/disc-number",
    "record-property/track-artist",
    "relation-property/song",
    "select-property/track-type",
    "text-property/track-key",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/track-type", required: false, many: false },
    { pageProperty: "number-property/disc-number", required: false, many: false },
    { pageProperty: "boolean-property/explicit", required: false, many: false },
    {
      pageProperty: "record-property/track-artist",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/track-key", required: false, many: false },
    { pageProperty: "relation-property/song", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A track is part of the release carrying that track.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spotify is the record of a track.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One recording carried on two releases is two tracks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tracks carrying one recording state one track key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track names the song that track is a recording of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A track states what kind of recording it is, and the song it names states nothing of that.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
