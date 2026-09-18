import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionFaithful = {
  id: "01a0b4c8-454b-7a1a-8027-06afda9b9637",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-faithful",
  ownLength: 4.8579,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6TqOBiHHErkTxQG9ViFnOQ",
      externalLink: "https://open.spotify.com/track/6TqOBiHHErkTxQG9ViFnOQ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Faithful",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "faithful|7FQRbf8gbKw8KZQZAJWxH2|291474",
} as const satisfies Track
