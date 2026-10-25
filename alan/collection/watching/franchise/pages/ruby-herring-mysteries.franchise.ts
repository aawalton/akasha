import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const rubyHerringMysteries = {
  id: "01a17497-195b-7620-ad3e-1ee788fd269b",
  type: "page-type/franchise",
  slug: "ruby-herring-mysteries",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "632049",
      externalLink: "https://www.themoviedb.org/collection/632049",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Ruby Herring Mysteries",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
