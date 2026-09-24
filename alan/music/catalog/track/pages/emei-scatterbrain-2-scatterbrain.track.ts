import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrain2Scatterbrain = {
  id: "01a0c43e-7550-7567-b373-a504f0f4f8a9",
  type: "page-type/track",
  slug: "emei-scatterbrain-2-scatterbrain",
  ownLength: 2.1656333333333335,
  ownProgress: 2.1656333333333335,
  partOfCollections: [
    "release/emei-scatterbrain-2",
    "release/emei-scatterbrain-deluxe",
    "release/emei-scatterbrain",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Scatterbrain",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "scatterbrain|7E2aQQjErJocovYFjYLzWU|129938",
  song: "song/emei-scatterbrain",
  carriedBy: [
    {
      release: "release/emei-scatterbrain",
      discNumber: 1,
      position: 1,
      externalId: "5DKcc3WxMwE7JB1IxCrdrs",
      externalLink: "https://open.spotify.com/track/5DKcc3WxMwE7JB1IxCrdrs",
    },
    {
      release: "release/emei-scatterbrain-2",
      discNumber: 1,
      position: 2,
      externalId: "0LVdV9NG0y0ROxbYLpjbKc",
      externalLink: "https://open.spotify.com/track/0LVdV9NG0y0ROxbYLpjbKc",
    },
    {
      release: "release/emei-scatterbrain-deluxe",
      discNumber: 1,
      position: 2,
      externalId: "6O2bj4fwNzE3emEcjYzQu6",
      externalLink: "https://open.spotify.com/track/6O2bj4fwNzE3emEcjYzQu6",
    },
  ],
} as const satisfies Track
