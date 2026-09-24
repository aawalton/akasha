import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiEndOfAnEraEndOfAnEra = {
  id: "01a0c43e-7d6a-7ad0-9db2-18844d6b608b",
  type: "page-type/track",
  slug: "emei-end-of-an-era-end-of-an-era",
  ownLength: 2.2330833333333335,
  ownProgress: 2.2330833333333335,
  partOfCollections: ["release/emei-end-of-an-era"],
  status: "completed",
  unit: "unit/minutes",
  title: "End of an Era",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "endofanera|7E2aQQjErJocovYFjYLzWU|133985",
  song: "song/emei-end-of-an-era",
  carriedBy: [
    {
      release: "release/emei-end-of-an-era",
      discNumber: 1,
      position: 6,
      externalId: "5esqIDtXmnl0EIoiuLFsjp",
      externalLink: "https://open.spotify.com/track/5esqIDtXmnl0EIoiuLFsjp",
    },
  ],
} as const satisfies Track
