import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const track = {
  id: "01a0a57b-23fe-7c3a-92e1-06b28a781b17",
  type: "page-type/page-type",
  slug: "track",
  definition: "one recording as a release carries it",
  extends: ["page-type/collection-external"],
  parts: ["boolean-property/explicit", "number-property/disc-number"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "number-property/disc-number", required: false, many: false },
    { pageProperty: "boolean-property/explicit", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A track is part of the release carrying that track.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Spotify is the record of a track.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One recording carried on two releases is two tracks.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The tracks carrying one recording are known to carry one recording.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A track names the song that track is a recording of.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
