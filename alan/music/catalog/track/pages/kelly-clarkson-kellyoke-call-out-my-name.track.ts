import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonKellyokeCallOutMyName = {
  id: "01a0a5ae-d16b-7cc7-ba58-ba674121e5f7",
  type: "track",
  slug: "kelly-clarkson-kellyoke-call-out-my-name",
  ownLength: 3.7592833333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-kellyoke"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1hSV9PnUXsucl9bsUqDK3g",
      externalLink: "https://open.spotify.com/track/1hSV9PnUXsucl9bsUqDK3g",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Call Out My Name",
} as const satisfies Track
