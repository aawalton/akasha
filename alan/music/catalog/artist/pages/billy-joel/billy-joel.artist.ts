import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const billyJoel = {
  id: "01a06803-676b-7002-a3eb-aaec816b0225",
  type: "page-type/artist",
  slug: "billy-joel",
  title: "Billy Joel",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  rank: "C",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6zFYqv1mOsgBRQbae3JJ9e",
      externalLink: "https://open.spotify.com/artist/6zFYqv1mOsgBRQbae3JJ9e",
      lastSyncedAt: "2025-09-30",
    },
  ],
  tags: ["Classic Rock"],
} as const satisfies Artist
