import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayIHateMyselfForLosingYou = {
  id: "01a0a5ae-cc40-7efc-891e-69b91749a189",
  type: "page-type/track",
  slug: "kelly-clarkson-breakaway-i-hate-myself-for-losing-you",
  ownLength: 3.3411,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0VqopspNyQ1E7jstiPhosf",
      externalLink: "https://open.spotify.com/track/0VqopspNyQ1E7jstiPhosf",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "I Hate Myself For Losing You",
} as const satisfies Track
