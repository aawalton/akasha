import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2CelebrantsGoddamnedSaint = {
  id: "01a0caa8-a82b-7533-8425-1be1615860da",
  type: "page-type/track",
  slug: "nickel-creek-2-celebrants-goddamned-saint",
  ownLength: 4.727833333333334,
  ownProgress: 0,
  partOfCollections: ["release/nickel-creek-2-celebrants"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Goddamned Saint",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "goddamnedsaint|3bcLBxvaI7GsBzGp3WHnwQ|283670",
  song: "song/nickel-creek-goddamned-saint",
  carriedBy: [
    {
      release: "release/nickel-creek-2-celebrants",
      discNumber: 1,
      position: 9,
      externalId: "0ywZnofynOAMRjjQKokdpF",
      externalLink: "https://open.spotify.com/track/0ywZnofynOAMRjjQKokdpF",
    },
  ],
} as const satisfies Track
