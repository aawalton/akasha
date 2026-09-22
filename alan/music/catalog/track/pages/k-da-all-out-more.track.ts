import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kDaAllOutMore = {
  id: "01a0c957-ff5d-7ece-8865-6cd5ae482926",
  type: "page-type/track",
  slug: "k-da-all-out-more",
  ownLength: 3.618133333333333,
  ownProgress: 0,
  partOfCollections: ["release/k-da-all-out", "release/k-da-more"],
  status: "not-started",
  unit: "unit/minutes",
  title: "MORE",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "4gOc8TsQed9eqnqJct2c5v", artistName: "K/DA" },
    { externalId: "2kRfqPViCqYdSGhYSM9R0Q", artistName: "Madison Beer" },
    { externalId: "2AfmfGFbe0A0WsTYm0SDTx", artistName: "i-dle" },
    { externalId: "6fs2or0cKLEM2xohWq8SoX", artistName: "Lexie Liu" },
    { externalId: "0tRFWXqKBBQcu5oFVOgVzX", artistName: "Jaira Burns" },
    { externalId: "4TqlcgMFDryY96KWcvrhTv", artistName: "Seraphine" },
    { externalId: "47mIJdHORyRerp4os813jD", artistName: "League of Legends" },
  ],
  trackKey:
    "more|0tRFWXqKBBQcu5oFVOgVzX,2AfmfGFbe0A0WsTYm0SDTx,2kRfqPViCqYdSGhYSM9R0Q,47mIJdHORyRerp4os813jD,4TqlcgMFDryY96KWcvrhTv,4gOc8TsQed9eqnqJct2c5v,6fs2or0cKLEM2xohWq8SoX|217088",
  song: "song/k-da-more",
  carriedBy: [
    {
      release: "release/k-da-all-out",
      discNumber: 1,
      position: 2,
      externalId: "10lqhWPGTERQQpeI3AimBF",
      externalLink: "https://open.spotify.com/track/10lqhWPGTERQQpeI3AimBF",
    },
    {
      release: "release/k-da-more",
      discNumber: 1,
      position: 1,
      externalId: "65pHtEdxGt4e3Fv1ncPi6V",
      externalLink: "https://open.spotify.com/track/65pHtEdxGt4e3Fv1ncPi6V",
    },
  ],
} as const satisfies Track
