import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeIDonTKnowWhyIJustDo = {
  id: "01a0676a-d721-7013-85c1-30a5ced4c866",
  type: "page-type/release",
  slug: "ariana-grande-i-don-t-know-why-i-just-do",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2025-03-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4cCVfhdZyqipuaZ89KmMvi",
      externalLink: "https://open.spotify.com/album/4cCVfhdZyqipuaZ89KmMvi",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "I Don't Know Why (I Just Do)",
} as const satisfies Release
