import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2CelebrantsHoldingPattern = {
  id: "01a0caa8-a7ab-70c3-b668-f47dd1dcc3f2",
  type: "page-type/track",
  slug: "nickel-creek-2-celebrants-holding-pattern",
  ownLength: 3.0969333333333333,
  ownProgress: 3.0969333333333333,
  partOfCollections: ["release/nickel-creek-2-celebrants"],
  status: "completed",
  unit: "unit/minutes",
  title: "Holding Pattern",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "holdingpattern|3bcLBxvaI7GsBzGp3WHnwQ|185816",
  song: "song/nickel-creek-holding-pattern",
  carriedBy: [
    {
      release: "release/nickel-creek-2-celebrants",
      discNumber: 1,
      position: 7,
      externalId: "29MlUsEsDHZ1vIv7I41UVq",
      externalLink: "https://open.spotify.com/track/29MlUsEsDHZ1vIv7I41UVq",
    },
  ],
} as const satisfies Track
