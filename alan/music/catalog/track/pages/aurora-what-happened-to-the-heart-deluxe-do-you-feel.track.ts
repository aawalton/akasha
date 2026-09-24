import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeDoYouFeel = {
  id: "01a0b637-ecfd-738e-bd53-8c6d6f6a5e04",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-do-you-feel",
  ownLength: 3.0251,
  ownProgress: 3.0251,
  partOfCollections: [
    "release/aurora-what-happened-to-the-heart-deluxe",
    "release/aurora-what-happened-to-the-heart",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Do You Feel?",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "doyoufeel|1WgXqy2Dd70QQOU7Ay074N|181506",
  song: "song/aurora-do-you-feel",
  carriedBy: [
    {
      release: "release/aurora-what-happened-to-the-heart",
      discNumber: 1,
      position: 12,
      externalId: "6vAT53Wp20Q11vpUypcT7h",
      externalLink: "https://open.spotify.com/track/6vAT53Wp20Q11vpUypcT7h",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 12,
      externalId: "0mgcVLtDeAzqqznnRbpUXw",
      externalLink: "https://open.spotify.com/track/0mgcVLtDeAzqqznnRbpUXw",
    },
  ],
} as const satisfies Track
