import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveDavesFarewellLive = {
  id: "01a0b4c8-592a-7628-962a-eef7dff12ff1",
  type: "page-type/track",
  slug: "paul-cardall-live-daves-farewell-live",
  ownLength: 3.59555,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-live"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ECRrUUmcf5yyxTPblqXEk",
      externalLink: "https://open.spotify.com/track/2ECRrUUmcf5yyxTPblqXEk",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Dave's Farewell - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "davesfarewelllive|7FQRbf8gbKw8KZQZAJWxH2|215733",
  song: "song/paul-cardall-daves-farewell",
} as const satisfies Track
