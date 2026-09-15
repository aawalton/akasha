import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonLighthouseIWontGiveUp = {
  id: "01a0a5ae-ce12-7dd0-8d3b-5316503cc824",
  type: "page-type/track",
  slug: "kelly-clarkson-lighthouse-i-wont-give-up",
  ownLength: 3.482683333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-lighthouse"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Ht1mCmPOZSXapbFYtYORi",
      externalLink: "https://open.spotify.com/track/1Ht1mCmPOZSXapbFYtYORi",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "i won’t give up",
} as const satisfies Track
