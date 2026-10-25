import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const theNineLivesOfChristmas = {
  id: "01a17497-195c-7b6a-b77e-5d7e1a33718e",
  type: "page-type/franchise",
  slug: "the-nine-lives-of-christmas",
  partOfCollections: ["show-collection/hallmark-christmas"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "912183",
      externalLink: "https://www.themoviedb.org/collection/912183",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Nine Lives of Christmas",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
