import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsFlow = {
  id: "01a0b4c8-2320-71ab-a6e2-bc8b98d43b02",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-flow",
  ownLength: 3.6375,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  position: 18,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2HryorqIVWiNZQvEDXBIXh",
      externalLink: "https://open.spotify.com/track/2HryorqIVWiNZQvEDXBIXh",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Flow",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "flow|7FQRbf8gbKw8KZQZAJWxH2|218250",
  song: "song/paul-cardall-flow",
} as const satisfies Track
