import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesASkyFullOfStars = {
  id: "01a0b9ee-d928-7011-8812-04c6111ef339",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-a-sky-full-of-stars",
  ownLength: 4.464433333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-ghost-stories"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0FDzzruyVECATHXKHFs9eJ",
      externalLink: "https://open.spotify.com/track/0FDzzruyVECATHXKHFs9eJ",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Sky Full of Stars",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "askyfullofstars|4gzpq5DPGxSnKTe4SA8HAU|267866",
  song: "song/coldplay-a-sky-full-of-stars",
} as const satisfies Track
