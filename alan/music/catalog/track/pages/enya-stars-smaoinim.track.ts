import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsSmaoinim = {
  id: "01a14a1d-db52-7622-a4a5-aed691db9590",
  type: "page-type/track",
  slug: "enya-stars-smaoinim",
  ownLength: 6.114,
  ownProgress: 6.114,
  partOfCollections: ["release/enya-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "Smaoinim",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "smaoinim|6uothxMWeLWIhsGeF7cyo4|366840",
  song: "song/enya-smaoinim",
  carriedBy: [
    {
      release: "release/enya-stars",
      discNumber: 1,
      position: 16,
      externalId: "2UzuhUglGB46pZtrtZnDpv",
      externalLink: "https://open.spotify.com/track/2UzuhUglGB46pZtrtZnDpv",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T14:00:54.619Z",
} as const satisfies Track
