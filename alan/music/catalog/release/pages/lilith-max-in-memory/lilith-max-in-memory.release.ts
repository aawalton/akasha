import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxInMemory = {
  id: "01a0676a-d721-7068-aed1-3ab08e4514a1",
  type: "page-type/release",
  slug: "lilith-max-in-memory",
  grade: "C",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2020-12-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5n41iSqkZzXT1WvZS5YhfW",
      externalLink: "https://open.spotify.com/album/5n41iSqkZzXT1WvZS5YhfW",
    },
  ],
  title: "In Memory",
} as const satisfies Release
