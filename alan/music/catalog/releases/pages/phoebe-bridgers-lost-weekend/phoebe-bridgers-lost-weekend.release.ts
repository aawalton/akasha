import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const phoebeBridgersLostWeekend = {
  id: "01a0a198-5ee1-77c2-bad1-ce89e729db01",
  type: "release",
  slug: "phoebe-bridgers-lost-weekend",
  ownLength: 52.715716666666665,
  ownProgress: 0,
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  publishedAt: "2026-08-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2NSzwyYvQvdOQAoEjrlw9c",
      externalLink: "https://open.spotify.com/album/2NSzwyYvQvdOQAoEjrlw9c",
      lastSyncedAt: "2026-09-14",
    },
  ],
  title: "Lost Weekend",
} as const satisfies Release
