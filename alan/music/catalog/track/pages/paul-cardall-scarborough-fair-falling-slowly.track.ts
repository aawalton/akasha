import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallScarboroughFairFallingSlowly = {
  id: "01a0b4c8-6b7c-7336-925f-110be4982275",
  type: "page-type/track",
  slug: "paul-cardall-scarborough-fair-falling-slowly",
  ownLength: 3.1599333333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-scarborough-fair"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5s0xPDadrrHGWawd2FdPjU",
      externalLink: "https://open.spotify.com/track/5s0xPDadrrHGWawd2FdPjU",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Falling Slowly",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "fallingslowly|7FQRbf8gbKw8KZQZAJWxH2|189596",
} as const satisfies Track
