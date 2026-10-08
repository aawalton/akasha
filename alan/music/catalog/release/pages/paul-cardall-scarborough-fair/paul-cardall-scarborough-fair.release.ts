import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallScarboroughFair = {
  id: "01a0676a-d728-7051-843f-2c249df0b190",
  type: "page-type/release",
  slug: "paul-cardall-scarborough-fair",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2013-02-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4v9KdXb60N63b97C6OQbw7",
      externalLink: "https://open.spotify.com/album/4v9KdXb60N63b97C6OQbw7",
    },
  ],
  title: "Scarborough Fair",
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
