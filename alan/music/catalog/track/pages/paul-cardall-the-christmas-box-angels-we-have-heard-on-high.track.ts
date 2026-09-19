import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxAngelsWeHaveHeardOnHigh = {
  id: "01a0b4c8-649a-7182-a74e-a613193de339",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-angels-we-have-heard-on-high",
  ownLength: 2.736666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4eUxxbgCyTXzzrQrhYnxt2",
      externalLink: "https://open.spotify.com/track/4eUxxbgCyTXzzrQrhYnxt2",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Angels We Have Heard On High",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "angelswehaveheardonhigh|7FQRbf8gbKw8KZQZAJWxH2|164200",
  song: "song/paul-cardall-angels-we-have-heard-on-high",
} as const satisfies Track
