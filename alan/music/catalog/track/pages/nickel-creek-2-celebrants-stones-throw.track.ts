import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2CelebrantsStonesThrow = {
  id: "01a0caa8-a86b-7ad5-87d6-b56da8008113",
  type: "page-type/track",
  slug: "nickel-creek-2-celebrants-stones-throw",
  ownLength: 3.18015,
  ownProgress: 3.18015,
  partOfCollections: ["release/nickel-creek-2-celebrants"],
  status: "completed",
  unit: "unit/minutes",
  title: "Stone's Throw",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "stonesthrow|3bcLBxvaI7GsBzGp3WHnwQ|190809",
  song: "song/nickel-creek-stones-throw",
  carriedBy: [
    {
      release: "release/nickel-creek-2-celebrants",
      discNumber: 1,
      position: 10,
      externalId: "7ytd1KenOi1tjEMF7USw9f",
      externalLink: "https://open.spotify.com/track/7ytd1KenOi1tjEMF7USw9f",
    },
  ],
} as const satisfies Track
