import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexandriaPixie = {
  id: "01a0676a-d726-7081-8215-d598d260d940",
  type: "page-type/release",
  slug: "alexandria-pixie",
  ownLength: 3.4814666666666665,
  ownProgress: 3.481467,
  partOfCollections: ["artist/alexandria"],
  position: 0,
  publishedAt: "2023-07-21",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1UGUqqA6ljEWMeFyfUM1d4",
      externalLink: "https://open.spotify.com/album/1UGUqqA6ljEWMeFyfUM1d4",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Pixie",
} as const satisfies Release
