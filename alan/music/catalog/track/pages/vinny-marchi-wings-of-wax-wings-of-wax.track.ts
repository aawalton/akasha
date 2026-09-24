import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiWingsOfWaxWingsOfWax = {
  id: "01a0b112-944a-7c7f-a737-11c6f8a83807",
  type: "page-type/track",
  slug: "vinny-marchi-wings-of-wax-wings-of-wax",
  ownLength: 3.8152333333333335,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-wings-of-wax"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Wings of Wax",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "wingsofwax|5USAMqcbMAzF3HBmeD5pJF|228914",
  song: "song/vinny-marchi-wings-of-wax",
  carriedBy: [
    {
      release: "release/vinny-marchi-wings-of-wax",
      discNumber: 1,
      position: 1,
      externalId: "1PDdKCwJ7dM8YTQOApRPUk",
      externalLink: "https://open.spotify.com/track/1PDdKCwJ7dM8YTQOApRPUk",
    },
  ],
} as const satisfies Track
