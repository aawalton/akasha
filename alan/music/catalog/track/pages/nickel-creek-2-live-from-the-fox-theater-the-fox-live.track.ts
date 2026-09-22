import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2LiveFromTheFoxTheaterTheFoxLive = {
  id: "01a0caa8-afa9-7868-9b2c-d84460b3d69b",
  type: "page-type/track",
  slug: "nickel-creek-2-live-from-the-fox-theater-the-fox-live",
  ownLength: 6.328216666666667,
  ownProgress: 0,
  partOfCollections: ["release/nickel-creek-2-live-from-the-fox-theater"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Fox - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "thefoxlive|3bcLBxvaI7GsBzGp3WHnwQ|379693",
  song: "song/nickel-creek-the-fox",
  carriedBy: [
    {
      release: "release/nickel-creek-2-live-from-the-fox-theater",
      discNumber: 1,
      position: 19,
      externalId: "5281fvLvqfvMbHY0T4HqhF",
      externalLink: "https://open.spotify.com/track/5281fvLvqfvMbHY0T4HqhF",
    },
  ],
} as const satisfies Track
