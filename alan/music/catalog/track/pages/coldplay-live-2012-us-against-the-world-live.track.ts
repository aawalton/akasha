import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012UsAgainstTheWorldLive = {
  id: "01a0b9ee-db3f-7094-8cf3-81fb72fe70c4",
  type: "page-type/track",
  slug: "coldplay-live-2012-us-against-the-world-live",
  ownLength: 3.87,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2012"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6i8gAfT84lsvS8R7ggDZKe",
      externalLink: "https://open.spotify.com/track/6i8gAfT84lsvS8R7ggDZKe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Us Against the World - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "usagainsttheworldlive|4gzpq5DPGxSnKTe4SA8HAU|232200",
} as const satisfies Track
