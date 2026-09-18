import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoComeThouFount = {
  id: "01a0b4c8-47a5-7bf6-88d9-59719fab5a63",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-come-thou-fount",
  ownLength: 2.6208833333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "10reGqkbhWnp4mk7fS8zI0",
      externalLink: "https://open.spotify.com/track/10reGqkbhWnp4mk7fS8zI0",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Come Thou Fount",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "comethoufount|7FQRbf8gbKw8KZQZAJWxH2|157253",
} as const satisfies Track
