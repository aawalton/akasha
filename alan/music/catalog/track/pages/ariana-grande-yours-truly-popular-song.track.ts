import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyPopularSong = {
  id: "01a0a6c5-30c0-79f9-863d-4ef739079aae",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-popular-song",
  ownLength: 3.336883333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3iugMJEdfE58OpI7WGM38w",
      externalLink: "https://open.spotify.com/track/3iugMJEdfE58OpI7WGM38w",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Popular Song",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5MmVJVhhYKQ86izuGHzJYA", artistName: "MIKA" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
  ],
  trackKey: "popularsong|5MmVJVhhYKQ86izuGHzJYA,66CXWjxzNUsdJxJ2JdwvnR|200213",
} as const satisfies Track
