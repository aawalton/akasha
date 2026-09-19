import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const arianaGrande = {
  id: "019ea4df-daa1-7e32-acb9-6cea0dfd1807",
  type: "page-type/artist",
  slug: "ariana-grande",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "A",
  status: "following",
  tags: ["Modern Pop"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f4fdbb4c-e4b7-47a0-b83b-d91bbfcfa387",
      externalLink: "https://musicbrainz.org/artist/f4fdbb4c-e4b7-47a0-b83b-d91bbfcfa387",
      lastSyncedAt: "2026-09-19",
    },
    {
      source: "spotify",
      externalId: "66CXWjxzNUsdJxJ2JdwvnR",
      externalLink: "https://open.spotify.com/artist/66CXWjxzNUsdJxJ2JdwvnR",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Ariana Grande",
  genre: ["pop", "r&b", "dance-pop", "contemporary r&b", "trap soul"],
} as const satisfies Artist
