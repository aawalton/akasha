import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2DestinyTirNaNog = {
  id: "01a0abea-68ee-7363-b5a8-4ec558c4713f",
  type: "page-type/track",
  slug: "celtic-woman-2-destiny-tir-na-nog",
  ownLength: 3.1454,
  ownProgress: 3.1454,
  partOfCollections: ["release/celtic-woman-2-destiny"],
  status: "completed",
  unit: "unit/minutes",
  title: "Tír na nÓg",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }, { artistName: "Oonagh" }],
  trackKey: "tirnanog|46CaFQ5mdimxfNmTILDBlk,6NWtt9pNOL2Gx7kBykdE5x|188724",
  song: "song/celtic-woman-tir-na-nog",
  carriedBy: [
    {
      release: "release/celtic-woman-2-destiny",
      discNumber: 1,
      position: 8,
      externalId: "6obm5ubZCFaxTw44EonarI",
      externalLink: "https://open.spotify.com/track/6obm5ubZCFaxTw44EonarI",
    },
  ],
} as const satisfies Track
