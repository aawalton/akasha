import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayInMyPlaceIBloomBlaum = {
  id: "01a0b9ef-01ec-799d-b097-81993cd08b88",
  type: "page-type/track",
  slug: "coldplay-in-my-place-i-bloom-blaum",
  ownLength: 2.1848833333333335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-in-my-place"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6MCvGN1ZTLa3PZkGnLWccm",
      externalLink: "https://open.spotify.com/track/6MCvGN1ZTLa3PZkGnLWccm",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Bloom Blaum",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "ibloomblaum|4gzpq5DPGxSnKTe4SA8HAU|131093",
} as const satisfies Track
