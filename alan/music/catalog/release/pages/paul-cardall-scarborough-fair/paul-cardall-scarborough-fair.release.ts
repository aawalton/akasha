import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallScarboroughFair = {
  id: "01a0676a-d728-7051-843f-2c249df0b190",
  type: "page-type/release",
  slug: "paul-cardall-scarborough-fair",
  title: "Scarborough Fair",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 16.967583,
  ownProgress: 16.967583,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-02-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4v9KdXb60N63b97C6OQbw7",
      externalLink: "https://open.spotify.com/album/4v9KdXb60N63b97C6OQbw7",
    },
  ],
} as const satisfies Release
