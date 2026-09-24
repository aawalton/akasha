import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeStarvation = {
  id: "01a0b637-ed23-7c00-a499-a3c5a550b667",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-starvation",
  ownLength: 3.4602166666666667,
  ownProgress: 3.4602166666666667,
  partOfCollections: [
    "release/aurora-what-happened-to-the-heart-deluxe",
    "release/aurora-what-happened-to-the-heart",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Starvation",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "starvation|1WgXqy2Dd70QQOU7Ay074N|207613",
  song: "song/aurora-starvation",
  carriedBy: [
    {
      release: "release/aurora-what-happened-to-the-heart",
      discNumber: 1,
      position: 13,
      externalId: "6rtwjJHMx7pNd6xAnT8nK8",
      externalLink: "https://open.spotify.com/track/6rtwjJHMx7pNd6xAnT8nK8",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 13,
      externalId: "4UQFQCAmeSqePxUBeaShTQ",
      externalLink: "https://open.spotify.com/track/4UQFQCAmeSqePxUBeaShTQ",
    },
  ],
} as const satisfies Track
