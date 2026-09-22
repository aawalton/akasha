import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2CelebrantsHollywoodEnding = {
  id: "01a0caa8-a9a5-7d1a-bf65-00a641522ebe",
  type: "page-type/track",
  slug: "nickel-creek-2-celebrants-hollywood-ending",
  ownLength: 4.2895666666666665,
  ownProgress: 4.2895666666666665,
  partOfCollections: ["release/nickel-creek-2-celebrants"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hollywood Ending",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "hollywoodending|3bcLBxvaI7GsBzGp3WHnwQ|257374",
  song: "song/nickel-creek-hollywood-ending",
  carriedBy: [
    {
      release: "release/nickel-creek-2-celebrants",
      discNumber: 1,
      position: 15,
      externalId: "78sgoPbS9GN1PeSzHtuXY4",
      externalLink: "https://open.spotify.com/track/78sgoPbS9GN1PeSzHtuXY4",
    },
  ],
} as const satisfies Track
