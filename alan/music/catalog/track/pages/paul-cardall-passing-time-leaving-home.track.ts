import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPassingTimeLeavingHome = {
  id: "01a0b4c8-6c39-7285-837f-64874a6a3ba2",
  type: "page-type/track",
  slug: "paul-cardall-passing-time-leaving-home",
  ownLength: 2.1899166666666665,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-passing-time"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ICi7X5G3e1DM0F3woWhp1",
      externalLink: "https://open.spotify.com/track/1ICi7X5G3e1DM0F3woWhp1",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Leaving Home",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "leavinghome|7FQRbf8gbKw8KZQZAJWxH2|131395",
  song: "song/paul-cardall-leaving-home",
} as const satisfies Track
