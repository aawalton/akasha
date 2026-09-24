import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerBreathin = {
  id: "01a0a6c5-2a13-75b0-a770-cb76f46f71c7",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-breathin",
  ownLength: 3.3026666666666666,
  ownProgress: 3.3026666666666666,
  partOfCollections: ["release/ariana-grande-sweetener"],
  status: "completed",
  unit: "unit/minutes",
  title: "breathin",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "breathin|66CXWjxzNUsdJxJ2JdwvnR|198160",
  song: "song/ariana-grande-breathin",
  carriedBy: [
    {
      release: "release/ariana-grande-sweetener",
      discNumber: 1,
      position: 9,
      externalId: "4OafepJy2teCjYJbvFE60J",
      externalLink: "https://open.spotify.com/track/4OafepJy2teCjYJbvFE60J",
    },
  ],
} as const satisfies Track
