import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeRestlessHope = {
  id: "01a0b4c8-3f87-70e6-ba8b-2c83cdf6390b",
  type: "page-type/track",
  slug: "paul-cardall-new-life-restless-hope",
  ownLength: 2.2866666666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-new-life"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0k9om25NDDRTCrxqzUTdVo",
      externalLink: "https://open.spotify.com/track/0k9om25NDDRTCrxqzUTdVo",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Restless Hope",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "restlesshope|7FQRbf8gbKw8KZQZAJWxH2|137200",
  song: "song/paul-cardall-restless-hope",
} as const satisfies Track
