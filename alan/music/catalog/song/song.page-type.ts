import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const song = {
  id: "01a06243-144b-7012-9da5-a570a8174672",
  type: "page-type/page-type",
  slug: "song",
  definition: "a piece of music Alan keeps",
  extends: ["page-type/collection-external"],
  parts: [
    "boolean-property/performed",
    "file-property/insights",
    "file-property/lyrics",
    "file-property/personal-connections",
    "file-property/synced-lyrics",
    "rank-property/singability",
    "relation-property/artist",
    "select-property/song-type",
    "select-property/written",
    "text-property/lyrics-source",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/artist", required: true, many: false },
    { pageProperty: "select-property/song-type", required: false, many: false },
    { pageProperty: "boolean-property/performed", required: true, many: false },
    { pageProperty: "text-property/lyrics-source", required: false, many: false },
    { pageProperty: "select-property/written", required: false, many: false },
    { pageProperty: "rank-property/singability", required: false, many: false },
    { pageProperty: "file-property/lyrics", required: false, many: false },
    { pageProperty: "file-property/synced-lyrics", required: false, many: false },
    { pageProperty: "file-property/insights", required: false, many: false },
    { pageProperty: "file-property/personal-connections", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A song names one artist.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A song whose writer nothing names states no song type.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
