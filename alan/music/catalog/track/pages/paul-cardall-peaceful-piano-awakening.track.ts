import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoAwakening = {
  id: "01a0b4c8-3303-754e-9af5-c8828664e3b6",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-awakening",
  ownLength: 2.9704333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7dDHHDNyDJEmNfhIdQjpSZ",
      externalLink: "https://open.spotify.com/track/7dDHHDNyDJEmNfhIdQjpSZ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Awakening",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "awakening|7FQRbf8gbKw8KZQZAJWxH2|178226",
  song: "song/paul-cardall-awakening",
} as const satisfies Track
