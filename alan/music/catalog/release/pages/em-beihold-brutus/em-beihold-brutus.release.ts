import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdBrutus = {
  id: "01a0676a-d719-703f-9f3c-56382bf0982a",
  type: "page-type/release",
  slug: "em-beihold-brutus",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2025-07-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0alrjw1UQpZ2Ct5XWfnEjS",
      externalLink: "https://open.spotify.com/album/0alrjw1UQpZ2Ct5XWfnEjS",
    },
  ],
  title: "Brutus",
} as const satisfies Release
