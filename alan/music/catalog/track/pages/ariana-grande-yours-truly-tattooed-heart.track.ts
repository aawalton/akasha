import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyTattooedHeart = {
  id: "01a0a6c5-2fc6-7e49-9eb9-1cffda25161f",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-tattooed-heart",
  ownLength: 3.2451,
  ownProgress: 3.2451,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  status: "completed",
  unit: "unit/minutes",
  title: "Tattooed Heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "tattooedheart|66CXWjxzNUsdJxJ2JdwvnR|194706",
  song: "song/ariana-grande-tattooed-heart",
  carriedBy: [
    {
      release: "release/ariana-grande-yours-truly",
      discNumber: 1,
      position: 4,
      externalId: "5yxghrFKJbU7pcaUFEv1Sg",
      externalLink: "https://open.spotify.com/track/5yxghrFKJbU7pcaUFEv1Sg",
    },
  ],
} as const satisfies Track
