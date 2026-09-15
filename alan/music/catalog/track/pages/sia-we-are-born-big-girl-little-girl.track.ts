import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaWeAreBornBigGirlLittleGirl = {
  id: "01a0a59c-0b31-72b4-932d-942a80200970",
  type: "track",
  slug: "sia-we-are-born-big-girl-little-girl",
  ownLength: 4.302,
  ownProgress: 0,
  partOfCollections: ["release/sia-we-are-born"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1x8zg9iFUc9R0T8G2KmKQf",
      externalLink: "https://open.spotify.com/track/1x8zg9iFUc9R0T8G2KmKQf",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Big Girl Little Girl",
} as const satisfies Track
