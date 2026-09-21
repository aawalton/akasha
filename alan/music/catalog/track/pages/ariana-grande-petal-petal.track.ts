import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalPetal = {
  id: "01a0a6c5-0426-76fa-842b-0a414378c47c",
  type: "page-type/track",
  slug: "ariana-grande-petal-petal",
  ownLength: 3.0708,
  ownProgress: 3.0708,
  partOfCollections: ["release/ariana-grande-petal"],
  status: "completed",
  unit: "unit/minutes",
  title: "petal",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "petal|66CXWjxzNUsdJxJ2JdwvnR|184248",
  song: "song/ariana-grande-petal",
  carriedBy: [
    {
      release: "release/ariana-grande-petal",
      discNumber: 1,
      position: 3,
      externalId: "70pVCVMGjmIWPbWXDwf11e",
      externalLink: "https://open.spotify.com/track/70pVCVMGjmIWPbWXDwf11e",
    },
  ],
} as const satisfies Track
