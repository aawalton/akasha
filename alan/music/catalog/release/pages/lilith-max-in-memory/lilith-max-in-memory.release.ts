import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxInMemory = {
  id: "01a0676a-d721-7068-aed1-3ab08e4514a1",
  type: "release",
  slug: "lilith-max-in-memory",
  title: "In Memory",
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  ownLength: 3.24215,
  ownProgress: 3.24215,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  publishedAt: "2020-12-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5n41iSqkZzXT1WvZS5YhfW",
      externalLink: "https://open.spotify.com/album/5n41iSqkZzXT1WvZS5YhfW",
    },
  ],
} as const satisfies Release
