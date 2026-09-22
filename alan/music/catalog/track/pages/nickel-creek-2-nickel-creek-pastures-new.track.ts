import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2NickelCreekPasturesNew = {
  id: "01a0caa8-bce5-75fa-8413-17db3a784c12",
  type: "page-type/track",
  slug: "nickel-creek-2-nickel-creek-pastures-new",
  ownLength: 3.8848833333333332,
  ownProgress: 3.8848833333333332,
  partOfCollections: ["release/nickel-creek-2-nickel-creek"],
  status: "completed",
  unit: "unit/minutes",
  title: "Pastures New",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "pasturesnew|3bcLBxvaI7GsBzGp3WHnwQ|233093",
  song: "song/nickel-creek-pastures-new",
  carriedBy: [
    {
      release: "release/nickel-creek-2-nickel-creek",
      discNumber: 1,
      position: 12,
      externalId: "0FngZC9wJx2CPJIusVNYPh",
      externalLink: "https://open.spotify.com/track/0FngZC9wJx2CPJIusVNYPh",
    },
  ],
} as const satisfies Track
