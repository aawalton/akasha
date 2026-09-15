import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonAllIEverWantedAllIEverWanted = {
  id: "01a0a5ae-c803-7dd9-bb65-359fcd2cc13f",
  type: "track",
  slug: "kelly-clarkson-all-i-ever-wanted-all-i-ever-wanted",
  ownLength: 3.9851,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-all-i-ever-wanted"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "31wPF6zccO0cINHfUS7wWb",
      externalLink: "https://open.spotify.com/track/31wPF6zccO0cINHfUS7wWb",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "All I Ever Wanted",
} as const satisfies Track
