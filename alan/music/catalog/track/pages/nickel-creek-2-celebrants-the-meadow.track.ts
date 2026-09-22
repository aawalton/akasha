import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2CelebrantsTheMeadow = {
  id: "01a0caa8-a6e1-74ad-9ff2-d2873150d845",
  type: "page-type/track",
  slug: "nickel-creek-2-celebrants-the-meadow",
  ownLength: 3.5052166666666666,
  ownProgress: 3.5052166666666666,
  partOfCollections: ["release/nickel-creek-2-celebrants"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Meadow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "themeadow|3bcLBxvaI7GsBzGp3WHnwQ|210313",
  song: "song/nickel-creek-the-meadow",
  carriedBy: [
    {
      release: "release/nickel-creek-2-celebrants",
      discNumber: 1,
      position: 4,
      externalId: "61mYa1AjY3G82KZBLisoTU",
      externalLink: "https://open.spotify.com/track/61mYa1AjY3G82KZBLisoTU",
    },
  ],
} as const satisfies Track
