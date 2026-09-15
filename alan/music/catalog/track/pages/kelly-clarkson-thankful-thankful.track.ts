import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulThankful = {
  id: "01a0a5ae-cd76-74cb-96be-3e20389cffdd",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-thankful",
  ownLength: 3.00355,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "51Fy2Y20yZjaL3ffarnW2M",
      externalLink: "https://open.spotify.com/track/51Fy2Y20yZjaL3ffarnW2M",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Thankful",
} as const satisfies Track
