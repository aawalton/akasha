import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const chaislynUnreliableNarratorMakeBelieve = {
  id: "01a0b9ec-952c-788c-8ec0-3f794a86ca90",
  type: "page-type/track",
  slug: "chaislyn-unreliable-narrator-make-believe",
  ownLength: 3.1366666666666667,
  ownProgress: 3.1366666666666667,
  partOfCollections: ["release/chaislyn-unreliable-narrator"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6lmTap581KiGYXVyPZFvkS",
      externalLink: "https://open.spotify.com/track/6lmTap581KiGYXVyPZFvkS",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Make Believe",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "3zmbniiciaBAJlSX1Bzq9R", artistName: "Chaislyn" }],
  trackKey: "makebelieve|3zmbniiciaBAJlSX1Bzq9R|188200",
  song: "song/chaislyn-make-believe",
  carriedBy: [
    {
      release: "release/chaislyn-unreliable-narrator",
      discNumber: 1,
      position: 1,
      externalId: "6lmTap581KiGYXVyPZFvkS",
      externalLink: "https://open.spotify.com/track/6lmTap581KiGYXVyPZFvkS",
    },
  ],
} as const satisfies Track
