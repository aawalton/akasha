import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2Covers = {
  id: "01a0676a-d71b-7030-b434-dd1a68f8b8d3",
  type: "page-type/release",
  slug: "james-taylor-2-covers",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "2008-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0TJsDbqfqBgHfj3hkDJG64",
      externalLink: "https://open.spotify.com/album/0TJsDbqfqBgHfj3hkDJG64",
    },
  ],
  title: "Covers",
} as const satisfies Release
