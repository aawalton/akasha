import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayFixYouPourMeLiveAtTheHollywoodBowl = {
  id: "01a0b9ee-fee2-7c60-a00b-9c6844489f83",
  type: "page-type/track",
  slug: "coldplay-fix-you-pour-me-live-at-the-hollywood-bowl",
  ownLength: 5.022883333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-fix-you"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Ipyg911kDvQPCNIah49Jp",
      externalLink: "https://open.spotify.com/track/1Ipyg911kDvQPCNIah49Jp",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Pour Me - Live at the Hollywood Bowl",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "pourmeliveatthehollywoodbowl|4gzpq5DPGxSnKTe4SA8HAU|301373",
  song: "song/coldplay-pour-me",
} as const satisfies Track
