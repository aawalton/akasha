import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2LiveFromTheFoxTheaterHayloftLive = {
  id: "01a0caa8-af67-7235-9417-bd5506f0c32a",
  type: "page-type/track",
  slug: "nickel-creek-2-live-from-the-fox-theater-hayloft-live",
  ownLength: 3.523416666666667,
  ownProgress: 0,
  partOfCollections: ["release/nickel-creek-2-live-from-the-fox-theater"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Hayloft - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "hayloftlive|3bcLBxvaI7GsBzGp3WHnwQ|211405",
  song: "song/nickel-creek-hayloft",
  carriedBy: [
    {
      release: "release/nickel-creek-2-live-from-the-fox-theater",
      discNumber: 1,
      position: 18,
      externalId: "6nBfhdq0uGnd7CEk8rEyed",
      externalLink: "https://open.spotify.com/track/6nBfhdq0uGnd7CEk8rEyed",
    },
  ],
} as const satisfies Track
