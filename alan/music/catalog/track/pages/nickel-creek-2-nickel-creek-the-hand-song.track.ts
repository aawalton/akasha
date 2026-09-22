import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2NickelCreekTheHandSong = {
  id: "01a0caa8-bc41-71c5-9833-eafea23f6ec3",
  type: "page-type/track",
  slug: "nickel-creek-2-nickel-creek-the-hand-song",
  ownLength: 4.446,
  ownProgress: 0,
  partOfCollections: ["release/nickel-creek-2-nickel-creek"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Hand Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "thehandsong|3bcLBxvaI7GsBzGp3WHnwQ|266760",
  song: "song/nickel-creek-the-hand-song",
  carriedBy: [
    {
      release: "release/nickel-creek-2-nickel-creek",
      discNumber: 1,
      position: 9,
      externalId: "4gmgga4dCc5u671MK8eD7X",
      externalLink: "https://open.spotify.com/track/4gmgga4dCc5u671MK8eD7X",
    },
  ],
} as const satisfies Track
