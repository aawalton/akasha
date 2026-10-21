import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const jamesTaylor = {
  id: "01a06803-676b-7018-9908-1125e2ef2d1a",
  type: "page-type/artist",
  slug: "james-taylor",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  grade: "B",
  status: "following",
  tags: ["Classic Rock"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "107d0c22-d051-4d98-8206-4e14de02132a",
      externalLink: "https://musicbrainz.org/artist/107d0c22-d051-4d98-8206-4e14de02132a",
      lastSyncedAt: "2026-09-19",
    },
    {
      source: "spotify",
      externalId: "0vn7UBvSQECKJm2817Yf1P",
      externalLink: "https://open.spotify.com/artist/0vn7UBvSQECKJm2817Yf1P",
      lastSyncedAt: "2026-10-21",
    },
  ],
  title: "James Taylor",
  genre: [
    "rock",
    "soft rock",
    "folk rock",
    "singer-songwriter",
    "country",
    "pop rock",
    "folk",
    "folk pop",
  ],
  createdAt: "2026-09-03T16:04:08.683Z",
  updatedAt: "2026-10-21T13:45:20.359Z",
} as const satisfies Artist
