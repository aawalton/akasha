import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulAnytime = {
  id: "01a0a5ae-cd90-7175-ad26-4b0a70b57234",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-anytime",
  ownLength: 4.096216666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ot0DDZVXVNB1Du2DZFwwQ",
      externalLink: "https://open.spotify.com/track/6ot0DDZVXVNB1Du2DZFwwQ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Anytime",
} as const satisfies Track
