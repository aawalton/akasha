import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallShropshireHillsShropshireHills = {
  id: "01a0b4c8-68ec-746e-b4b9-9505adbd1d3a",
  type: "page-type/track",
  slug: "paul-cardall-shropshire-hills-shropshire-hills",
  ownLength: 3.2373833333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-shropshire-hills"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ksVMUu5C2jeLVSTiFXxnY",
      externalLink: "https://open.spotify.com/track/2ksVMUu5C2jeLVSTiFXxnY",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Shropshire Hills",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "shropshirehills|7FQRbf8gbKw8KZQZAJWxH2|194243",
  song: "song/paul-cardall-shropshire-hills",
} as const satisfies Track
