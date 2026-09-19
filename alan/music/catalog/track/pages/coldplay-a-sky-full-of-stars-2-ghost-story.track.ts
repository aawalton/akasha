import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayASkyFullOfStars2GhostStory = {
  id: "01a0b9ee-f691-76d1-8cfb-e3dbb9fa64f3",
  type: "page-type/track",
  slug: "coldplay-a-sky-full-of-stars-2-ghost-story",
  ownLength: 4.28955,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-sky-full-of-stars-2"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0VAQB7OYAoeRZH7sLmhVT6",
      externalLink: "https://open.spotify.com/track/0VAQB7OYAoeRZH7sLmhVT6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ghost Story",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "ghoststory|4gzpq5DPGxSnKTe4SA8HAU|257373",
} as const satisfies Track
