import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaTheMemoryOfTrees = {
  id: "01a0676a-d72d-7041-ba20-6fe9b23e142a",
  type: "page-type/release",
  slug: "enya-the-memory-of-trees",
  title: "The Memory of Trees",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1995-11-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "34NreMWi5xh62VQFWLPm9U",
      externalLink: "https://open.spotify.com/album/34NreMWi5xh62VQFWLPm9U",
    },
  ],
  createdAt: "2026-09-03T13:17:30.285Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
