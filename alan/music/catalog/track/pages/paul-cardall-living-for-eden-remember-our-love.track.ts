import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenRememberOurLove = {
  id: "01a0b4c8-4c0f-7cb4-87da-090e0581c17f",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-remember-our-love",
  ownLength: 3.5633333333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 21,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1UDQ7mYToIXIME4oAPJPCN",
      externalLink: "https://open.spotify.com/track/1UDQ7mYToIXIME4oAPJPCN",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Remember Our Love",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "rememberourlove|7FQRbf8gbKw8KZQZAJWxH2|213800",
  song: "song/paul-cardall-remember-our-love",
} as const satisfies Track
