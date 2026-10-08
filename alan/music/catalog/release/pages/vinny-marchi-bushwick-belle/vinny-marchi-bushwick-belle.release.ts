import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiBushwickBelle = {
  id: "01a0b112-8e73-7c63-b433-581daadb9047",
  type: "page-type/release",
  slug: "vinny-marchi-bushwick-belle",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2026-09-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4QaVzfQvVe8NnEnTFoqCfp",
      externalLink: "https://open.spotify.com/album/4QaVzfQvVe8NnEnTFoqCfp",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Bushwick Belle",
  createdAt: "2026-09-17T20:32:58.483Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
