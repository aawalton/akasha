import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyAlmostIsNeverEnough = {
  id: "01a0a6c5-309c-7a43-b9fe-e25a9a0bc4d7",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-almost-is-never-enough",
  ownLength: 5.462883333333333,
  ownProgress: 5.462883333333333,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  status: "completed",
  unit: "unit/minutes",
  title: "Almost Is Never Enough",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Nathan Sykes" }],
  trackKey: "almostisneverenough|2Rf4X6m0oayCJhaJ5K63GQ,66CXWjxzNUsdJxJ2JdwvnR|327773",
  song: "song/ariana-grande-almost-is-never-enough",
  carriedBy: [
    {
      release: "release/ariana-grande-yours-truly",
      discNumber: 1,
      position: 10,
      externalId: "63bo7NDoWdMFXufhsYOxwG",
      externalLink: "https://open.spotify.com/track/63bo7NDoWdMFXufhsYOxwG",
    },
  ],
} as const satisfies Track
