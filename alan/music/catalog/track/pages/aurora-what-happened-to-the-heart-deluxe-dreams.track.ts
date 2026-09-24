import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeDreams = {
  id: "01a0b637-ecb0-777e-a88d-976194a5533e",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-dreams",
  ownLength: 4.40155,
  ownProgress: 4.40155,
  partOfCollections: [
    "release/aurora-what-happened-to-the-heart-deluxe",
    "release/aurora-what-happened-to-the-heart",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Dreams",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "dreams|1WgXqy2Dd70QQOU7Ay074N|264093",
  song: "song/aurora-dreams",
  carriedBy: [
    {
      release: "release/aurora-what-happened-to-the-heart",
      discNumber: 1,
      position: 10,
      externalId: "2B6p25DfeEkYYbpShv22b9",
      externalLink: "https://open.spotify.com/track/2B6p25DfeEkYYbpShv22b9",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 10,
      externalId: "64WS2f2lhljBYxiRcYQd2R",
      externalLink: "https://open.spotify.com/track/64WS2f2lhljBYxiRcYQd2R",
    },
  ],
} as const satisfies Track
