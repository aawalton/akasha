import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChristmastryMagic = {
  id: "01a0a5ae-cf61-717b-be2f-eeb0b19248fd",
  type: "page-type/track",
  slug: "kelly-clarkson-christmastry-magic",
  ownLength: 3.25155,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-christmastry"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5J2eCu8YCw1aLx8fv5TEaN",
      externalLink: "https://open.spotify.com/track/5J2eCu8YCw1aLx8fv5TEaN",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "magic",
} as const satisfies Track
