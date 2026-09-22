import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2LiveFromTheFoxTheaterHelenaLive = {
  id: "01a0caa8-afe7-7b89-826b-e8713c378114",
  type: "page-type/track",
  slug: "nickel-creek-2-live-from-the-fox-theater-helena-live",
  ownLength: 6.849766666666667,
  ownProgress: 6.849766666666667,
  partOfCollections: ["release/nickel-creek-2-live-from-the-fox-theater"],
  status: "completed",
  unit: "unit/minutes",
  title: "Helena - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "helenalive|3bcLBxvaI7GsBzGp3WHnwQ|410986",
  song: "song/nickel-creek-helena",
  carriedBy: [
    {
      release: "release/nickel-creek-2-live-from-the-fox-theater",
      discNumber: 1,
      position: 20,
      externalId: "1wKJKwIWdXeLPZZbzAyHPe",
      externalLink: "https://open.spotify.com/track/1wKJKwIWdXeLPZZbzAyHPe",
    },
  ],
} as const satisfies Track
