import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenEveningFalls = {
  id: "01a0b4c8-4b4c-7c3c-860b-61f6f75111b8",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-evening-falls",
  ownLength: 2.944,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4QPEDogXbGpy9wcFs4cJca",
      externalLink: "https://open.spotify.com/track/4QPEDogXbGpy9wcFs4cJca",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Evening Falls",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "eveningfalls|7FQRbf8gbKw8KZQZAJWxH2|176640",
  song: "song/paul-cardall-evening-falls",
} as const satisfies Track
