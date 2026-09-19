import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayHigherPowerTiestoRemixHigherPowerTiestoRemix = {
  id: "01a0b9ee-f02e-7045-a96b-37d04621de8c",
  type: "page-type/track",
  slug: "coldplay-higher-power-tiesto-remix-higher-power-tiesto-remix",
  ownLength: 3.8260833333333335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-higher-power-tiesto-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "04zCkONaIDxTx2gDjV1yCd",
      externalLink: "https://open.spotify.com/track/04zCkONaIDxTx2gDjV1yCd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Higher Power - Tiësto Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "2o5jDhtHVPhrJdv3cEQ99Z", artistName: "Tiësto" },
  ],
  trackKey: "higherpowertiestoremix|2o5jDhtHVPhrJdv3cEQ99Z,4gzpq5DPGxSnKTe4SA8HAU|229565",
  song: "song/coldplay-higher-power",
} as const satisfies Track
