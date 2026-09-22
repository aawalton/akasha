import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ADottedLineRestOfMyLife = {
  id: "01a0caa8-b087-7c9c-a921-9b9a473e43bb",
  type: "page-type/track",
  slug: "nickel-creek-2-a-dotted-line-rest-of-my-life",
  ownLength: 3.661766666666667,
  ownProgress: 0,
  partOfCollections: ["release/nickel-creek-2-a-dotted-line"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Rest of My Life",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "restofmylife|3bcLBxvaI7GsBzGp3WHnwQ|219706",
  song: "song/nickel-creek-rest-of-my-life",
  carriedBy: [
    {
      release: "release/nickel-creek-2-a-dotted-line",
      discNumber: 1,
      position: 1,
      externalId: "7qDqSPENmshoAf816EyjXE",
      externalLink: "https://open.spotify.com/track/7qDqSPENmshoAf816EyjXE",
    },
  ],
} as const satisfies Track
