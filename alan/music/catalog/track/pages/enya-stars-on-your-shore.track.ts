import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsOnYourShore = {
  id: "01a14a1d-db51-7138-9a42-f03b3a273bca",
  type: "page-type/track",
  slug: "enya-stars-on-your-shore",
  ownLength: 3.9966666666666666,
  ownProgress: 3.9966666666666666,
  partOfCollections: ["release/enya-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "On Your Shore",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "onyourshore|6uothxMWeLWIhsGeF7cyo4|239800",
  song: "song/enya-on-your-shore",
  carriedBy: [
    {
      release: "release/enya-stars",
      discNumber: 1,
      position: 10,
      externalId: "28khKDAOuQvtkuN3tt6E5R",
      externalLink: "https://open.spotify.com/track/28khKDAOuQvtkuN3tt6E5R",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T14:00:54.619Z",
} as const satisfies Track
