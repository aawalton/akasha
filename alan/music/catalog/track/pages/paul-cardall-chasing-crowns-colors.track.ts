import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsColors = {
  id: "01a0b4c8-234a-7bca-82b2-89f16160b023",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-colors",
  ownLength: 4.4,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  position: 19,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "68S8a6Se88ncgPP9ssKs2x",
      externalLink: "https://open.spotify.com/track/68S8a6Se88ncgPP9ssKs2x",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Colors",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "colors|7FQRbf8gbKw8KZQZAJWxH2|264000",
  song: "song/paul-cardall-colors",
} as const satisfies Track
