import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassRedeemingLove = {
  id: "01a0b4c8-620c-7b25-89db-cf00e671fe9d",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-redeeming-love",
  ownLength: 4.336666666666667,
  ownProgress: 4.336666666666667,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Redeeming Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "redeeminglove|7FQRbf8gbKw8KZQZAJWxH2|260200",
  song: "song/paul-cardall-redeeming-love",
  carriedBy: [
    {
      release: "release/paul-cardall-the-looking-glass",
      discNumber: 1,
      position: 14,
      externalId: "1lPQTXNCMSEufL5Bk6hJ2z",
      externalLink: "https://open.spotify.com/track/1lPQTXNCMSEufL5Bk6hJ2z",
    },
  ],
} as const satisfies Track
