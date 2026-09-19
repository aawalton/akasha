import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const mitski = {
  id: "019f0e9b-d5e2-7a33-ac50-7cc143ec870a",
  type: "page-type/artist",
  slug: "mitski",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "B+",
  status: "archived",
  tags: ["Indie Pop Storyteller"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fa58cf24-0e44-421d-8519-8bf461dcfaa5",
      externalLink: "https://musicbrainz.org/artist/fa58cf24-0e44-421d-8519-8bf461dcfaa5",
      lastSyncedAt: "2026-09-19",
    },
    {
      source: "spotify",
      externalId: "2uYWxilOVlUdk4oV9DvwqK",
      externalLink: "https://open.spotify.com/artist/2uYWxilOVlUdk4oV9DvwqK",
      lastSyncedAt: "2025-09-30",
    },
  ],
  title: "Mitski",
  genre: [
    "indie rock",
    "rock",
    "singer-songwriter",
    "alternative rock",
    "garage rock",
    "art pop",
    "folk punk",
    "folk rock",
  ],
  reaction: "txt",
} as const satisfies Artist
