import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonAllIEverWantedTheDayWeFellApart = {
  id: "01a0a5ae-c94e-7e48-8c3f-7bb641ce9d21",
  type: "track",
  slug: "kelly-clarkson-all-i-ever-wanted-the-day-we-fell-apart",
  ownLength: 4.050666666666666,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-all-i-ever-wanted"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3mSWNbF5QND4mygui6FLeW",
      externalLink: "https://open.spotify.com/track/3mSWNbF5QND4mygui6FLeW",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Day We Fell Apart",
} as const satisfies Track
