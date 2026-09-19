import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayInMyPlaceOneILove = {
  id: "01a0b9ef-01bf-7003-933c-e85031aec2b8",
  type: "page-type/track",
  slug: "coldplay-in-my-place-one-i-love",
  ownLength: 4.587766666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-in-my-place"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5YahO7aySL2lyj6DW2tS9q",
      externalLink: "https://open.spotify.com/track/5YahO7aySL2lyj6DW2tS9q",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One I Love",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "oneilove|4gzpq5DPGxSnKTe4SA8HAU|275266",
  song: "song/coldplay-one-i-love",
} as const satisfies Track
