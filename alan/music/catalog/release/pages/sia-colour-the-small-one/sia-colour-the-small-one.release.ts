import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaColourTheSmallOne = {
  id: "01a0676a-d71b-7012-b66e-b06f047e9e01",
  type: "page-type/release",
  slug: "sia-colour-the-small-one",
  title: "Colour The Small One",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2005-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6uVUKJgirfLpW20hCk9cwb",
      externalLink: "https://open.spotify.com/album/6uVUKJgirfLpW20hCk9cwb",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
