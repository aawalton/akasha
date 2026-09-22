import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ThisSideSmoothieSong = {
  id: "01a0caa8-b78a-72bf-8b2e-2cac039300fe",
  type: "page-type/track",
  slug: "nickel-creek-2-this-side-smoothie-song",
  ownLength: 3.34355,
  ownProgress: 3.34355,
  partOfCollections: ["release/nickel-creek-2-this-side"],
  status: "completed",
  unit: "unit/minutes",
  title: "Smoothie Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "smoothiesong|3bcLBxvaI7GsBzGp3WHnwQ|200613",
  song: "song/nickel-creek-smoothie-song",
  carriedBy: [
    {
      release: "release/nickel-creek-2-this-side",
      discNumber: 1,
      position: 1,
      externalId: "0ETiP5S8lbp8w6O7hc70Kk",
      externalLink: "https://open.spotify.com/track/0ETiP5S8lbp8w6O7hc70Kk",
    },
  ],
} as const satisfies Track
