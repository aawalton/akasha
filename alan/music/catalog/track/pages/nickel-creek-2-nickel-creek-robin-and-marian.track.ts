import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2NickelCreekRobinAndMarian = {
  id: "01a0caa8-bc7f-7b92-a761-0e4b7f14db95",
  type: "page-type/track",
  slug: "nickel-creek-2-nickel-creek-robin-and-marian",
  ownLength: 4.57,
  ownProgress: 0,
  partOfCollections: ["release/nickel-creek-2-nickel-creek"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Robin And Marian",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "robinandmarian|3bcLBxvaI7GsBzGp3WHnwQ|274200",
  song: "song/nickel-creek-robin-and-marian",
  carriedBy: [
    {
      release: "release/nickel-creek-2-nickel-creek",
      discNumber: 1,
      position: 10,
      externalId: "2gfaYVBsjZrtXRTyy5ETMX",
      externalLink: "https://open.spotify.com/track/2gfaYVBsjZrtXRTyy5ETMX",
    },
  ],
} as const satisfies Track
