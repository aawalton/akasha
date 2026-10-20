import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaWaterfallWaterfall = {
  id: "01a15994-8c70-776a-9385-edf1def7579e",
  type: "page-type/track",
  slug: "sia-waterfall-waterfall",
  ownLength: 3.333816666666667,
  ownProgress: 0,
  partOfCollections: ["release/sia-waterfall"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Waterfall",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Stargate" }, { artistName: "P!nk" }, { artist: "artist/sia" }],
  trackKey: "waterfall|1KCSPY1glIKqW2TotWuXOR,5WUlDfRSoLAfcVSX1WnrxN,7KUri7klyLaIFXLcuuOMCd|200029",
  song: "song/sia-waterfall",
  carriedBy: [
    {
      release: "release/sia-waterfall",
      discNumber: 1,
      position: 1,
      externalId: "7pYFPMeK0TnaTGdS6qOtEr",
      externalLink: "https://open.spotify.com/track/7pYFPMeK0TnaTGdS6qOtEr",
    },
  ],
  createdAt: "2026-10-20T13:51:09.878Z",
  updatedAt: "2026-10-20T13:51:09.878Z",
} as const satisfies Track
