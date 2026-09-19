import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForFortyDaysTheMorningBreaks = {
  id: "01a0b4c8-3a6e-79e1-97cc-aa4c9fb996e6",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-forty-days-the-morning-breaks",
  ownLength: 1.9286666666666668,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-forty-days"],
  position: 25,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "25J1EDD1Up25EUTJGFD4mI",
      externalLink: "https://open.spotify.com/track/25J1EDD1Up25EUTJGFD4mI",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Morning Breaks",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "themorningbreaks|7FQRbf8gbKw8KZQZAJWxH2|115720",
  song: "song/paul-cardall-the-morning-breaks",
} as const satisfies Track
