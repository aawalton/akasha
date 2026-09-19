import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarINeedTheeEveryHour = {
  id: "01a0b4c8-190b-7d68-9ae4-17ad3a22574a",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-i-need-thee-every-hour",
  ownLength: 3.716666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6bgO9jWxDZxBpX8l8QbSPK",
      externalLink: "https://open.spotify.com/track/6bgO9jWxDZxBpX8l8QbSPK",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "I Need Thee Every Hour",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "ineedtheeeveryhour|7FQRbf8gbKw8KZQZAJWxH2|223000",
  song: "song/paul-cardall-i-need-thee-every-hour",
} as const satisfies Track
