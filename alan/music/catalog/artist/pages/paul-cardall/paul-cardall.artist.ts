import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const paulCardall = {
  id: "01a06803-676c-7002-9bd6-18d8aef62a63",
  type: "page-type/artist",
  slug: "paul-cardall",
  title: "Paul Cardall",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  rank: "B",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7FQRbf8gbKw8KZQZAJWxH2",
      externalLink: "https://open.spotify.com/artist/7FQRbf8gbKw8KZQZAJWxH2",
      lastSyncedAt: "2026-03-01",
    },
  ],
  tags: ["Instrumental"],
} as const satisfies Artist
