import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaFireAndIceFireAndIce = {
  id: "01a0aa7a-8749-7445-a102-7a337ca3d909",
  type: "page-type/track",
  slug: "alexandria-fire-and-ice-fire-and-ice",
  ownLength: 2.3349,
  ownProgress: 0,
  partOfCollections: ["release/alexandria-fire-and-ice"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "10sQMYrMaRMAjgQqU0rT9m",
      externalLink: "https://open.spotify.com/track/10sQMYrMaRMAjgQqU0rT9m",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Fire and Ice",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0SQG4wPVUlfbmbGQfqB47y", artistName: "Alexandria" }],
  trackKey: "fireandice|0SQG4wPVUlfbmbGQfqB47y|140094",
  song: "song/alexandria-fire-and-ice",
} as const satisfies Track
