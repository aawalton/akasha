import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaJusticeJustice = {
  id: "01a0aa7a-83d3-7c47-8150-188e6c4d87fc",
  type: "page-type/track",
  slug: "alexandria-justice-justice",
  ownLength: 3.2228833333333333,
  ownProgress: 0,
  partOfCollections: ["release/alexandria-justice"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0isMBNGbFrpvGhStVQLWJK",
      externalLink: "https://open.spotify.com/track/0isMBNGbFrpvGhStVQLWJK",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Justice",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0SQG4wPVUlfbmbGQfqB47y", artistName: "Alexandria" }],
  trackKey: "justice|0SQG4wPVUlfbmbGQfqB47y|193373",
  song: "song/alexandria-justice",
} as const satisfies Track
