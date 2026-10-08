import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaWorkinMyWayToYou = {
  id: "01a0676a-d731-7037-8c78-44bea1abf5e7",
  type: "page-type/release",
  slug: "rockapella-workin-my-way-to-you",
  title: "Workin My Way to You",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-06-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Fzvio26F3pjamSTro8der",
      externalLink: "https://open.spotify.com/album/5Fzvio26F3pjamSTro8der",
    },
  ],
  createdAt: "2026-09-03T13:17:30.289Z",
  updatedAt: "2026-09-24T21:00:29.000Z",
} as const satisfies Release
