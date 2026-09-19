import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayARushOfBloodToTheHeadPolitik = {
  id: "01a0b9ee-e78c-73e6-b80b-f213e3a08b1c",
  type: "page-type/track",
  slug: "coldplay-a-rush-of-blood-to-the-head-politik",
  ownLength: 5.310433333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-rush-of-blood-to-the-head"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0u35Dpz37TY2M2j20RUdMf",
      externalLink: "https://open.spotify.com/track/0u35Dpz37TY2M2j20RUdMf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Politik",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "politik|4gzpq5DPGxSnKTe4SA8HAU|318626",
  song: "song/coldplay-politik",
} as const satisfies Track
