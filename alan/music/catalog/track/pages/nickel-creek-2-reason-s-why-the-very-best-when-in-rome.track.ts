import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ReasonSWhyTheVeryBestWhenInRome = {
  id: "01a0caa8-b2be-7442-89a0-8faf4f3549e0",
  type: "page-type/track",
  slug: "nickel-creek-2-reason-s-why-the-very-best-when-in-rome",
  ownLength: 4.259766666666667,
  ownProgress: 0,
  partOfCollections: ["release/nickel-creek-2-reason-s-why-the-very-best"],
  status: "not-started",
  unit: "unit/minutes",
  title: "When In Rome",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "wheninrome|3bcLBxvaI7GsBzGp3WHnwQ|255586",
  song: "song/nickel-creek-when-in-rome",
  carriedBy: [
    {
      release: "release/nickel-creek-2-reason-s-why-the-very-best",
      discNumber: 1,
      position: 3,
      externalId: "46arFjQJkK7H09CAwKU4DS",
      externalLink: "https://open.spotify.com/track/46arFjQJkK7H09CAwKU4DS",
    },
  ],
} as const satisfies Track
