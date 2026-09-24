import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraThankUThankU = {
  id: "01a0b638-0bc6-72ef-a5e3-9f6ecf1b0ba2",
  type: "page-type/track",
  slug: "aurora-thank-u-thank-u",
  ownLength: 4.046216666666667,
  ownProgress: 4.046216666666667,
  partOfCollections: ["release/aurora-thank-u"],
  status: "completed",
  unit: "unit/minutes",
  title: "Thank U",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "thanku|1WgXqy2Dd70QQOU7Ay074N|242773",
  song: "song/aurora-thank-u",
  carriedBy: [
    {
      release: "release/aurora-thank-u",
      discNumber: 1,
      position: 1,
      externalId: "1w5J5CBuvT36kt2OtHa8ts",
      externalLink: "https://open.spotify.com/track/1w5J5CBuvT36kt2OtHa8ts",
    },
  ],
} as const satisfies Track
