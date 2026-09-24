import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeAlrightToBeAlright = {
  id: "01a0b637-ffe4-7b35-9547-deaec748df1c",
  type: "page-type/track",
  slug: "aurora-to-be-alright-to-be-alright",
  ownLength: 4.094,
  ownProgress: 4.094,
  partOfCollections: [
    "release/aurora-to-be-alright",
    "release/aurora-what-happened-to-the-heart-deluxe",
    "release/aurora-what-happened-to-the-heart",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "To Be Alright",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "tobealright|1WgXqy2Dd70QQOU7Ay074N|245640",
  song: "song/aurora-to-be-alright",
  carriedBy: [
    {
      release: "release/aurora-to-be-alright",
      discNumber: 1,
      position: 1,
      externalId: "5E0mDkJAiKziakTFbCjaaT",
      externalLink: "https://open.spotify.com/track/5E0mDkJAiKziakTFbCjaaT",
    },
    {
      release: "release/aurora-what-happened-to-the-heart",
      discNumber: 1,
      position: 2,
      externalId: "3lFk7chcfSypqoZRzdaswz",
      externalLink: "https://open.spotify.com/track/3lFk7chcfSypqoZRzdaswz",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 2,
      externalId: "4JfcOx1IlM78JQPLC2n6ji",
      externalLink: "https://open.spotify.com/track/4JfcOx1IlM78JQPLC2n6ji",
    },
  ],
} as const satisfies Track
