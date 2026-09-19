import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2DestinyTirNaNog = {
  id: "01a0abea-68ee-7363-b5a8-4ec558c4713f",
  type: "page-type/track",
  slug: "celtic-woman-2-destiny-tir-na-nog",
  ownLength: 3.1454,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-destiny"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6obm5ubZCFaxTw44EonarI",
      externalLink: "https://open.spotify.com/track/6obm5ubZCFaxTw44EonarI",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Tír na nÓg",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" },
    { externalId: "46CaFQ5mdimxfNmTILDBlk", artistName: "Oonagh" },
  ],
  trackKey: "tirnanog|46CaFQ5mdimxfNmTILDBlk,6NWtt9pNOL2Gx7kBykdE5x|188724",
  song: "song/celtic-woman-tir-na-nog",
} as const satisfies Track
