import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonKellyClarksonLiveWalkAwayJoeLive = {
  id: "01a0a5ae-da28-7ecf-8e0b-d5b72dc3420e",
  type: "track",
  slug: "kelly-clarkson-kelly-clarkson-live-walk-away-joe-live",
  ownLength: 3.7,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-kelly-clarkson-live"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ggOk9lp6m17EXMD3JW0BU",
      externalLink: "https://open.spotify.com/track/6ggOk9lp6m17EXMD3JW0BU",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Walk Away Joe - Live",
} as const satisfies Track
