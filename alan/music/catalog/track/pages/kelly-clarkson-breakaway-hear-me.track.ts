import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayHearMe = {
  id: "01a0a5ae-cc5b-730d-9b42-0a7576f0c1dd",
  type: "page-type/track",
  slug: "kelly-clarkson-breakaway-hear-me",
  ownLength: 3.894433333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7Egfyy8U2dj5458iDESXuz",
      externalLink: "https://open.spotify.com/track/7Egfyy8U2dj5458iDESXuz",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Hear Me",
} as const satisfies Track
