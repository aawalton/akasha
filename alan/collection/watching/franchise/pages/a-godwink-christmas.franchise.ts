import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const aGodwinkChristmas = {
  id: "01a17497-1958-7fb9-a808-33e9cde6faf7",
  type: "page-type/franchise",
  slug: "a-godwink-christmas",
  partOfCollections: ["show-collection/hallmark-christmas"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "919339",
      externalLink: "https://www.themoviedb.org/collection/919339",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Godwink Christmas",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
