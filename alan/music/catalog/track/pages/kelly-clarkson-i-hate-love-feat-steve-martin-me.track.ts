import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonIHateLoveFeatSteveMartinMe = {
  id: "01a0a5ae-d002-749d-aa14-0db537f71312",
  type: "page-type/track",
  slug: "kelly-clarkson-i-hate-love-feat-steve-martin-me",
  ownLength: 3.579083333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-i-hate-love-feat-steve-martin"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6KF5mWIqRzxArHFWwpb4Pb",
      externalLink: "https://open.spotify.com/track/6KF5mWIqRzxArHFWwpb4Pb",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "me",
} as const satisfies Track
