import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const sia = {
  id: "019ea4c1-b005-73a3-8bc3-079ae41ed5e9",
  type: "page-type/artist",
  slug: "sia",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "S-",
  status: "following",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2f548675-008d-4332-876c-108b0c7ab9c5",
      externalLink: "https://musicbrainz.org/artist/2f548675-008d-4332-876c-108b0c7ab9c5",
      lastSyncedAt: "2026-09-19",
    },
    {
      source: "spotify",
      externalId: "5WUlDfRSoLAfcVSX1WnrxN",
      externalLink: "https://open.spotify.com/artist/5WUlDfRSoLAfcVSX1WnrxN",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Sia",
  genre: ["pop", "electropop", "dance-pop", "indie pop", "alternative pop", "art pop"],
  reaction: "txt",
} as const satisfies Artist
