import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraADifferentKindOfHumanStepIiDanceOnTheMoon = {
  id: "01a0b637-f8eb-7868-9a11-856e6f4f5c92",
  type: "page-type/track",
  slug: "aurora-a-different-kind-of-human-step-ii-dance-on-the-moon",
  ownLength: 3.6049,
  ownProgress: 3.6049,
  partOfCollections: [
    "release/aurora-a-different-kind-of-human-step-ii",
    "release/aurora-music-for-the-free-spirits",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Dance On The Moon",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "danceonthemoon|1WgXqy2Dd70QQOU7Ay074N|216294",
  song: "song/aurora-dance-on-the-moon",
  carriedBy: [
    {
      release: "release/aurora-a-different-kind-of-human-step-ii",
      discNumber: 1,
      position: 3,
      externalId: "4isOzW5MBwEI7RenDclFBx",
      externalLink: "https://open.spotify.com/track/4isOzW5MBwEI7RenDclFBx",
    },
    {
      release: "release/aurora-music-for-the-free-spirits",
      discNumber: 1,
      position: 2,
      externalId: "2Z1UyqikbyfLhkwt7q8l8l",
      externalLink: "https://open.spotify.com/track/2Z1UyqikbyfLhkwt7q8l8l",
    },
  ],
} as const satisfies Track
