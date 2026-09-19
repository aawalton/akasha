import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaKnightOfSwordsKnightOfSwords = {
  id: "01a0aa7a-8382-754c-87f0-90c0375c6314",
  type: "page-type/track",
  slug: "alexandria-knight-of-swords-knight-of-swords",
  ownLength: 2.652616666666667,
  ownProgress: 0,
  partOfCollections: ["release/alexandria-knight-of-swords"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4zb9HntzQrJZzljjGSLCM2",
      externalLink: "https://open.spotify.com/track/4zb9HntzQrJZzljjGSLCM2",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Knight of Swords",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0SQG4wPVUlfbmbGQfqB47y", artistName: "Alexandria" }],
  trackKey: "knightofswords|0SQG4wPVUlfbmbGQfqB47y|159157",
  song: "song/alexandria-knight-of-swords",
} as const satisfies Track
