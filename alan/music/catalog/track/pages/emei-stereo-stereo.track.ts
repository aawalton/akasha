import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiStereoStereo = {
  id: "01a0c43e-770d-7f39-85d6-5c8cd9619657",
  type: "page-type/track",
  slug: "emei-stereo-stereo",
  ownLength: 2.457516666666667,
  ownProgress: 2.457516666666667,
  partOfCollections: ["release/emei-stereo"],
  status: "completed",
  unit: "unit/minutes",
  title: "Stereo",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Jax Jones" }, { artist: "artist/emei" }],
  trackKey: "stereo|4Q6nIcaBED8qUel8bBx6Cr,7E2aQQjErJocovYFjYLzWU|147451",
  song: "song/emei-stereo",
  carriedBy: [
    {
      release: "release/emei-stereo",
      discNumber: 1,
      position: 1,
      externalId: "65crqZhjAbaM6bmNCgDf9M",
      externalLink: "https://open.spotify.com/track/65crqZhjAbaM6bmNCgDf9M",
    },
  ],
} as const satisfies Track
