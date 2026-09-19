import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaPixiePixie = {
  id: "01a0aa7a-8a4d-7dc0-88f1-c51823319acb",
  type: "page-type/track",
  slug: "alexandria-pixie-pixie",
  ownLength: 3.4814666666666665,
  ownProgress: 0,
  partOfCollections: ["release/alexandria-pixie"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1IAS4hF2QOiDWsv0HDVL1H",
      externalLink: "https://open.spotify.com/track/1IAS4hF2QOiDWsv0HDVL1H",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Pixie",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0SQG4wPVUlfbmbGQfqB47y", artistName: "Alexandria" }],
  trackKey: "pixie|0SQG4wPVUlfbmbGQfqB47y|208888",
  song: "song/alexandria-pixie",
} as const satisfies Track
