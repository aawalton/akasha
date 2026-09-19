import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionNovember = {
  id: "01a0b4c8-4506-798f-a9f4-2c12bfb803c7",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-november",
  ownLength: 3.4438,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5CTTpjnaTOWsB7mSeoa6xO",
      externalLink: "https://open.spotify.com/track/5CTTpjnaTOWsB7mSeoa6xO",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "November",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "november|7FQRbf8gbKw8KZQZAJWxH2|206628",
  song: "song/paul-cardall-november",
} as const satisfies Track
