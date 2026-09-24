import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const track = {
  id: "01a0a57b-23fe-7c3a-92e1-06b28a781b17",
  type: "page-type/page-type",
  slug: "track",
  definition: "a recording and every release carrying it",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "track" },
    { partOfSpeech: "part-of-speech/noun", spelling: "tracks" },
  ],
  extends: ["page-type/collection"],
  parts: [
    "boolean-property/explicit",
    "record-property/track-artist",
    "relation-property/song",
    "select-property/track-type",
    "text-property/track-key",
    "record-property/carried-by",
    "relation-property/release",
    "number-property/disc-number",
    "relation-property/credited-artist",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/track-type", required: false, many: false },
    { pageProperty: "boolean-property/explicit", required: false, many: false },
    {
      pageProperty: "record-property/track-artist",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/track-key", required: false, many: false },
    { pageProperty: "relation-property/song", required: false, many: false },
    { pageProperty: "record-property/carried-by", required: false, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A track is part of every release carrying that track.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spotify is the record of a track.",
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
    {
      decisionKind: "decision-kind/departure",
      statement: "A track names every release carrying that track, and where on each one it sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track states the id Spotify gives it on each release carrying that track.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track carries Alan's grade, because a track is what Alan can hear.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A track carries no prose, because what Alan says of a piece is said of its song or its artist.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A track states no disc, no position and no Spotify id of its own.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
