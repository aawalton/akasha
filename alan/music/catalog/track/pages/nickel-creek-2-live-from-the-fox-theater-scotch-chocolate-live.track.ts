import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2LiveFromTheFoxTheaterScotchChocolateLive = {
  id: "01a0caa8-ab06-70ae-a6d0-cd515a4ec889",
  type: "page-type/track",
  slug: "nickel-creek-2-live-from-the-fox-theater-scotch-chocolate-live",
  ownLength: 3.588983333333333,
  ownProgress: 0,
  partOfCollections: ["release/nickel-creek-2-live-from-the-fox-theater"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Scotch & Chocolate - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "scotchchocolatelive|3bcLBxvaI7GsBzGp3WHnwQ|215339",
  song: "song/nickel-creek-scotch-chocolate",
  carriedBy: [
    {
      release: "release/nickel-creek-2-live-from-the-fox-theater",
      discNumber: 1,
      position: 2,
      externalId: "7G3ssBU0fqRAxKKIf4HIuM",
      externalLink: "https://open.spotify.com/track/7G3ssBU0fqRAxKKIf4HIuM",
    },
  ],
} as const satisfies Track
