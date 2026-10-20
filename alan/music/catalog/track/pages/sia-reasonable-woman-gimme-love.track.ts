import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaReasonableWomanGimmeLove = {
  id: "01a15994-8c67-7d57-9798-690ddd242b65",
  type: "page-type/track",
  slug: "sia-reasonable-woman-gimme-love",
  ownLength: 2.96535,
  ownProgress: 0,
  partOfCollections: ["release/sia-reasonable-woman", "release/sia-gimme-christmas"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Gimme Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sia" }],
  trackKey: "gimmelove|5WUlDfRSoLAfcVSX1WnrxN|177921",
  song: "song/sia-gimme-love",
  carriedBy: [
    {
      release: "release/sia-gimme-christmas",
      discNumber: 1,
      position: 2,
      externalId: "0ADviyPnrVTFOaqY6wdxlD",
      externalLink: "https://open.spotify.com/track/0ADviyPnrVTFOaqY6wdxlD",
    },
    {
      release: "release/sia-reasonable-woman",
      discNumber: 1,
      position: 16,
      externalId: "5i7frb9AXQjMS2iibNF4Jv",
      externalLink: "https://open.spotify.com/track/5i7frb9AXQjMS2iibNF4Jv",
    },
  ],
  createdAt: "2026-10-20T13:51:09.878Z",
  updatedAt: "2026-10-20T13:51:09.878Z",
} as const satisfies Track
