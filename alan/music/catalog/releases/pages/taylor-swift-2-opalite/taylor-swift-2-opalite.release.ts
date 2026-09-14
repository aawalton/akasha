import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const taylorSwift2Opalite = {
  id: "01a0676a-d726-703d-a07a-845e951cc266",
  type: "release",
  slug: "taylor-swift-2-opalite",
  title: "Opalite",
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  ownLength: 7.968233,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2026-02-06",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3evV0p6SkiOZFt1rtWRco9",
      externalLink: "https://open.spotify.com/album/3evV0p6SkiOZFt1rtWRco9",
      lastSyncedAt: "2026-03-02",
    },
  ],
} as const satisfies Release
