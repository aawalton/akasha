import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2LiveFromTheFoxTheaterRestOfMyLifeLive = {
  id: "01a0caa8-aac1-7e19-82bc-247437e20953",
  type: "page-type/track",
  slug: "nickel-creek-2-live-from-the-fox-theater-rest-of-my-life-live",
  ownLength: 4.2975666666666665,
  ownProgress: 0,
  partOfCollections: ["release/nickel-creek-2-live-from-the-fox-theater"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Rest of My Life - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "restofmylifelive|3bcLBxvaI7GsBzGp3WHnwQ|257854",
  song: "song/nickel-creek-rest-of-my-life",
  carriedBy: [
    {
      release: "release/nickel-creek-2-live-from-the-fox-theater",
      discNumber: 1,
      position: 1,
      externalId: "5MPSUuEkZOFMT4S5o7Ab8X",
      externalLink: "https://open.spotify.com/track/5MPSUuEkZOFMT4S5o7Ab8X",
    },
  ],
} as const satisfies Track
