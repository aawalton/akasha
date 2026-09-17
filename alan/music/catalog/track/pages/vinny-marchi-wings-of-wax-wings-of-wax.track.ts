import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiWingsOfWaxWingsOfWax = {
  id: "01a0b112-944a-7c7f-a737-11c6f8a83807",
  type: "page-type/track",
  slug: "vinny-marchi-wings-of-wax-wings-of-wax",
  ownLength: 3.8152333333333335,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-wings-of-wax"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1PDdKCwJ7dM8YTQOApRPUk",
      externalLink: "https://open.spotify.com/track/1PDdKCwJ7dM8YTQOApRPUk",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Wings of Wax",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "wingsofwax|5USAMqcbMAzF3HBmeD5pJF|228914",
} as const satisfies Track
