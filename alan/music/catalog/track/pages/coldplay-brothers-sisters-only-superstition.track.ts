import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayBrothersSistersOnlySuperstition = {
  id: "01a0b9ef-05ab-75e6-809c-2368d9847a5f",
  type: "page-type/track",
  slug: "coldplay-brothers-sisters-only-superstition",
  ownLength: 3.8111,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-brothers-sisters"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4eJNA83TrqZ3S6LSyK8rSf",
      externalLink: "https://open.spotify.com/track/4eJNA83TrqZ3S6LSyK8rSf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Only Superstition",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "onlysuperstition|4gzpq5DPGxSnKTe4SA8HAU|228666",
} as const satisfies Track
