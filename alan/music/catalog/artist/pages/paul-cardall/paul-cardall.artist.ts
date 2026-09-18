import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const paulCardall = {
  id: "01a06803-676c-7002-9bd6-18d8aef62a63",
  type: "page-type/artist",
  slug: "paul-cardall",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "B",
  status: "following",
  tags: ["Instrumental"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7FQRbf8gbKw8KZQZAJWxH2",
      externalLink: "https://open.spotify.com/artist/7FQRbf8gbKw8KZQZAJWxH2",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Paul Cardall",
} as const satisfies Artist
