import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsEclipse = {
  id: "01a14a1d-db51-7b90-a6b5-3aa66e5720fd",
  type: "page-type/track",
  slug: "enya-stars-eclipse",
  ownLength: 1.54,
  ownProgress: 1.54,
  partOfCollections: ["release/enya-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "Eclipse",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "eclipse|6uothxMWeLWIhsGeF7cyo4|92400",
  song: "song/enya-eclipse",
  carriedBy: [
    {
      release: "release/enya-stars",
      discNumber: 1,
      position: 8,
      externalId: "4sgNFWGvcn4oERDxrnjlXD",
      externalLink: "https://open.spotify.com/track/4sgNFWGvcn4oERDxrnjlXD",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T14:00:54.619Z",
} as const satisfies Track
