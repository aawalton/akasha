import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ThisSideSevenWonders = {
  id: "01a0caa8-b936-7ee5-832e-abbc66d39455",
  type: "page-type/track",
  slug: "nickel-creek-2-this-side-seven-wonders",
  ownLength: 4.168666666666667,
  ownProgress: 0,
  partOfCollections: ["release/nickel-creek-2-this-side"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Seven Wonders",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "sevenwonders|3bcLBxvaI7GsBzGp3WHnwQ|250120",
  song: "song/nickel-creek-seven-wonders",
  carriedBy: [
    {
      release: "release/nickel-creek-2-this-side",
      discNumber: 1,
      position: 8,
      externalId: "2pszqheZOxlZs9cpJItBDL",
      externalLink: "https://open.spotify.com/track/2pszqheZOxlZs9cpJItBDL",
    },
  ],
} as const satisfies Track
