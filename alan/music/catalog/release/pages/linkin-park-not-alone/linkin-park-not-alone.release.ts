import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkNotAlone = {
  id: "01a0676a-d725-7079-8c0c-391c7b0dd46b",
  type: "release",
  slug: "linkin-park-not-alone",
  title: "Not Alone",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 4.214,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-10-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5WeoTn1XJXrLrDGQoDgOQv",
      externalLink: "https://open.spotify.com/album/5WeoTn1XJXrLrDGQoDgOQv",
    },
  ],
} as const satisfies Release
