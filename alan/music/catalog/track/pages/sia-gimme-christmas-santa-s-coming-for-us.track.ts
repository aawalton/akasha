import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaGimmeChristmasSantaSComingForUs = {
  id: "01a0a59c-24d9-7ab9-9625-37e451e68d06",
  type: "track",
  slug: "sia-gimme-christmas-santa-s-coming-for-us",
  ownLength: 3.4211,
  ownProgress: 0,
  partOfCollections: ["release/sia-gimme-christmas"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0xXS6U8RhAWR1Ul9796V9S",
      externalLink: "https://open.spotify.com/track/0xXS6U8RhAWR1Ul9796V9S",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Santa’s Coming for Us",
} as const satisfies Track
