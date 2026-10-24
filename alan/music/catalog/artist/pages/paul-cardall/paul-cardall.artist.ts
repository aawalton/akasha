import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const paulCardall = {
  id: "01a06803-676c-7002-9bd6-18d8aef62a63",
  type: "page-type/artist",
  slug: "paul-cardall",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  grade: "B",
  status: "following",
  tags: ["Instrumental"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b45ecac2-4e1e-48e4-8131-20b66bf3ae5e",
      externalLink: "https://musicbrainz.org/artist/b45ecac2-4e1e-48e4-8131-20b66bf3ae5e",
      lastSyncedAt: "2026-09-19",
    },
    {
      source: "spotify",
      externalId: "7FQRbf8gbKw8KZQZAJWxH2",
      externalLink: "https://open.spotify.com/artist/7FQRbf8gbKw8KZQZAJWxH2",
      lastSyncedAt: "2026-10-24",
    },
  ],
  title: "Paul Cardall",
  genre: [],
  createdAt: "2026-09-03T16:04:08.684Z",
  updatedAt: "2026-10-24T13:49:17.691Z",
} as const satisfies Artist
