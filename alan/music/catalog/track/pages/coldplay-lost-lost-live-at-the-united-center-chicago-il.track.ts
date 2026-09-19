import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLostLostLiveAtTheUnitedCenterChicagoIl = {
  id: "01a0b9ee-fb70-7799-9e9f-408be88de48a",
  type: "page-type/track",
  slug: "coldplay-lost-lost-live-at-the-united-center-chicago-il",
  ownLength: 3.92955,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-lost"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "69joApFuCALBP6TPrK9bgL",
      externalLink: "https://open.spotify.com/track/69joApFuCALBP6TPrK9bgL",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lost@ - Live at the United Center, Chicago, IL",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "lostliveattheunitedcenterchicagoil|4gzpq5DPGxSnKTe4SA8HAU|235773",
  song: "song/coldplay-lost",
} as const satisfies Track
