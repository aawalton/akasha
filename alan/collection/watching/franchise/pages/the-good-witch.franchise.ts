import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const theGoodWitch = {
  id: "01a17497-195b-781a-a517-1859b30910f3",
  type: "page-type/franchise",
  slug: "the-good-witch",
  partOfCollections: ["show-collection/hallmark-romance"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87251",
      externalLink: "https://www.themoviedb.org/collection/87251",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Good Witch",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
