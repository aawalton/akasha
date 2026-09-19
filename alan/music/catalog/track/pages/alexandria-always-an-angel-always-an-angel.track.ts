import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaAlwaysAnAngelAlwaysAnAngel = {
  id: "01a0aa7a-88cd-7704-8b58-c1606199523f",
  type: "page-type/track",
  slug: "alexandria-always-an-angel-always-an-angel",
  ownLength: 1.9375,
  ownProgress: 0,
  partOfCollections: ["release/alexandria-always-an-angel"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5CziXblfbYNLB4dELQrgq4",
      externalLink: "https://open.spotify.com/track/5CziXblfbYNLB4dELQrgq4",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Always an Angel",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0SQG4wPVUlfbmbGQfqB47y", artistName: "Alexandria" }],
  trackKey: "alwaysanangel|0SQG4wPVUlfbmbGQfqB47y|116250",
  song: "song/alexandria-always-an-angel",
} as const satisfies Track
