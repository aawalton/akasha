import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const girlInRed = {
  id: "01a06803-676b-7011-a6df-f38fecc78fc0",
  type: "page-type/artist",
  slug: "girl-in-red",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "C",
  status: "archived",
  tags: ["Indie Pop Storyteller"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4ae429fe-735c-4968-8253-a591421b1bd0",
      externalLink: "https://musicbrainz.org/artist/4ae429fe-735c-4968-8253-a591421b1bd0",
      lastSyncedAt: "2026-09-19",
    },
    {
      source: "spotify",
      externalId: "3uwAm6vQy7kWPS2bciKWx9",
      externalLink: "https://open.spotify.com/artist/3uwAm6vQy7kWPS2bciKWx9",
      lastSyncedAt: "2025-09-30",
    },
  ],
  title: "girl in red",
  genre: ["dream pop", "indie rock", "bedroom pop", "indie pop", "lo-fi"],
} as const satisfies Artist
