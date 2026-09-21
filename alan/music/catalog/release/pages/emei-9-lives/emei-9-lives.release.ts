import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emei9Lives = {
  id: "01a0676a-d715-7019-965d-318cb5d92e2c",
  type: "page-type/release",
  slug: "emei-9-lives",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2024-11-01",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7hpEYDgSxgLy8t8TFNnCn7",
      externalLink: "https://open.spotify.com/album/7hpEYDgSxgLy8t8TFNnCn7",
    },
  ],
  title: "9 LIVES",
} as const satisfies Release
