import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const song = {
  id: "01a06243-144b-7012-9da5-a570a8174672",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "song",
  definition: "a piece of music Alan keeps",
  pluralSlug: "songs",
  extends: ["page-type/collection-external"],
  parts: [
    "boolean-property/performed",
    "file-property/insights",
    "file-property/lyrics",
    "file-property/personal-connections",
    "file-property/synced-lyrics",
    "relation-property/artist",
    "text-property/lyrics-source",
    "text-property/singability",
    "text-property/song-type",
    "text-property/written",
  ],
  properties: [
    { pageProperty: "text-property/external-id", required: true, many: false },
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/artist", required: true, many: false },
    { pageProperty: "text-property/song-type", required: true, many: false },
    { pageProperty: "boolean-property/performed", required: true, many: false },
    { pageProperty: "text-property/lyrics-source", required: false, many: false },
    { pageProperty: "text-property/written", required: false, many: false },
    { pageProperty: "text-property/singability", required: false, many: false },
    { pageProperty: "file-property/lyrics", required: false, many: false },
    { pageProperty: "file-property/synced-lyrics", required: false, many: false },
    { pageProperty: "file-property/insights", required: false, many: false },
    { pageProperty: "file-property/personal-connections", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A song names one artist.",
    },
  ],
  types: "ts",
} as const satisfies PageType
