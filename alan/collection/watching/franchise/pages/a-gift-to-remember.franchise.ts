import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const aGiftToRemember = {
  id: "01a17497-1958-7eeb-8659-32723bd49916",
  type: "page-type/franchise",
  slug: "a-gift-to-remember",
  partOfCollections: ["show-collection/hallmark-christmas"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "643447",
      externalLink: "https://www.themoviedb.org/collection/643447",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Gift to Remember",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
