import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdFantasyWithGayleEmBeihold = {
  id: "01a0676a-d71d-7062-bd86-a0df8d6eae37",
  type: "page-type/release",
  slug: "em-beihold-fantasy-with-gayle-em-beihold",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2023-04-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7dJfiWaQ0a1kCxGvEfXL3A",
      externalLink: "https://open.spotify.com/album/7dJfiWaQ0a1kCxGvEfXL3A",
    },
  ],
  title: "Fantasy (with GAYLE & Em Beihold)",
} as const satisfies Release
