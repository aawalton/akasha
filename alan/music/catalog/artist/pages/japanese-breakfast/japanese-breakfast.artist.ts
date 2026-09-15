import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const japaneseBreakfast = {
  id: "01a06803-676b-7019-b91e-e4dd7e2c7c7e",
  type: "artist",
  slug: "japanese-breakfast",
  title: "Japanese Breakfast",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7MoIc5s9KXolCBH1fy9kkw",
      externalLink: "https://open.spotify.com/artist/7MoIc5s9KXolCBH1fy9kkw",
      lastSyncedAt: "2025-09-30",
    },
  ],
  tags: ["Indie Pop Storyteller"],
} as const satisfies Artist
