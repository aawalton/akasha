import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2NickelCreekOutOfTheWoods = {
  id: "01a0caa8-bb04-7521-94cc-215cf438d757",
  type: "page-type/track",
  slug: "nickel-creek-2-nickel-creek-out-of-the-woods",
  ownLength: 5.322883333333333,
  ownProgress: 5.322883333333333,
  partOfCollections: ["release/nickel-creek-2-nickel-creek"],
  status: "completed",
  unit: "unit/minutes",
  title: "Out Of The Woods",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/nickel-creek" }],
  trackKey: "outofthewoods|3bcLBxvaI7GsBzGp3WHnwQ|319373",
  song: "song/nickel-creek-out-of-the-woods",
  carriedBy: [
    {
      release: "release/nickel-creek-2-nickel-creek",
      discNumber: 1,
      position: 3,
      externalId: "0l4s9ze0CrQfOiE8jaMs1H",
      externalLink: "https://open.spotify.com/track/0l4s9ze0CrQfOiE8jaMs1H",
    },
  ],
} as const satisfies Track
