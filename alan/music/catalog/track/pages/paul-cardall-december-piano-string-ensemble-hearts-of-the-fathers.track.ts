import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberPianoStringEnsembleHeartsOfTheFathers = {
  id: "01a0b4c8-2e2d-7f0f-9597-925a221d08bd",
  type: "page-type/track",
  slug: "paul-cardall-december-piano-string-ensemble-hearts-of-the-fathers",
  ownLength: 3.2573333333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-december-piano-string-ensemble"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "17LubQYIUnoxzKPXMUJnEw",
      externalLink: "https://open.spotify.com/track/17LubQYIUnoxzKPXMUJnEw",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Hearts of The Fathers",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "heartsofthefathers|7FQRbf8gbKw8KZQZAJWxH2|195440",
  song: "song/paul-cardall-hearts-of-the-fathers",
} as const satisfies Track
