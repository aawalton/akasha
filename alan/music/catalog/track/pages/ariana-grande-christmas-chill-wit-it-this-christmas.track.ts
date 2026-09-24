import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasChillWitItThisChristmas = {
  id: "01a0a6c5-3a06-7ca6-9345-4d6befe43135",
  type: "page-type/track",
  slug: "ariana-grande-christmas-chill-wit-it-this-christmas",
  ownLength: 2.6878166666666665,
  ownProgress: 2.6878166666666665,
  partOfCollections: ["release/ariana-grande-christmas-chill"],
  status: "completed",
  unit: "unit/minutes",
  title: "Wit It This Christmas",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "wititthischristmas|66CXWjxzNUsdJxJ2JdwvnR|161269",
  song: "song/ariana-grande-wit-it-this-christmas",
  carriedBy: [
    {
      release: "release/ariana-grande-christmas-chill",
      discNumber: 1,
      position: 2,
      externalId: "5E1VtxCfgrXsbbp9g6sFq5",
      externalLink: "https://open.spotify.com/track/5E1VtxCfgrXsbbp9g6sFq5",
    },
  ],
} as const satisfies Track
