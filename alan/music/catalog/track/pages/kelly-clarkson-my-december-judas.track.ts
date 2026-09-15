import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberJudas = {
  id: "01a0a5ae-c9f3-70a1-b990-d869f8a678c0",
  type: "track",
  slug: "kelly-clarkson-my-december-judas",
  ownLength: 3.60155,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5MxJfJ0ljPIXQATV0S6F5W",
      externalLink: "https://open.spotify.com/track/5MxJfJ0ljPIXQATV0S6F5W",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Judas",
} as const satisfies Track
