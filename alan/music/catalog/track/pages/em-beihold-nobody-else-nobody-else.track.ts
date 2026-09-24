import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emBeiholdNobodyElseNobodyElse = {
  id: "01a0d3ab-b116-7cba-be76-ac7f3c4a3fb8",
  type: "page-type/track",
  slug: "em-beihold-nobody-else-nobody-else",
  ownLength: 3.22885,
  ownProgress: 0,
  partOfCollections: ["release/em-beihold-nobody-else"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Nobody Else",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7o2ZQYM7nTsaVdkXY38UAA", artistName: "Em Beihold" }],
  trackKey: "nobodyelse|7o2ZQYM7nTsaVdkXY38UAA|193731",
  song: "song/em-beihold-nobody-else",
  carriedBy: [
    {
      release: "release/em-beihold-nobody-else",
      discNumber: 1,
      position: 1,
      externalId: "0HsgIiz280hCUAGg2DoctV",
      externalLink: "https://open.spotify.com/track/0HsgIiz280hCUAGg2DoctV",
    },
  ],
} as const satisfies Track
