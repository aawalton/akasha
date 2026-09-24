import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeAlrightYourBlood = {
  id: "01a0b638-0056-7ce1-aa2c-587361640eb8",
  type: "page-type/track",
  slug: "aurora-to-be-alright-your-blood",
  ownLength: 4.124883333333333,
  ownProgress: 4.124883333333333,
  partOfCollections: [
    "release/aurora-to-be-alright",
    "release/aurora-what-happened-to-the-heart-deluxe",
    "release/aurora-what-happened-to-the-heart",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Your Blood",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "yourblood|1WgXqy2Dd70QQOU7Ay074N|247493",
  song: "song/aurora-your-blood",
  carriedBy: [
    {
      release: "release/aurora-to-be-alright",
      discNumber: 1,
      position: 4,
      externalId: "0yumrjXIijfMWA9zowYxwi",
      externalLink: "https://open.spotify.com/track/0yumrjXIijfMWA9zowYxwi",
    },
    {
      release: "release/aurora-what-happened-to-the-heart",
      discNumber: 1,
      position: 3,
      externalId: "6PbC1xivXYIWLXHDIC2Qd2",
      externalLink: "https://open.spotify.com/track/6PbC1xivXYIWLXHDIC2Qd2",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 3,
      externalId: "5Nj9Yrztp3YZOzIrvEWFZQ",
      externalLink: "https://open.spotify.com/track/5Nj9Yrztp3YZOzIrvEWFZQ",
    },
  ],
} as const satisfies Track
