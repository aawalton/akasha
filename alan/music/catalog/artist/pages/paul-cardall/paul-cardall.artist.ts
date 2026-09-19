import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const paulCardall = {
  id: "01a06803-676c-7002-9bd6-18d8aef62a63",
  type: "page-type/artist",
  slug: "paul-cardall",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b45ecac2-4e1e-48e4-8131-20b66bf3ae5e",
      externalLink: "https://musicbrainz.org/artist/b45ecac2-4e1e-48e4-8131-20b66bf3ae5e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Paul Cardall",
  genre: [],
} as const satisfies Artist
