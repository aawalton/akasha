import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2CelebrantsGoddamnedSaintReprise = {
  id: "01a0caa8-a892-7cad-a824-86c4561ebff7",
  type: "page-type/track",
  slug: "nickel-creek-2-celebrants-goddamned-saint-reprise",
  ownLength: 0.85895,
  ownProgress: 0.85895,
  partOfCollections: ["release/nickel-creek-2-celebrants"],
  status: "completed",
  unit: "unit/minutes",
  title: "Goddamned Saint (Reprise)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "goddamnedsaintreprise|3bcLBxvaI7GsBzGp3WHnwQ|51537",
  song: "song/nickel-creek-goddamned-saint",
  carriedBy: [
    {
      release: "release/nickel-creek-2-celebrants",
      discNumber: 1,
      position: 11,
      externalId: "62qYZCeBw3IOhqjzbDR8QU",
      externalLink: "https://open.spotify.com/track/62qYZCeBw3IOhqjzbDR8QU",
    },
  ],
} as const satisfies Track
