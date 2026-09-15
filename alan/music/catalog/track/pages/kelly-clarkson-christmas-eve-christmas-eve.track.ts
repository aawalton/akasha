import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChristmasEveChristmasEve = {
  id: "01a0a5ae-d9c1-78c9-acd9-9ecca043ee03",
  type: "track",
  slug: "kelly-clarkson-christmas-eve-christmas-eve",
  ownLength: 3.0148333333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-christmas-eve"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3JKvHtrY7PXO7afJ9m6IG0",
      externalLink: "https://open.spotify.com/track/3JKvHtrY7PXO7afJ9m6IG0",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Christmas Eve",
} as const satisfies Track
