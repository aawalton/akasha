import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidButtonsButtons = {
  id: "01a0c95e-bb9a-7f55-b9f9-e3950f06b8b6",
  type: "page-type/track",
  slug: "lyn-lapid-buttons-buttons",
  ownLength: 2.1223666666666667,
  ownProgress: 0,
  partOfCollections: ["release/lyn-lapid-buttons"],
  status: "not-started",
  unit: "unit/minutes",
  title: "buttons",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4pfy05cNNTacuOQ6SiSu4v", artistName: "Lyn Lapid" }],
  trackKey: "buttons|4pfy05cNNTacuOQ6SiSu4v|127342",
  song: "song/lyn-lapid-buttons",
  carriedBy: [
    {
      release: "release/lyn-lapid-buttons",
      discNumber: 1,
      position: 1,
      externalId: "6ejid3XQunJpAaZCFS9rDa",
      externalLink: "https://open.spotify.com/track/6ejid3XQunJpAaZCFS9rDa",
    },
  ],
} as const satisfies Track
