import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterSilverNights = {
  id: "01a0676a-d729-700a-978b-4f0c54407eeb",
  type: "page-type/release",
  slug: "sabrina-carpenter-silver-nights",
  ownLength: 2.442,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2014-01-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "43yrS2rNyP9LGthAloWLZM",
      externalLink: "https://open.spotify.com/album/43yrS2rNyP9LGthAloWLZM",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Silver Nights",
} as const satisfies Release
