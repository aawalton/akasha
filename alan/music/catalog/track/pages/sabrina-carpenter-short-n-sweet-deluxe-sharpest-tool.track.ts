import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeSharpestTool = {
  id: "01a0b111-1d5d-7fd4-9bda-56c4598a7d1d",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-sharpest-tool",
  ownLength: 3.638,
  ownProgress: 3.638,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sharpest Tool",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "sharpesttool|74KM79TiuVKeVCqs8QtB0B|218280",
  song: "song/sabrina-carpenter-sharpest-tool",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet-deluxe",
      discNumber: 1,
      position: 4,
      externalId: "6Dr0QDwc9g69u5H7vuIyxh",
      externalLink: "https://open.spotify.com/track/6Dr0QDwc9g69u5H7vuIyxh",
    },
  ],
} as const satisfies Track
