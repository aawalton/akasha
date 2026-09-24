import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeAlrightSomeTypeOfSkin = {
  id: "01a0b638-0009-7917-99d3-b3341916d393",
  type: "page-type/track",
  slug: "aurora-to-be-alright-some-type-of-skin",
  ownLength: 3.1888833333333335,
  ownProgress: 3.1888833333333335,
  partOfCollections: [
    "release/aurora-to-be-alright",
    "release/aurora-what-happened-to-the-heart-deluxe",
    "release/aurora-what-happened-to-the-heart",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Some Type Of Skin",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "sometypeofskin|1WgXqy2Dd70QQOU7Ay074N|191333",
  song: "song/aurora-some-type-of-skin",
  carriedBy: [
    {
      release: "release/aurora-to-be-alright",
      discNumber: 1,
      position: 2,
      externalId: "6LK189UNYqDcUdCDDYIUNA",
      externalLink: "https://open.spotify.com/track/6LK189UNYqDcUdCDDYIUNA",
    },
    {
      release: "release/aurora-what-happened-to-the-heart",
      discNumber: 1,
      position: 5,
      externalId: "0mWkmMkc66lRlJP4hTkv9N",
      externalLink: "https://open.spotify.com/track/0mWkmMkc66lRlJP4hTkv9N",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "4KKChIbIZku9GCTkR2gzXM",
      externalLink: "https://open.spotify.com/track/4KKChIbIZku9GCTkR2gzXM",
    },
  ],
} as const satisfies Track
