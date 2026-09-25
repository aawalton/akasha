import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const swordArtOnline = {
  id: "019ea442-6507-7cad-9c65-3c053f1ee123",
  type: "page-type/franchise",
  slug: "sword-art-online",
  title: "Sword Art Online",
  externalIdentity: [
    {
      source: "tmdb",
      externalLink: "https://www.themoviedb.org/search?query=Sword%20Art%20Online",
    },
  ],
} as const satisfies Franchise
