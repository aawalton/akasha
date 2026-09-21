import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyPopularSong = {
  id: "01a0a6c5-30c0-79f9-863d-4ef739079aae",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-popular-song",
  ownLength: 3.336883333333333,
  ownProgress: 3.336883333333333,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  position: 11,
  status: "completed",
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
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5MmVJVhhYKQ86izuGHzJYA", artistName: "MIKA" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
  ],
  trackKey: "popularsong|5MmVJVhhYKQ86izuGHzJYA,66CXWjxzNUsdJxJ2JdwvnR|200213",
  song: "song/ariana-grande-popular-song",
  carriedBy: [
    {
      release: "release/ariana-grande-yours-truly",
      discNumber: 1,
      position: 11,
      externalId: "3iugMJEdfE58OpI7WGM38w",
      externalLink: "https://open.spotify.com/track/3iugMJEdfE58OpI7WGM38w",
    },
  ],
} as const satisfies Track
