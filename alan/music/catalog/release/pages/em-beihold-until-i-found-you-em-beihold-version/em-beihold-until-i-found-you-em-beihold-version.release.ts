import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdUntilIFoundYouEmBeiholdVersion = {
  id: "01a0676a-d72f-7053-acf1-cf18eea9501b",
  type: "page-type/release",
  slug: "em-beihold-until-i-found-you-em-beihold-version",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2022-04-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7ARtQpvnPN2ucbmVHngLOs",
      externalLink: "https://open.spotify.com/album/7ARtQpvnPN2ucbmVHngLOs",
    },
  ],
  title: "Until I Found You (Em Beihold Version)",
} as const satisfies Release
