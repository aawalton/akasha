import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeAlrightTheConflictOfTheMind = {
  id: "01a0b638-0030-720f-9fef-480e45111b91",
  type: "page-type/track",
  slug: "aurora-to-be-alright-the-conflict-of-the-mind",
  ownLength: 4.24355,
  ownProgress: 4.24355,
  partOfCollections: [
    "release/aurora-to-be-alright",
    "release/aurora-what-happened-to-the-heart-deluxe",
    "release/aurora-what-happened-to-the-heart",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The Conflict Of The Mind",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "theconflictofthemind|1WgXqy2Dd70QQOU7Ay074N|254613",
  song: "song/aurora-the-conflict-of-the-mind",
  carriedBy: [
    {
      release: "release/aurora-to-be-alright",
      discNumber: 1,
      position: 3,
      externalId: "1EUige1Y1Brv1NFMn7D8wR",
      externalLink: "https://open.spotify.com/track/1EUige1Y1Brv1NFMn7D8wR",
    },
    {
      release: "release/aurora-what-happened-to-the-heart",
      discNumber: 1,
      position: 4,
      externalId: "0mwf9Wp3U2wENjzG5dk7cG",
      externalLink: "https://open.spotify.com/track/0mwf9Wp3U2wENjzG5dk7cG",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 4,
      externalId: "6zXLza3EXxPlhcrHWRQRF3",
      externalLink: "https://open.spotify.com/track/6zXLza3EXxPlhcrHWRQRF3",
    },
  ],
} as const satisfies Track
