import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2LiveFromTheFoxTheaterSmoothieSongLive = {
  id: "01a0caa8-ac1c-73ba-ad00-48af80339a82",
  type: "page-type/track",
  slug: "nickel-creek-2-live-from-the-fox-theater-smoothie-song-live",
  ownLength: 4.864583333333333,
  ownProgress: 4.864583333333333,
  partOfCollections: ["release/nickel-creek-2-live-from-the-fox-theater"],
  status: "completed",
  unit: "unit/minutes",
  title: "Smoothie Song - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "smoothiesonglive|3bcLBxvaI7GsBzGp3WHnwQ|291875",
  song: "song/nickel-creek-smoothie-song",
  carriedBy: [
    {
      release: "release/nickel-creek-2-live-from-the-fox-theater",
      discNumber: 1,
      position: 6,
      externalId: "4nkzKNu8XGn8AGTPkO3kQs",
      externalLink: "https://open.spotify.com/track/4nkzKNu8XGn8AGTPkO3kQs",
    },
  ],
} as const satisfies Track
