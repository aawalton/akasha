import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonHappierThanEverHappierThanEver = {
  id: "01a0a5ae-d213-7c97-9d4b-e2fdc02413d5",
  type: "page-type/track",
  slug: "kelly-clarkson-happier-than-ever-happier-than-ever",
  ownLength: 4.245416666666666,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-happier-than-ever"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4sRoiXZBLpiRIklm2wy0WZ",
      externalLink: "https://open.spotify.com/track/4sRoiXZBLpiRIklm2wy0WZ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Happier Than Ever",
} as const satisfies Track
