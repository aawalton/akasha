import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ThisSideHouseCarpenter = {
  id: "01a0caa8-b97a-71d3-8e9a-54e58025c060",
  type: "page-type/track",
  slug: "nickel-creek-2-this-side-house-carpenter",
  ownLength: 5.509333333333333,
  ownProgress: 5.509333333333333,
  partOfCollections: ["release/nickel-creek-2-this-side"],
  status: "completed",
  unit: "unit/minutes",
  title: "House Carpenter",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "housecarpenter|3bcLBxvaI7GsBzGp3WHnwQ|330560",
  song: "song/nickel-creek-house-carpenter",
  carriedBy: [
    {
      release: "release/nickel-creek-2-this-side",
      discNumber: 1,
      position: 9,
      externalId: "6d34dFS44aY9imSn4buqYr",
      externalLink: "https://open.spotify.com/track/6d34dFS44aY9imSn4buqYr",
    },
  ],
} as const satisfies Track
