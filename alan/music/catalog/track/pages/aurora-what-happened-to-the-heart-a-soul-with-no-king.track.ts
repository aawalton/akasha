import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartASoulWithNoKing = {
  id: "01a0b637-efce-7aa3-b20d-8e1554152126",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-a-soul-with-no-king",
  ownLength: 4.40755,
  ownProgress: 4.40755,
  partOfCollections: [
    "release/aurora-what-happened-to-the-heart",
    "release/aurora-what-happened-to-the-heart-deluxe",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "A Soul With No King",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "asoulwithnoking|1WgXqy2Dd70QQOU7Ay074N|264453",
  song: "song/aurora-a-soul-with-no-king",
  carriedBy: [
    {
      release: "release/aurora-what-happened-to-the-heart",
      discNumber: 1,
      position: 9,
      externalId: "7f6tNSh2jYBoYA9G4wj1On",
      externalLink: "https://open.spotify.com/track/7f6tNSh2jYBoYA9G4wj1On",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 9,
      externalId: "1UNZwi9zgSngoU7Yt0SXG1",
      externalLink: "https://open.spotify.com/track/1UNZwi9zgSngoU7Yt0SXG1",
    },
  ],
} as const satisfies Track
