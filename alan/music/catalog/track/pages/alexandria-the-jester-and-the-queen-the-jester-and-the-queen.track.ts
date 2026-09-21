import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaTheJesterAndTheQueenTheJesterAndTheQueen = {
  id: "01a0aa7a-8334-7ce9-b8c1-1d261026d4af",
  type: "page-type/track",
  slug: "alexandria-the-jester-and-the-queen-the-jester-and-the-queen",
  ownLength: 2.81445,
  ownProgress: 2.81445,
  partOfCollections: ["release/alexandria-the-jester-and-the-queen"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3G3CnxD8B5esKcEML6faW8",
      externalLink: "https://open.spotify.com/track/3G3CnxD8B5esKcEML6faW8",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Jester and The Queen",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0SQG4wPVUlfbmbGQfqB47y", artistName: "Alexandria" }],
  trackKey: "thejesterandthequeen|0SQG4wPVUlfbmbGQfqB47y|168867",
  song: "song/alexandria-the-jester-and-the-queen",
  carriedBy: [
    {
      release: "release/alexandria-the-jester-and-the-queen",
      discNumber: 1,
      position: 1,
      externalId: "3G3CnxD8B5esKcEML6faW8",
      externalLink: "https://open.spotify.com/track/3G3CnxD8B5esKcEML6faW8",
    },
  ],
} as const satisfies Track
