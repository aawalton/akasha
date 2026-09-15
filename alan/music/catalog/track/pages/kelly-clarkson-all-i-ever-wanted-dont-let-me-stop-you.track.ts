import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonAllIEverWantedDontLetMeStopYou = {
  id: "01a0a5ae-c7e3-7620-8a51-914711ec7b8e",
  type: "page-type/track",
  slug: "kelly-clarkson-all-i-ever-wanted-dont-let-me-stop-you",
  ownLength: 3.34,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-all-i-ever-wanted"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5XP17NAwTW3BNQtPA8OgHG",
      externalLink: "https://open.spotify.com/track/5XP17NAwTW3BNQtPA8OgHG",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Don't Let Me Stop You",
} as const satisfies Track
