import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterAlmostLove = {
  id: "01a0676a-d716-702e-8701-bb6d2fc82ad6",
  type: "page-type/release",
  slug: "sabrina-carpenter-almost-love",
  title: "Almost Love",
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  ownLength: 10.278833,
  ownProgress: 10.278833,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-08-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4AICAv06yCiu66i4TOPWgO",
      externalLink: "https://open.spotify.com/album/4AICAv06yCiu66i4TOPWgO",
      lastSyncedAt: "2025-12-24",
    },
  ],
} as const satisfies Release
