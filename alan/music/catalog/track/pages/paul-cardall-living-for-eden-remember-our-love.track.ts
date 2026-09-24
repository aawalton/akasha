import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenRememberOurLove = {
  id: "01a0b4c8-4c0f-7cb4-87da-090e0581c17f",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-remember-our-love",
  ownLength: 3.5633333333333335,
  ownProgress: 3.5633333333333335,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "Remember Our Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "rememberourlove|7FQRbf8gbKw8KZQZAJWxH2|213800",
  song: "song/paul-cardall-remember-our-love",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 21,
      externalId: "1UDQ7mYToIXIME4oAPJPCN",
      externalLink: "https://open.spotify.com/track/1UDQ7mYToIXIME4oAPJPCN",
    },
  ],
} as const satisfies Track
