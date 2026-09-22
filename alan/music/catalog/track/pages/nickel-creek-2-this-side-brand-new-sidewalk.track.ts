import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ThisSideBrandNewSidewalk = {
  id: "01a0caa8-ba8e-7dac-8f37-8dd43936f1b0",
  type: "page-type/track",
  slug: "nickel-creek-2-this-side-brand-new-sidewalk",
  ownLength: 4.28155,
  ownProgress: 4.28155,
  partOfCollections: ["release/nickel-creek-2-this-side"],
  status: "completed",
  unit: "unit/minutes",
  title: "Brand New Sidewalk",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "brandnewsidewalk|3bcLBxvaI7GsBzGp3WHnwQ|256893",
  song: "song/nickel-creek-brand-new-sidewalk",
  carriedBy: [
    {
      release: "release/nickel-creek-2-this-side",
      discNumber: 1,
      position: 13,
      externalId: "6Fys7dSpGYIfdvEVAUNLaE",
      externalLink: "https://open.spotify.com/track/6Fys7dSpGYIfdvEVAUNLaE",
    },
  ],
} as const satisfies Track
