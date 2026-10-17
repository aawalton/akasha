import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansBoadicea = {
  id: "01a14a1d-db4e-7970-bae1-2d0271a1dfc5",
  type: "page-type/track",
  slug: "enya-oceans-boadicea",
  ownLength: 3.4617666666666667,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Boadicea",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "boadicea|6uothxMWeLWIhsGeF7cyo4|207706",
  song: "song/enya-boadicea",
  carriedBy: [
    {
      release: "release/enya-oceans",
      discNumber: 1,
      position: 15,
      externalId: "5N1mFNwwZzUSq3AEMZSFCQ",
      externalLink: "https://open.spotify.com/track/5N1mFNwwZzUSq3AEMZSFCQ",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
