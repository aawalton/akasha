import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2Opalite = {
  id: "01a0676a-d726-703d-a07a-845e951cc266",
  type: "page-type/release",
  slug: "taylor-swift-2-opalite",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2026-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3evV0p6SkiOZFt1rtWRco9",
      externalLink: "https://open.spotify.com/album/3evV0p6SkiOZFt1rtWRco9",
      lastSyncedAt: "2026-03-02",
    },
  ],
  title: "Opalite",
} as const satisfies Release
