import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanStepOnUp = {
  id: "01a0a6c5-2d17-7e96-b9d5-f22d81c07c60",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-step-on-up",
  ownLength: 3.0142166666666665,
  ownProgress: 3.0142166666666665,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Step On Up",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "steponup|66CXWjxzNUsdJxJ2JdwvnR|180853",
  song: "song/ariana-grande-step-on-up",
  carriedBy: [
    {
      release: "release/ariana-grande-dangerous-woman",
      discNumber: 1,
      position: 16,
      externalId: "3K1y89UHuAEZbpiSPbtAae",
      externalLink: "https://open.spotify.com/track/3K1y89UHuAEZbpiSPbtAae",
    },
  ],
} as const satisfies Track
