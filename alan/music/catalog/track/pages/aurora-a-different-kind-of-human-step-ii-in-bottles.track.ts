import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraADifferentKindOfHumanStepIiInBottles = {
  id: "01a0b637-f986-7521-89ef-825c15294536",
  type: "page-type/track",
  slug: "aurora-a-different-kind-of-human-step-ii-in-bottles",
  ownLength: 3.969533333333333,
  ownProgress: 3.969533333333333,
  partOfCollections: [
    "release/aurora-a-different-kind-of-human-step-ii",
    "release/aurora-for-the-metal-people",
    "release/aurora-music-for-the-fellow-witches-out-there",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "In Bottles",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "inbottles|1WgXqy2Dd70QQOU7Ay074N|238172",
  song: "song/aurora-in-bottles",
  carriedBy: [
    {
      release: "release/aurora-a-different-kind-of-human-step-ii",
      discNumber: 1,
      position: 7,
      externalId: "77jfTk3x403OSSMBq2tSgN",
      externalLink: "https://open.spotify.com/track/77jfTk3x403OSSMBq2tSgN",
    },
    {
      release: "release/aurora-for-the-metal-people",
      discNumber: 1,
      position: 4,
      externalId: "2ViiSVrwTOxKhmYX8fNIA3",
      externalLink: "https://open.spotify.com/track/2ViiSVrwTOxKhmYX8fNIA3",
    },
    {
      release: "release/aurora-music-for-the-fellow-witches-out-there",
      discNumber: 1,
      position: 2,
      externalId: "79h8I47oSCgNwjfw3e4kLk",
      externalLink: "https://open.spotify.com/track/79h8I47oSCgNwjfw3e4kLk",
    },
  ],
} as const satisfies Track
