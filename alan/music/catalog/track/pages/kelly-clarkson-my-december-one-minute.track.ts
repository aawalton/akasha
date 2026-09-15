import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberOneMinute = {
  id: "01a0a5ae-c986-7642-864b-a706db2a6114",
  type: "track",
  slug: "kelly-clarkson-my-december-one-minute",
  ownLength: 3.07955,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7ACOTEPgEHeuLMxK7w56cC",
      externalLink: "https://open.spotify.com/track/7ACOTEPgEHeuLMxK7w56cC",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "One Minute",
} as const satisfies Track
