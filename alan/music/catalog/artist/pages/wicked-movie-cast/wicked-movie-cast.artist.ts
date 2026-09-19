import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const wickedMovieCast = {
  id: "01a0b7a4-2177-7444-a711-0cf411dd4abd",
  type: "page-type/artist",
  slug: "wicked-movie-cast",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3eLZo1bSslvsu0zNhtmMM4",
      externalLink: "https://open.spotify.com/artist/3eLZo1bSslvsu0zNhtmMM4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wicked Movie Cast",
} as const satisfies Artist
