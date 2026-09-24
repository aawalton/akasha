import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanSideToSide = {
  id: "01a0a6c5-2baa-7c69-9c7e-91f99443ad96",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-side-to-side",
  ownLength: 3.76955,
  ownProgress: 3.76955,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Side To Side",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Nicki Minaj" }],
  trackKey: "sidetoside|0hCNtLu0JehylgoiP8L4Gh,66CXWjxzNUsdJxJ2JdwvnR|226173",
  song: "song/ariana-grande-side-to-side",
  carriedBy: [
    {
      release: "release/ariana-grande-dangerous-woman",
      discNumber: 1,
      position: 5,
      externalId: "4HeCFqiB1rBqGqvE10rF1a",
      externalLink: "https://open.spotify.com/track/4HeCFqiB1rBqGqvE10rF1a",
    },
  ],
} as const satisfies Track
