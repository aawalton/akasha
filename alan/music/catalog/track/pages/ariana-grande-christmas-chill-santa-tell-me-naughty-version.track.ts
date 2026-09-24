import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasChillSantaTellMeNaughtyVersion = {
  id: "01a0a6c5-3aab-77d6-961c-3705380ec8c5",
  type: "page-type/track",
  slug: "ariana-grande-christmas-chill-santa-tell-me-naughty-version",
  ownLength: 3.39155,
  ownProgress: 3.39155,
  partOfCollections: ["release/ariana-grande-christmas-chill"],
  status: "completed",
  unit: "unit/minutes",
  title: "Santa Tell Me - Naughty Version",
  trackType: "version",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "santatellmenaughtyversion|66CXWjxzNUsdJxJ2JdwvnR|203493",
  song: "song/ariana-grande-santa-tell-me",
  carriedBy: [
    {
      release: "release/ariana-grande-christmas-chill",
      discNumber: 1,
      position: 7,
      externalId: "6V2JPFiAeqfZjM3A8VNr5q",
      externalLink: "https://open.spotify.com/track/6V2JPFiAeqfZjM3A8VNr5q",
    },
  ],
} as const satisfies Track
