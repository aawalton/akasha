import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesLive2014MidnightLiveAtTheRoyalAlbertHallLondon = {
  id: "01a0b9ee-d74a-7bb6-ad41-1d00154b62db",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-live-2014-midnight-live-at-the-royal-albert-hall-london",
  ownLength: 4.8111,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-ghost-stories-live-2014"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5lsz74yVLAvt3anpHZHCTS",
      externalLink: "https://open.spotify.com/track/5lsz74yVLAvt3anpHZHCTS",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Midnight - Live at the Royal Albert Hall, London",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "midnightliveattheroyalalberthalllondon|4gzpq5DPGxSnKTe4SA8HAU|288666",
  song: "song/coldplay-midnight",
} as const satisfies Track
