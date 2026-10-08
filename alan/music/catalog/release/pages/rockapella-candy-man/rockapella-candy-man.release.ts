import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaCandyMan = {
  id: "01a0676a-d719-7060-84eb-e83d1f97bb80",
  type: "page-type/release",
  slug: "rockapella-candy-man",
  title: "Candy Man",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-02-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4CuC17SpqvkUr8zO7bD0kc",
      externalLink: "https://open.spotify.com/album/4CuC17SpqvkUr8zO7bD0kc",
    },
  ],
  createdAt: "2026-09-03T13:17:30.265Z",
  updatedAt: "2026-09-24T21:00:29.000Z",
} as const satisfies Release
