import type { Artist } from "akasha/alan/music/catalog/artists/artist.page-type.types.ts"

export const arianaGrande = {
  id: "019ea4df-daa1-7e32-acb9-6cea0dfd1807",
  type: "artist",
  slug: "ariana-grande",
  title: "Ariana Grande",
  partOfCollections: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "following",
  rank: "A",
  genre: ["pop", "r&b", "dance-pop", "contemporary r&b", "trap soul"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f4fdbb4c-e4b7-47a0-b83b-d91bbfcfa387",
      externalLink: "https://musicbrainz.org/artist/f4fdbb4c-e4b7-47a0-b83b-d91bbfcfa387",
      lastSyncedAt: "2026-06-08",
    },
    {
      source: "spotify",
      externalId: "66CXWjxzNUsdJxJ2JdwvnR",
      externalLink: "https://open.spotify.com/artist/66CXWjxzNUsdJxJ2JdwvnR",
      lastSyncedAt: "2026-02-18",
    },
  ],
  tags: ["Modern Pop"],
} as const satisfies Artist
