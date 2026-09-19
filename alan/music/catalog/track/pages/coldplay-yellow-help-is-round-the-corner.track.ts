import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayYellowHelpIsRoundTheCorner = {
  id: "01a0b9ef-03c8-7567-9994-cbaf7c33963c",
  type: "page-type/track",
  slug: "coldplay-yellow-help-is-round-the-corner",
  ownLength: 2.6026666666666665,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-yellow"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1AmYC6YsrtkxpTfiv3nFBn",
      externalLink: "https://open.spotify.com/track/1AmYC6YsrtkxpTfiv3nFBn",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Help Is Round the Corner",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "helpisroundthecorner|4gzpq5DPGxSnKTe4SA8HAU|156160",
  song: "song/coldplay-help-is-round-the-corner",
} as const satisfies Track
