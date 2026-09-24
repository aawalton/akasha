import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeEarthlyDelights = {
  id: "01a0b637-ec46-717a-ae19-aab779b1ed0b",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-earthly-delights",
  ownLength: 3.3533333333333335,
  ownProgress: 3.3533333333333335,
  partOfCollections: [
    "release/aurora-what-happened-to-the-heart-deluxe",
    "release/aurora-what-happened-to-the-heart",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Earthly Delights",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "earthlydelights|1WgXqy2Dd70QQOU7Ay074N|201200",
  song: "song/aurora-earthly-delights",
  carriedBy: [
    {
      release: "release/aurora-what-happened-to-the-heart",
      discNumber: 1,
      position: 7,
      externalId: "20c50cPpuuf6aSmvRTX8Ep",
      externalLink: "https://open.spotify.com/track/20c50cPpuuf6aSmvRTX8Ep",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 7,
      externalId: "1kk0xrPI07ZZMMNHINlKJj",
      externalLink: "https://open.spotify.com/track/1kk0xrPI07ZZMMNHINlKJj",
    },
  ],
} as const satisfies Track
